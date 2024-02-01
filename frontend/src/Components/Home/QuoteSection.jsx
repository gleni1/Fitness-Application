import React, { Component } from "react";
import "./styles/QuoteSection.css";
import image from "./images/logo-full.png";

export class QuoteSection extends Component {
  render() {
    return (
      <div className="quote-section">
        <img src={image} alt="Tru-Fit"></img>
        <h3>
          “IF YOU DON’T FIND THE TIME, IF YOU DON’T DO THE <br></br> WORK, YOU
          DON’T GET THE RESULTS.”<br></br>— ARNOLD SCHWARZENEGGER
        </h3>
      </div>
    );}
}

export default QuoteSection;