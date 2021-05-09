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
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';
import Select from 'react-select';


//import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css'
import TwoColWithSteps from "components/features/TwoColWithSteps";

const Boroughs = [
  { label: 'Queens', value: 'Queens' },
  { label: 'Bronx', value: 'Bronx' },
  { label: 'Manhattan', value: 'Manhattan' },
  { label: 'Staten Island', value: 'Staten Island' },
  { label: 'Brooklyn', value: 'Brooklyn' },
  {label: 'Any', value: 'Any'}
];

const Prices =[
  {label: '$', value: '$'},
  {label: '$$', value: '$$'},
  {label: '$$$', value: '$$$'},
  {label: '$$$$', value: '$$$$'},
  {label: '$$$$$', value: '$$$$'},
  {label: 'Any', value: 'Any'}

];

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
       showMainSearch : true,
       // add in the selected borough variable
       selectedBorough: "Bronx",
       posts : [
          {
            imageSrc:
              "https://img.freepik.com/free-vector/food-courts-icons-set-outline-style_96318-5492.jpg?size=626&ext=jpg",
            category: "New York New York?",
            date: "April 21, 2020",
            title: "New York New York",
            description:
              "",
            featured: true
          }
      ]
    };
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
    this.DBClick = this.DBClick.bind(this);
    this.onAdvancedSearchButtonShowClick = this.onAdvancedSearchButtonShowClick.bind(this);
    this.onLocCuisineButtonClick = this.onLocCuisineButtonClick.bind(this);
    this.handleSelectBorough = this.handleSelectBorough.bind(this);
    this.handleSelectPrice = this.handleSelectPrice.bind(this);
    //this.DishSearchClick = this.DishSearchClick.bind(this);
  };
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
      });
  };
  
  //add in function for showing more based on clicking loc cuisine button
  onLocCuisineButtonClick () {
      this.setState({
          showLocDropdown : true,
          showCuisineDropdown : true,
          showMainSearch : false,
        });
    };
  //function to store the borough dropdown values
  handleSelectBorough = (e) => {
    const input= e.value
    //console.log(input)
    localStorage.setItem('query_borough',input)
  };

  handleSelectPrice = (e) => {
    const input_price= e.value
    //console.log(input)
    localStorage.setItem('query_price',input_price)
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

ZipPriceClick () {
  localStorage.setItem('query_cuisine', document.getElementById('textbox_id').value);
  console.log(localStorage.getItem('query_cuisine')); //this prints
  localStorage.setItem('query_lat', document.getElementById('lat_text_box').value);
  console.log(localStorage.getItem('query_lat'))
  localStorage.setItem('query_lon',document.getElementById('long_text_box').value);
  console.log(localStorage.getItem('query_lon'))
  //localStorage.setItem('query_lat', 0); // bring this back if we do the map
  //localStorage.setItem('query_lon', 0); // bring this back if we do the map 
  //localStorage.setItem('query_borough', document.getElementById("selected location").value);
  //console.log('Will it work?')
  console.log(localStorage.getItem('query_borough'));
  console.log(localStorage.getItem('query_price'));
  //console.log(this.state.showLocDropdown);
  //localStorage.setItem('query_price', document.getElementById("Price_Range_Selection_Button").value);
}

  DBClick(){
   console.log( document.getElementById('textbox_id').value ) 
   localStorage.setItem('query_cuisine', document.getElementById('textbox_id').value);
   localStorage.setItem('query_lat', 0);
   localStorage.setItem('query_lon', 0);
   localStorage.setItem('query_borough', null);
   localStorage.setItem('query_price', null);
  }

  render(){
    //const showZipCodeButton =this.state.showZipCodeButton;
    //const showPriceDropdown =this.state.showPriceDropdown;
    const showLocDropdown = this.state.showLocDropdown;
    //const showCuisineDropdown = this.state.showCuisineDropdown;
    const showMainSearch = this.state.showMainSearch;
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
            </Actions>
            {showMainSearch &&(
              <Actions>
              <Link to="/results">
              <button onClick={this.DBClick}>Search</button>
              </Link>
            </Actions>)}
          </HeadingRow>
          
        {/* Add in the Cuisine and Location Search Buttons */}
        <ButtonContainer>
              <LocCuisineButton onClick={this.onLocCuisineButtonClick}>Want To Try An Advanced Search? Click Here!</LocCuisineButton>
        </ButtonContainer>
        {showLocDropdown &&(
          <Select
          placeholder = "Select A Borough!"
          options={Boroughs}
          onChange={this.handleSelectBorough}
        />)}
          {showLocDropdown &&(
          <Actions>
            <input type="text" id="lat_text_box" placeholder="Enter Latitude"/>
          </Actions>)}
          {showLocDropdown &&(
          <Actions>
            <input type="text" id="long_text_box" placeholder="Enter Longitude"/>
          </Actions>)}
          {showLocDropdown && (
          <Select
          placeholder = "Select a Price Range"
          options={Prices}
          onChange={this.handleSelectPrice}
          />)}
          { showLocDropdown &&(
          <Actions>
              {/*<Link to="/results">*/}
              <button onClick={this.ZipPriceClick} href="/results">Advanced Search</button>
              {/*</Link>*/}
            </Actions>)}
          <Posts>
            {this.state.posts.slice(0, this.state.visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href="https://www.youtube.com/watch?v=EUrUfJW1JGk&ab_channel=LuisEduardoAndradeOjeda">
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
          <img src = 'https://www.fodors.com/wp-content/uploads/2016/02/1-Ultimate-New-York-Hero.jpg' ></img>
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
