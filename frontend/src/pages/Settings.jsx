import React from "react";
import SettingsForm from "../Components/Settings/SettingsForm";
import './styles/Settings.css'
export default function Settings() {
    return(
      <div className="page1">
        <h1 style={{ textAlign: "center", marginTop:"10px" }}>Settings</h1>
        <div className="form">
          <SettingsForm />
        </div>
    </div>
    );
}