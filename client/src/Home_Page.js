import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'


//import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css'

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
//add in the advanced search button
const AdvancedSearchButtonShow = tw(PrimaryButton)`mt-16 mx-auto`;
// add in buttons for location and cuisine
const LocCuisineButton = tw(PrimaryButton)`mt-16 mx-auto`;
//add in the buttons that appear when the Advanced Search Button is clicked
const AdvancedSearchButton = tw(PrimaryButton)`mt-16 mx-auto`;
//const 

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-32 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-1 h-12 my-3  rounded-full py-0 flex items-center justify-center sm:w-32 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

export default class ResultsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       headingText : "Welcome To NYC Dish Finder!",
       visible: 4,
       //set isActive state
       showZipCodeButton: false,
       showPriceDropdown: false,
       showLocDropdown : false,
       showCuisineDropdown : false,
       posts : [
          {
            imageSrc:
              "https://img.freepik.com/free-vector/food-courts-icons-set-outline-style_96318-5492.jpg?size=626&ext=jpg",
            category: "Are You Feeling Hungry?",
            date: "April 21, 2020",
            title: "I'm Feeling Hungry",
            description:
              "",
            featured: true
          },
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost(),
          getPlaceholderPost()
      ]
    };
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
    this.DBClick = this.DBClick.bind(this);
    this.onAdvancedSearchButtonShowClick = this.onAdvancedSearchButtonShowClick.bind(this);
    this.onLocCuisineButtonClick = this.onLocCuisineButtonClick.bind(this)
    //this.DishSearchClick = this.DishSearchClick.bind(this);
  }
  onLoadMoreClick (){
    this.setState({
          visible: this.state.visible + 3,
        });
  };
