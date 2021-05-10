import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line


import RestaurantLandingPage from "pages/Menu.js";
import ResultsPage from "pages/Results.js";
import HomePage from "pages/Home.js"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <Router>
      <Switch>
        <Route path="/restaurant/:rid">
          <RestaurantLandingPage/>
        </Route>
        <Route path="/results">
          <ResultsPage/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>

      </Switch>
    </Router>
  );
}

