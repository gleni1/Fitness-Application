import React, {useState} from 'react'
import './CoachOneRequest.css'
import axios from 'axios';
import successBlue from '../icons/success-blue.png'

const CoachOneRequest = ({items, userId}) => {
  const [modal, setModal] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const toggleModal = () =>{
    setModal(!modal);
  }

  const toggleDiv = () => {
    setShowDiv(false);
    setModal(false);
    // window.location.reload();
  }

  const requestId = items.coach_client_id;


  const deletePendingRequest = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_HOST}/deleteCoachRequest/${requestId}`);
      // console.log(res.data);
      // setCoachesList(res.data.surveyData);
      if (res.data.ok) {
        // Do something if the response indicates success
        // alert('Successfully deleted request.')
        // window.location.reload();
        setShowDiv(true);
      } else {
        alert('Request couldnt be deleted');
        // Do something else if the response indicates failure
      }
    } catch (err) {
      console.log(err);
    }
  };
  
    


  return (
    <>
      {items ? (
        <div className="oneRequest" onClick={toggleModal}>
          <div className="text-wrapper">{"Name: " + items.first_name + " " + items.last_name}</div>
          <div className="div">{"Specialization: " + items.goal}</div>
          <div className="text-wrapper-2">{"Experience: " + items.experience + " Years"}</div>
        </div>
      ) : (
        <p></p>
      )}

      {modal && (
        <div className='popup'>
          <div className='overlay1' onClick={toggleModal}></div>
          <div className="content">
            <button className='cancel' onClick={toggleModal}>X</button>
            <h1 className='coachName' style={{fontSize:"1.5rem", textDecoration:"underline"}}>{"Name: " + items.first_name + " " + items.last_name}</h1>
            <span>{"Specialization: " + items.goal}</span>
            <span>{"Experience: " + items.experience + " years"}</span>
            <span>{"Location: " + items.city + ", " + items.state}</span>
            <span>{"Cost: " + "$" + items.cost  + "/month"}</span>
            <span>{"Schedule: " + items.schedule}</span>
            <button className='request' onClick={deletePendingRequest}>CANCEL REQUEST</button>
          </div>
        </div>
      )}

      {showDiv && (
          <div className='popup'>
          <div className='overlay1' onClick={toggleDiv}></div>
          <div className="content" style={{display:'flex', alignItems:"center", textAlign:"center", backgroundColor:"#c34e57", color:"white"}}>
            <img src={successBlue} width={"140px"} style={{marginTop:"20px", marginBottom:"30px"}} alt="" />
            <h2>
              Request deleted!
            </h2>

          </div>
        </div>
        )}
    </>
  )
}

export default CoachOneRequest


