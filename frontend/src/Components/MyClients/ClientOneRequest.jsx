import React, {useState} from 'react'
import './ClientOneRequest.css'
import axios from 'axios';
import successBlue from '../icons/success-blue.png'
import trashIcon from '../icons/trash.png'


const ClientOneRequest = ({items, onClientStatusChange}) => {
  const [modal, setModal] = useState(false);
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);

  const coachId = localStorage.getItem("userId");
  const toggleModal = () =>{
    setModal(!modal);
  }

  const toggleDiv1 = () => {
    setShowDiv1(false);
    setModal(false);
    window.location.reload();
  }
  const toggleDiv2 = () => {
    setShowDiv2(false);
    setModal(false);
    window.location.reload();
  }

  const connectionId = items.coach_client_id;
  const clientId = items.client_id;
  console.log('aaaaaaaaa'  + connectionId);

  const acceptClientRequest = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_HOST}/acceptClientRequest`,{
        connectionId: items.coach_client_id,
      });
      if(response.status === 200) {
        onClientStatusChange(items.user_id, 'accepted');
      }
    } catch (error) {
      console.error('Error accepting client:', error);
    }
  };

  const declineClientRequest = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/declineClient`,{
        clientId: items.user_id,
        coachId: coachId
      });
      if(response.status === 200) {
        onClientStatusChange(items.user_id, 'declined');
      }
    } catch (error) {
      console.error('Error accepting client:', error);
    }
  };
  
  
  

  return (
    <>
      <div className="oneRequest" onClick={toggleModal}>
        <span className="name">{items.first_name + " " + items.last_name}</span>
        <span className="div" style={{color:'orange'}}>{items.status}</span>
      </div>


      {modal && (
        <div className='popup'>
          <div className='overlay1' onClick={toggleModal}></div>
          <div className="content">
            <button className='cancel' onClick={toggleModal}>X</button>
            <h1 className='coachName' style={{fontSize:"1.5rem", textDecoration:"underline"}}>{items.first_name}</h1>
            <span><b>GOAL:</b>  {items.goal_description}</span>
            <span><b>FITNESS LEVEL:</b>   {items.fitness_level}</span>
            <span><b>DIET:</b>  {items.diet}</span>
            <span><b>WEEKLY EXERCISE:</b>  {items.weekly_exercise}</span>
            <div className="buttons2">
              <button className='request' onClick={acceptClientRequest}>ACCEPT CLIENT</button>
              <button className='request' onClick={declineClientRequest}>DECLINE CLIENT</button>
            </div>
          </div>
        </div>
      )}

      {showDiv1 && (
          <div className='popup'>
          <div className='overlay1' onClick={toggleDiv1}></div>
          <div className="content" style={{height:"40vh",display:'flex', alignItems:"center", textAlign:"center", backgroundColor:"#36a679", color:"white"}}>
            <img src={successBlue} width={"140px"} style={{marginTop:"20px", marginBottom:"30px"}} alt="" />
            <h2>
              Request accepted!
            </h2>
          </div>
        </div>
        )}
      {showDiv2 && (
          <div className='popup'>
          <div className='overlay1' onClick={toggleDiv2}></div>
          <div className="content" style={{height:"40vh",display:'flex', alignItems:"center", textAlign:"center", backgroundColor:"#b54646", color:"white"}}>
            <img src={successBlue} width={"140px"} style={{marginTop:"20px", marginBottom:"30px"}} alt="" />
            <h2>
              Request declined!
            </h2>
          </div>
        </div>
        )}
    </>
  )
}

export default ClientOneRequest