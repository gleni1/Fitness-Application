import React from 'react'
import { useState, useEffect } from 'react'
import CoachOneRequest from './CoachOneRequest'
import './CoachRequests.css'
import Stack from 'react-bootstrap/esm/Stack'
import axios from 'axios'

const Requests = ({userId}) => {
  const [coachesList, setCoachesList] = useState([]);

  const clientId = userId;

  useEffect(() => {
    const fetchPendingCoach = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/pendingCoach/${clientId}`);
        // console.log(res.data);
        setCoachesList(res.data.surveyData);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchPendingCoach();
  }, [coachesList]);
  

  // const lst = ['Yoga', '5 Years', 'Ridgefield', '$59/month'];

  return (
    <>
        <div className='allRequestsss'>
            <span className="text-wrapper1">PENDING COACH REQUESTS:</span>

            {coachesList.map((coach)=>{
              return(
                  <Stack gap={3} key={coach.coach_id}>
                      <div className='p-2'><CoachOneRequest items={coach} userId={userId}/></div>
                  </Stack>
              );  
            })}

        </div>

    </>
  )
}

export default Requests