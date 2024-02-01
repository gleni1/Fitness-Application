import React, { useState, useEffect } from 'react'
import './OneCoach.css'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import successLogo from '../icons/success.png'
import successBlue from '../icons/success-blue.png'

const OneCoach = ({userId, items}) => {
  const [modal, setModal] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  // const [info, setInfo] = useState([]);

  // alert(userId);

  // console.log('USER ID from ONE COACH: ', userId);

  const clientId = userId;


  const toggleModal = () =>{
    setModal(!modal);
  }

  const toggleDiv = () => {
    setShowDiv(false);
  }


  const [coachesList, setCoachesList] = useState([]);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/clientInfo/${clientId}`);
        console.log('aaaaaaaaaaaaaaaa: ' + res.data);
        setClientInfo(res.data.surveyData);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchClientInfo();


    const fetchAcceptedCoach = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/acceptedCoach/${clientId}`);
        // console.log(res.data);
        setCoachesList(res.data.surveyData);
      } catch (err) {
        console.log(err);
      }
    };
  

    fetchAcceptedCoach();
  }, [clientId]);

  // console.log('asdfaadsfasfasfasfsadfasfd', userId);
  

  const [hasCurrentCoach, setHasCurrentCoach] = useState(false);

  useEffect(() => {
    if (coachesList.length !== 0) {
      setHasCurrentCoach(true);
    } else {
      setHasCurrentCoach(false);
    }
  }, [coachesList]);
  

  const handleClick = async () => {
    if(userId){
      if(!hasCurrentCoach){
        try {
          const response = await axios.post(`${process.env.REACT_APP_HOST}/requestCoach`, {clientId, items});
          console.log('Response:', response.data);
          toggleModal();
          if (response.data.ok) {
            setShowDiv(true);
          } else {
          }
          // Perform actions based on the response
        } catch (error) {
          console.error('Error:', error);
        }
      }else{
        alert('You already have a coach.')
      }
    }else{
      alert("You need to login first")
    }
  };


  console.log(items);

  return (
    <>
    
      <div className='oneCoach' onClick={toggleModal}>
        <span id='name'>{items.first_name}</span>
        <span>{"Specialization: " + items.goal}</span>
        <span>{"Experience: " + items.experience + " years"}</span>
      </div>

      {modal && (
        <div className='popup'>
          <div className='overlay1' onClick={toggleModal}></div>
          <div className="content">
            <button className='cancel' onClick={toggleModal}>X</button>
            <h1 className='coachName' style={{fontSize:"1.5rem", textDecoration:"underline"}}>{items.first_name}</h1>
            <span>Goal: {items.goal}</span>
            <span>Experience: {items.experience}</span>
            <span>City: {items.city}</span>
            <span>Cost: {items.cost}</span>
            {/* <span>{items.schedule}</span> */}
            <button className='request' onClick={handleClick}>REQUEST COACH</button>
          </div>
        </div>
      )}

      {showDiv && (
        <div className='popup'>
        <div className='overlay2' onClick={toggleDiv}></div>
        <div className="content" style={{display:'flex', alignItems:"center", textAlign:"center", backgroundColor:"#01766c", color:"white"}}>
          <img src={successBlue} width={"140px"} style={{marginTop:"20px", marginBottom:"30px"}} alt="" />
          <h2>
            Request successfully sent!
          </h2>

        </div>
      </div>
      )}
    </>
  )
}

export default OneCoach