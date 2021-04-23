import React from "react";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      restaurants: [],
    };
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/results", {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(restlist => {
        // Map each attribute of a person in this.state.people to an HTML element
        let RestDivs = restList.map((restaurant, i) => (
          <div key={i} className="restaurant-result">
            <div className="Name">{restaurant.restaurant_name}</div>
            <div className="Loc">{person.name}</div>
            <div className="Price">{restaurant.price_range}</div>
            <div className="phone">{restaurant.restaurant_phone}</div>
          </div>
        ));

        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          restaurants: RestDivs,
        });
      })
      .catch(err => console.log(err)); // Print the error if there is one.
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="Dashboard" />
        <div className="container people-container">
          <br></br>
          <div className="jumbotron less-headspace">
            <div className="people-container">
              <div className="people-header">
                <div className="header-lg">
                  <strong>Login</strong>
                </div>
                <div className="header">
                  <strong>Name</strong>
                </div>
                <div className="header">
                  <strong>Birth Year</strong>
                </div>
              </div>
              <div className="results-container" id="results">
                {this.state.restaurants}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
