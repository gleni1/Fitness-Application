import React, {useState, useEffect} from 'react'
import './YourCoach.css'
import OneRequest from './CoachOneRequest'
import Stack from 'react-bootstrap/esm/Stack'
import YourCoachExpanded from './YourCoachExpanded'
import axios from 'axios';

const YourCoach = ({userId}) => {
  const [coachesList, setCoachesList] = useState([]);

  const clientId = userId;

  useEffect(() => {
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
  }, [coachesList]);
  
  
  // console.log('hhhhhhhhh' + coachesList);

  return (
    <>
        <br />
        {coachesList.length!==0 ? ( 
        <div className='container1'>
          <div className='inContainer'>
            <span style={{marginLeft:"12px", color:"white"}}>YOUR COACH</span>
                    {coachesList.map((coach)=>{
                            return(
                                <Stack gap={3} key={coach.coach_id}>
                                    <div className='p-2'><YourCoachExpanded items={coach} userId={userId}/></div>
                                </Stack>
                            ) 
                    })}
          </div>
          </div>
          ):(
            <div className='container1'>
              <div className='inContainer'>
                <div>You have no coach.</div>
              </div>
            </div>
          )
        }
    </>
  )
}

export default YourCoach