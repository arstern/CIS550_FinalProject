import React from "react";
//import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
// import { ReactComponent as StarIcon } from "images/checkbox-circle.svg";
import { ReactComponent as StarIcon } from "images/reliable-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import BigHeader from "components/headers/light.js";
import { createBrowserHistory } from "history";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
 const Header = tw(SectionHeading)`self-center`;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-10 self-center py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-64 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`; 

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default class Menu extends React.Component {
  constructor(props){
    super(props);

    const history = createBrowserHistory()
    const rid = /[^/]*$/.exec(history.location.pathname)[0];
    this.state = {
      tabs: {},
      activeTab: "",
      name: "",
      rid: rid
    }
    this.onSwitchSection = this.onSwitchSection.bind(this);
  }
  componentDidMount() {

  fetch("http://localhost:8082/getName/" + this.state.rid, {
    method: "GET", // The type of HTTP request.
  })
    .then(res => res.json()) // Convert the response data to a JSON.
    .then(name => {
      this.setState({
        name: name[0]['restaurant_name']
      });
      // Set the state of the person list to the value returned by the HTTP response from the server.
    })
    .catch(err => console.log(err));
  
    fetch("http://localhost:8082/get_food_items/" + this.state.rid, {
    method: "GET", // The type of HTTP request.
    })
    .then(res => res.json()) // Convert the response data to a JSON.
    .then(foodlist => {
      var actual_food = this.state.tabs;
      
      for (var i = 0; i<foodlist.length; i++){
        var tabName = foodlist[i]['section_name']
        if (!actual_food.hasOwnProperty(tabName)){
          actual_food[tabName] = []
        }
        actual_food[tabName].push({
            title: foodlist[i]['name'],
            price: ((foodlist[i]['price'] > 0) ? "$" + foodlist[i]['price'] : ""),
            content: foodlist[i]['description'],
            url: '',
            deal: "0%",
            section: tabName
        });
      }
      this.getImage(actual_food);
    })
    .catch(err => console.log(err));
  }

  onSwitchSection (tabName){
    if (tabName !== this.state.activeTab){
      this.setState({
            activeTab: tabName,
          });
    }
  };

  getDeal(actual_food){
      for (const key in actual_food) {
        console.log(key)
      var items = actual_food[key]
      for (var j = 0; j < items.length;j++){
          var item = items[j]
          fetch("http://localhost:8082/get_deal/" + item['title'] + "/" + key, {
            method: "GET", 
          })
          .then(res => res.json())
          .then(deal_list =>{
            const cat = deal_list[0]['category']
            const name = deal_list[0]['name']
            const p0 = parseFloat(deal_list[0]['price'])
            for (var i = 0; i < actual_food[cat].length; i++){
              if (actual_food[cat][i]['title'] == name){
                const p1 = parseFloat(actual_food[cat][i]['price'].substring(1))
                var deal_percent = Math.round( 100 * (p1 - p0) / p0 * 100)/100 ;
                console.log(p0 + ", " + p1 + " -> " + deal_percent)
                actual_food[cat][i]['deal'] = deal_percent.toString() + "%"
                this.setState({
                  tabs: actual_food
                }); 
                break
              }
            }
          })
          .catch(err => console.log(err));

      } }

  }

  getImage(actual_food){
    fetch("http://localhost:8082/get_tf", {
    method: "GET",
    })
    .then(res => res.json())
    .then(tflist =>{
        
        let tfmap = new Map();
        for (var i = 0; i < tflist.length; i++){
          tfmap.set(tflist[i]['word'].toLowerCase(), tflist[i]['tf']);
        }
        fetch("http://localhost:8082/foodpics", {
        method: "GET", // The type of HTTP request.
        })
        .then(res => res.json())
        .then(pics =>{        
        //for each word in actual food
        var neverSeen = true
        Object.keys(actual_food).forEach(function(key) {
          var items = actual_food[key]
          for (var j=0;j<items.length;j++){
          var original_words = items[j]['title'].toLowerCase().split(" ")
          var title_words = items[j]['section'].toLowerCase().split(" ");
          var words = original_words.concat( title_words )
          var singular = []
          for (var w=0;w<words.length;w++){
            if (words[w].endsWith("s")){
              singular.push(words[w].substring(0, words[w].length-1));
            }
          }
          words = words.concat( singular )
          //console.log(words)

          //for each word in picture food            
          var best_food = "";
          var best_url = "";
          var best_val = -1;
          var quick_end = original_words.length
          for (var fi=0; fi < pics.length; fi ++){
            var pic_words = pics[fi]['food'].toLowerCase().split(" ");
            var pic_val = 0
            var tot = 0;
            var seen_word = new Map();
            for (var i=0; i<words.length; i++){
              for (var wi=0; wi < pic_words.length; wi++){
                if (words[i] ===  pic_words[wi] && words[i].length > 0 && !seen_word.has(words[i])){
                  if (i < quick_end)
                    pic_val += 1//tfmap.get(pic_words[wi].toLowerCase());
                  else
                    pic_val += 0.1
                  seen_word.set(words[i], true);
                }else if (words[i].length > 0){
                  tot += 0.0001//tfmap.get(pic_words[wi].toLowerCase());
                }
              }
              
            }
            pic_val = Math.max(0, pic_val - tot);

            if (pic_val > best_val){
              best_val = pic_val;
              best_url = pics[fi]['url'];
              best_food = pics[fi]['food'];
            }
          }
          //foodname to picture 
          items[j]['url'] = (best_url.substring(0,1) === '"') ? best_url.substring(1) : best_url;
          //console.log(items[j]['title'] + " -> " + best_food + ": " + best_val);
          }
        });
        this.getDeal(actual_food);
      });
    })
    .catch(err => console.log(err));
  }


render(){
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(this.state.tabs);
  //const [activeTab, setActiveTab] = useState(tabsKeys[0]);
 
  return (
    <AnimationRevealPage>
    <BigHeader />
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header> {this.state.name} <HighlightedText>menu.</HighlightedText> </Header> 
        </HeaderRow>
          <TabsControl>
            {tabsKeys.map((tabName, index) => (
              <TabControl key={index} active={this.state.activeTab === tabName} onClick={()=> this.onSwitchSection(tabName) } >
              {tabName}

              </TabControl>
            ))}
          </TabsControl>        
        

        
        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={this.state.activeTab === tabKey ? "current" : "hidden"}
            animate={this.state.activeTab === tabKey ? "current" : "hidden"}
          >
            {this.state.tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.url}>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon/>
                        {card.deal}
                      </CardRating>
                    </CardRatingContainer>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>

    </Container>
     
    </AnimationRevealPage>
  );
  }
};

