  import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";
import { createBrowserHistory } from "history";

const Subheading = tw.span`tracking-wider text-sm font-medium`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
const Description = tw.span`inline-block mt-8`;
const imageCss = tw`rounded-4xl`;

export default class ResultsPage extends React.Component {
  constructor(props){
    super(props);
    const history = createBrowserHistory()
    const rid = /[^/]*$/.exec(history.location.pathname)[0];
    this.state ={
      name : "",
      rid : rid
    }
  }
  componentDidMount() {

    fetch("http://localhost:8082/getName/" + this.state.rid, {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(name => {
        console.log(name);
        this.setState({
          name: name[0]['restaurant_name']
        });
        // Set the state of the person list to the value returned by the HTTP response from the server.
      })
      .catch(err => console.log(err));
  }

  render(){
  return (
    <TabGrid/>
    // <AnimationRevealPage>
//      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
    //   <TabGrid
    //     heading={
    //       <>
    //         {this.state.name} <HighlightedText>menu.</HighlightedText>
    //       </>
    //     }
    //   />
    //   <Footer />
    // </AnimationRevealPage>
  );
  }
}
