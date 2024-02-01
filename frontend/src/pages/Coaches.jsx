//import React, { useState } from "react";
import Filter from "../Components/Coach/Filter";
import AllCoaches from "../Components/Coach/AllCoaches";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import "./styles/Coaches.css";

function Coaches({userId}) {
  return (
    <div className="coaches">
        <div className="header">
          <h1>Coaches</h1>
        </div>
        <div className="container">
          <Filter userId={userId}/>
          <AllCoaches userId={userId}/>
        </div>
    </div>
  );
}

export default Coaches;