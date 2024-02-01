import { React, useState } from "react";
import "./styles/Footer.css";
import { Link } from "react-router-dom";
import homeDumbbell from "../icons/homedumbbell.png";
import activity from "../icons/activity.png";
import progress from "../icons/progress.png";
import mycoachIcon from "../icons/mycoach.png";
import clientWorkout from "../icons/clientworkout.png";
import clientsIcon from "../icons/clients.png";
import chatIcon from "../icons/chat.png";
import adminIcon from '../icons/admin.png'
import settingsIcon from '../icons/settingsIcon.png'


function Footer({ onLoginClick, onSignupClick, userRole }) {
  const [activeLink, setActiveLink] = useState(null);
  const coachStatus = localStorage.getItem("coachStatus");
  console.log('userRole:', userRole);
  console.log('coachStatus:', coachStatus);
  const toggleLink = (linkId) => {
    setActiveLink(linkId === activeLink ? null : linkId);
  };
  // Conditionally render footer content based on userRole
  const renderFooterContent = () => {
    if (userRole === "coach" && coachStatus === "accepted") {
      return (
        <>
          {/* <Link to="/MyWorkout">My Workout</Link>
          <Link to="/Activity">Activity</Link>
          <Link to="/Progress">Progress</Link> */}
          <Link
            id="link4"
            to="/Clients"
            className={activeLink === "link4" ? "active" : ""}
            onClick={() => toggleLink("link4")}
          >
            <img
              src={clientsIcon}
              style={{
                width: "20px",
                display: "inline-block",
                marginRight: "12px",
              }}
            />
            MyClients
          </Link>
          <Link
            id="myWorkout"
            className={activeLink === "myWorkout" ? "active" : ""}
            onClick={() => toggleLink("myWorkout")}
            to="/MyWorkout"
          >
            <img
              src={homeDumbbell}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            MyWorkout
          </Link>
          <Link id='link3' to='/MyCoach' className={activeLink === 'link3' ? 'active' : ''} onClick={() => toggleLink('link3')}>
            <img 
              src={mycoachIcon} 
              style={{
                width:"20px", 
                display:"inline-block", 
                marginRight: "12px"
              }} 
            />
            MyCoach
            </Link>
          <Link
            id="activity"
            className={activeLink === "activity" ? "active" : ""}
            onClick={() => toggleLink("activity")}
            to="/Activity"
          >
            <img
              src={activity}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Activity
          </Link>
          <Link
            id="progress"
            className={activeLink === "progress" ? "active" : ""}
            onClick={() => toggleLink("progress")}
            to="/Progress"
          >
            <img
              src={progress}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Progress
          </Link>
          <Link
            id="chat"
            className={activeLink === "chat" ? "active" : ""}
            onClick={() => toggleLink("chat")}
            to="/ChatMain"
          >
            <img
              src={chatIcon}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Chat
          </Link>
          <Link
            id="link6"
            to="/Settings"
            className={activeLink === "link6" ? "active" : ""}
            onClick={() => toggleLink("link6")}
          >
            Settings
          </Link>
        </>
        );
        } else if (userRole === 'admin') {
        return (
          <>
            {/* <Link to="/MyWorkout">My Workout</Link>
            <Link to="/Activity">Activity</Link>
            <Link to="/Progress">Progress</Link> */}
            <Link id='link4' to='/Clients' className={activeLink === 'link4' ? 'active' : ''} onClick={() => toggleLink('link4')}>
            <img 
              src={clientsIcon} 
              style={{
                width:"20px", 
                display:"inline-block", 
                marginRight: "12px"
              }} 
            />
            MyClients
            </Link>
            <Link id='myWorkout' className={activeLink === 'myWorkout' ? 'active' : ''} onClick={() => toggleLink('myWorkout')} to='/MyWorkout' >
            <img 
                src={homeDumbbell} 
                style={{ 
                  width:"20px" ,marginRight: "10px"
                  }}
            />
            MyWorkout
          </Link>
          <Link id='link3' to='/MyCoach' className={activeLink === 'link3' ? 'active' : ''} onClick={() => toggleLink('link3')}>
            <img 
              src={mycoachIcon} 
              style={{
                width:"20px", 
                display:"inline-block", 
                marginRight: "12px"
              }} 
            />
            MyCoach
            </Link>
            <Link id='activity' className={activeLink === 'activity' ? 'active' : ''} onClick={() => toggleLink('activity')} to='/Activity' >
            <img 
                src={activity} 
                style={{ 
                  width:"20px" ,marginRight: "10px"
                  }}
            />
            Activity
          </Link>
          <Link id='progress' className={activeLink === 'progress' ? 'active' : ''} onClick={() => toggleLink('progress')} to='/Progress' >
            <img 
                src={progress} 
                style={{ 
                  width:"20px" ,marginRight: "10px"
                  }}
            />
            Progress
          </Link>
          <Link
            id="chat"
            className={activeLink === "chat" ? "active" : ""}
            onClick={() => toggleLink("chat")}
            to="/ChatMain"
          >
            <img
              src={chatIcon}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Chat
          </Link>
           <Link
            id="link6"
            to="/Settings"
            className={activeLink === "link6" ? "active" : ""}
            onClick={() => toggleLink("link6")}
          >
            <img src={settingsIcon}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Settings
          </Link> 
          <Link id='link7' to='/Admin' className={activeLink === 'link7' ? 'active' : ''} onClick={() => toggleLink('link7')} >
            <img 
              src={adminIcon} 
              style={{ 
                width:"20px", 
                display:"inline-block", 
                marginRight: "12px"
              }} 
            />
            Admin
          </Link>
          </>
        );
    } else if (userRole === "client" || (userRole === "coach" && coachStatus !== "accepted")) {
      return (
        <>
          {/* <Link to="/MyWorkout">My Workout</Link>
          <Link to="/Activity">Activity</Link>
          <Link to="/Progress">Progress</Link> <div>My Coach</div> */}
          <Link
            id="link5"
            to="/ClientWorkouts"
            className={activeLink === "link5" ? "active" : ""}
            onClick={() => toggleLink("link5")}
          >
            <img
              src={clientWorkout}
              style={{
                width: "20px",
                display: "inline-block",
                marginRight: "12px",
              }}
            />
            My Workouts
          </Link>
          <Link
            id="link3"
            to="/MyCoach"
            className={activeLink === "link3" ? "active" : ""}
            onClick={() => toggleLink("link3")}
          >
            <img
              src={mycoachIcon}
              style={{
                width: "20px",
                display: "inline-block",
                marginRight: "12px",
              }}
            />
            MyCoach
          </Link>
          {/* <Link
            id="myWorkout"
            className={activeLink === "myWorkout" ? "active" : ""}
            onClick={() => toggleLink("myWorkout")}
            to="/MyWorkout"
          >
            <img
              src={homeDumbbell}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            MyWorkout
          </Link> */}
          <Link
            id="activity"
            className={activeLink === "activity" ? "active" : ""}
            onClick={() => toggleLink("activity")}
            to="/Activity"
          >
            <img
              src={activity}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Activity
          </Link>
          <Link
            id="progress"
            className={activeLink === "progress" ? "active" : ""}
            onClick={() => toggleLink("progress")}
            to="/Progress"
          >
            <img
              src={progress}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Progress
          </Link>
          <Link
            id="chat"
            className={activeLink === "chat" ? "active" : ""}
            onClick={() => toggleLink("chat")}
            to="/ChatMain"
          >
            <img
              src={chatIcon}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Chat
          </Link>
           <Link
            id="link6"
            to="/Settings"
            className={activeLink === "link6" ? "active" : ""}
            onClick={() => toggleLink("link6")}
          >
            <img src={settingsIcon}
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            />
            Settings
          </Link> 
        </>
      );
    } else {
      return (
        <>
          <div className="signLogButtons">
            <div className="login" onClick={onLoginClick}>
              LOGIN
            </div>
            <div className="signup" onClick={onSignupClick}>
              SIGNUP
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="footer">{renderFooterContent()}</div>;
}

export default Footer;