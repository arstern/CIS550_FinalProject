import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/Header.js";
import { SectionHeading } from "components/Headings";
import { PrimaryButton } from "components/Buttons";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { NavLink } from 'react-router-dom'

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PaddingDiv = tw.div`p-10`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-32 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-1 h-12 my-3  rounded-full py-0 flex items-center justify-center sm:w-32 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const mapContainerStyle = {
  width: "89vw",
  height: "50vh",
};

export default class ResultsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       headingText : "Here Are Your Results!",
       visible: 4,
       center: {
          lat: 40.712776,
          lng: -74.005974
        },
       infowindow: null,
       new_posts: [],
       reslist: [{"restaurant_id": 0, "lat": null, "lon": null}],
       feature : localStorage.getItem('complex_query_toggle') == 1,
       posts : [
          getPlaceholderPost()
      ]      
    };
    this.mapRef = React.createRef();
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
  }

  onMapLoad(map) {
    this.mapRef.current = map
  }

  Map() {
    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          id='map'
          mapContainerStyle={mapContainerStyle}
          center={this.state.center}
          zoom={14}
          onLoad={this.onMapLoad}
        >

          {this.state.reslist.map((rest) => (
            <Marker
              key={rest['restaurant_id']}
              position={{
                lat: rest['lat'],
                lng: rest['lon']
                }}
              onClick = {() => {
                const lat = rest['lat']
                const lng = rest['lon']
                this.setState({infowindow: rest});
                this.mapRef.current.panTo({lat, lng})
                this.mapRef.current.setZoom(15)
              }}
            />
          ))
            }

          {/*if this.state.infowindow has a value, show info window, else null */}
          {this.state.infowindow ? (
          <InfoWindow 
            position={{ lat: this.state.infowindow['lat'], lng: this.state.infowindow['lon'] }}
            onCloseClick={() => {this.setState({infowindow: null})}}>
            <div>
              <h2> {this.state.infowindow['restaurant_name']} </h2>
              <h2> {this.state.infowindow['price_range']} </h2>
              <NavLink to={"/restaurant/" + this.state.infowindow['restaurant_id']}> Click here to see the menu </NavLink>
            </div>
          </InfoWindow>) : null}

        </GoogleMap>
      </LoadScript>
    )
  }

  onLoadMoreClick (){
    this.setState({
          visible: this.state.visible + 3,
        });
  };
  
  componentDidMount() {
    this.setState({new_posts: []})
    var db_url = ""
    var db_attributes = ""
    var headingText = "Restaurants"
    //check the complex query toggle
    var complex_query_toggle = localStorage.getItem('complex_query_toggle')
    if (complex_query_toggle ==1) {
      db_url += 'complex_query' + "/"
      var query_cuisine = localStorage.getItem('query_cuisine')
      db_attributes += query_cuisine + "/"
      var query_borough = localStorage.getItem('query_borough')
      db_attributes += query_borough + "/"
      var query_price = localStorage.getItem('query_price')
      db_attributes += query_price + "/"
      headingText = "COMPLEX QUERY Restaurants"

    }

    var query_cuisine = localStorage.getItem('query_cuisine')
    if (query_cuisine != 0 && complex_query_toggle !=1){
      db_url += 'c'
      db_attributes += query_cuisine + "/"
      headingText = query_cuisine.charAt(0).toUpperCase() + query_cuisine.toLowerCase().slice(1) + " " + headingText 
    }

    var query_lat = localStorage.getItem('query_lat')
    var query_long = localStorage.getItem('query_lon')
    if (query_lat != 0 && query_long != 0){
      db_url += 'l'
      db_attributes += query_lat + "/" + query_long + "/"
      headingText = "Nearby " + headingText
    }
    

    var query_borough = localStorage.getItem('query_borough')
    if (query_borough != null && query_borough != 0 && complex_query_toggle !=1){
      db_url += 'b'
      db_attributes += query_borough + "/"
      headingText += " in " + query_borough
    }

    var query_price = localStorage.getItem('query_price')
    if (query_price != null && query_price != 0 && complex_query_toggle !=1){
      db_url += 'p'
      db_attributes += query_price + "/"
      headingText = query_price + " " + headingText
    }


    var query = "http://localhost:8082/dummy_search/";
    if (db_url.length > 0 && complex_query_toggle !=1) {
      query = "http://localhost:8082/" + db_url +"_search/" + db_attributes
    }
    //add condition for complex query
    else if (complex_query_toggle == 1) {
      query = "http://localhost:8082/" + db_url + db_attributes
    }

    var cheap_chain = localStorage.getItem('query_cheap_chain_toggle')
    var r_name = localStorage.getItem('query_rest_name');
    if (cheap_chain == 1){
        headingText = r_name.charAt(0).toUpperCase() + r_name.toLowerCase().slice(1) + " Restaurants" 
        query = "http://localhost:8082/name_search/" + r_name 
    }
    
    this.state.headingText = headingText
    console.log(query)
    fetch(query, {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(resList => {
        this.new_populate(resList);
      })
      .catch(err => console.log(err));
  }


  new_populate(resList) {
    var posts_list = Array()

    for (var i =0; i < resList.length; i++ ){
      if (i == 0){
            posts_list.push({
                imageSrc: "https://www.bhc.edu/wp-content/uploads/2017/09/hello-585289042.jpg",
                category: "Featured Restaurant",
                date: "April 21, 2020",
                title: resList[i]['restaurant_name'],
                url: "/restaurant/" + resList[i]['restaurant_id'],
                description: resList[i]['formatted'] + "\n\n" + resList[i]['restaurant_website'],
                featured: true
            });
            this.setState({
                center: {
                  'lat' : parseFloat(resList[i]['lat']),
                  'lng': parseFloat(resList[i]['lon'])
                }
            });
            console.log(this.state.center.lat + ", " + this.state.center.lng + " )")
      }
      else
            posts_list.push({title: resList[i]['restaurant_name'],
                          url: "/restaurant/" + resList[i]['restaurant_id'],
                          imageSrc: getPlaceholderPost()["imageSrc"],
                          category: resList[i]['formatted']
                        })
    }
    this.setState({
      reslist: resList,
      new_posts: posts_list,
      visible: 4
    });
    console.log(this.state.reslist)
  }
  render(){
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{this.state.headingText}</Heading>
            <PaddingDiv> </PaddingDiv>
          </HeadingRow>
          {this.Map()}
          <Posts>
            {this.state.new_posts.slice(0, this.state.visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <Image imageSrc={post.imageSrc} />
                  <Info>
                    <Category>{post.category}</Category>
                    <Title>{post.title}</Title>
                    {post.featured && post.description && <Description>{post.description}</Description>}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {this.state.visible < this.state.new_posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={this.onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>  
    </AnimationRevealPage>
  );
  }
};

const getPlaceholderPost = () => ({
  imageSrc:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  category: "TEMP",
  date: "April 19, 2020",
  title: "Visit the beautiful Alps in Switzerland",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "https://reddit.com"
});
