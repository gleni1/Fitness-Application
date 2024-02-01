import React, {useState} from 'react'
import './CoachDetails.css'

const CoachDetails = ({items, onUpdateStatus}) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () =>{
    setModal(!modal);
  }
  const handleUpdateStatus = (coach_id, actionType) => {
    onUpdateStatus(coach_id, actionType);
    fetch(`${process.env.REACT_APP_HOST}/updateCoachStatus/${coach_id}/${actionType}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {    
        console.log(`Coach ${actionType}d:`, result);
      })
      .catch((error) => {
        console.error(`Error ${actionType}ing coach:`, error);
      });
      toggleModal();
  };
  return (
    <>
      {items ? (
        <div className="oneRequest" onClick={toggleModal}>
          <h5>Name: {items.first_name} {items.last_name}</h5>
          <h5>Experience: {items.experience} years</h5>
        </div>
      ) : (
        <p></p>
      )}

      {modal && (
        <div className='popup'>
          <div className='overlay1' onClick={toggleModal}></div>
          <div className="content">
            <button className='cancel' onClick={toggleModal}>X</button>
            <h1 className='coachName' style={{fontSize:"1.5rem", textDecoration:"underline"}}>{items.first_name} {items.last_name}</h1>
                <span>Experience: {items.experience} years</span>
                <span>Goal: {items.goal}</span>
                <span>Cost: ${items.cost}/month</span>
            <button className='accept' onClick={() => handleUpdateStatus(items.user_id, 'accept')}>Accept</button>
            <button className='decline'onClick={() => handleUpdateStatus(items.user_id, 'decline')}>Decline</button>

          </div>
        </div>
      )}
    </>
  )
}

export default CoachDetails