//this is the function to show the advanced search dropdown / button 
  onAdvancedSearchButtonShowClick () {
      this.setState({
          showZipCodeButton : true,
          showPriceDropdown : true,
          //console.log(showPriceDropdown);
       //document.getElementById("zipcode_text_box").style.display = "block"
        //visible: this.state.visible + 3,
      });
  };
  
  //add in function for showing more based on clicking loc cuisine button
  onLocCuisineButtonClick () {
      this.setState({
          showLocDropdown : true,
          showCuisineDropdown : true,
        });
    };


  componentDidMount() {
    var query_food = localStorage.getItem('query_food');
    var query_cuisine = localStorage.getItem('query_cuisine') || ""
    console.log(query_cuisine + ", " + query_cuisine.length);
    var query = "http://localhost:8082/dummy_search/";
    if (query_cuisine != null && query_cuisine.length != 0) {
      var query = "http://localhost:8082/cuisine_search/" + query_cuisine
    }
    console.log(query)

    fetch(query, {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(resList => {
        this.populate(resList);
      })
      .catch(err => console.log(err));
  }

  // this needs to route to results page
//   DishSearchClick()
//   {
//     console.log( document.getElementById('textbox_id').value )
//     localStorage.setItem('query_dish', document.getElementById('textbox_id').value);
//     fetch("http://localhost:8082/dish_search" + document.getElementById('textbox_id').value, {
//         method: "GET",})
//         .then(res => res.json()) // Convert the response data to a JSON.
//         .then(resList => {
//             this.populate(resList);
//         })
//       .catch(err => console.log(err));
//     };
//       populate(resList){
//         var actual_posts = this.state.posts
//         for (var i =0; i < Math.min(resList.length, this.state.posts.length-1); i++ ){
//           actual_posts[i+1]['title'] = resList[i]['restaurant_name']
//           actual_posts[i+1]['url'] = "/restaurant/" + resList[i]['rid']
//           //console.log(actual_posts[i]);
//         }
//         this.setState({
//           posts: actual_posts,
//           visible: 4
//         });
// };



  DBClick(){
   console.log( document.getElementById('textbox_id').value ) 
   localStorage.setItem('query_cuisine', document.getElementById('textbox_id').value);
   console.log("Stored: " + localStorage.getItem('query_cuisine'));
   fetch("http://localhost:8082/cuisine_search/" + document.getElementById('textbox_id').value  , {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(resList => {
        this.populate(resList);
      })
      .catch(err => console.log(err));
  };

  populate(resList){
      var actual_posts = this.state.posts
      for (var i =0; i < Math.min(resList.length, this.state.posts.length-1); i++ ){
        actual_posts[i+1]['title'] = resList[i]['restaurant_name']
        actual_posts[i+1]['url'] = "/restaurant/" + resList[i]['rid']
        //console.log(actual_posts[i]);
      }
      this.setState({
        posts: actual_posts,
        visible: 4
      });
  }

  render(){
    const showZipCodeButton =this.state.showZipCodeButton;
    const showPriceDropdown =this.state.showPriceDropdown;
    const showLocDropdown = this.state.showLocDropdown;
    const showCuisineDropdown = this.state.showCuisineDropdown;
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{this.state.headingText}</Heading>
            <PaddingDiv> </PaddingDiv>
            <Actions>
              <input type="text" id='textbox_id' placeholder="Enter Dish" />
              <button onClick={this.DBClick}>Search</button>
            </Actions>
          </HeadingRow>
        {/* Add in the Cuisine and Location Search Buttons */}
        <ButtonContainer>
              <LocCuisineButton onClick={this.onLocCuisineButtonClick}>Want To Find All Restaurants Of A Certain Cuisine In A Certain Borough? Click Here!</LocCuisineButton>
        </ButtonContainer>
        <div>
        {showCuisineDropdown && (
          <DropdownButton id="Cuisine_Selection_Button" title="Select Cuisine">
            <Dropdown.Item href="#/chinese">Select Chinese</Dropdown.Item>
            <Dropdown.Item href="#/italian">Select Italian</Dropdown.Item>
            <Dropdown.Item href="#/indian">Select Indian</Dropdown.Item>
          </DropdownButton>)}
          { showLocDropdown &&(
          <Actions>
              <button onClick={this.DBClick}>Search</button>
            </Actions>)}
          {showLocDropdown &&(
          <DropdownButton id="Location_Selection_Button" title="Select Borough">
            <Dropdown.Item href="#/brooklyn">Select Brooklyn</Dropdown.Item>
            <Dropdown.Item href="#/queens">Select Queens</Dropdown.Item>
            <Dropdown.Item href="#/manhattan">Select Manhattan</Dropdown.Item>
            <Dropdown.Item href="#/bronx">Select Bronx</Dropdown.Item>
            <Dropdown.Item href="#/staten_island">Select Staten Island</Dropdown.Item>
          </DropdownButton>)}
          </div>
        {/* Add in the Advanced Search Button */}
        <ButtonContainer>
              <AdvancedSearchButtonShow onClick={this.onAdvancedSearchButtonShowClick}>Want To Find Restaruants In A Certain Price Range Near You? Click Here!</AdvancedSearchButtonShow>
        </ButtonContainer>
         {/* Add in buttons that appear when Advanced Search Button is Clicked */}
         {/* CHECK how many price ranges there are */}
        {showZipCodeButton && (      
        <Actions>
            <input type="text" id="zipcode_text_box" placeholder="Enter Zipcode"/>
        </Actions>
        )}
        {showPriceDropdown && (
        <DropdownButton id="Price_Range_Selection_Button" title="Select Price Range">
            <Dropdown.Item href="#/price_range_1">$</Dropdown.Item>
            <Dropdown.Item href="#/price_range_2">$$</Dropdown.Item>
            <Dropdown.Item href="#/price_range_3">$$$</Dropdown.Item>
        </DropdownButton>)}
        {showZipCodeButton && (
        <ButtonContainer>
            <AdvancedSearchButton onClick={this.DBClick}>Search</AdvancedSearchButton>
        </ButtonContainer>)}

          <Posts>
            {this.state.posts.slice(0, this.state.visible).map((post, index) => (
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
          {this.state.visible < this.state.posts.length && (
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
