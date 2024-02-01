import React from 'react'
import { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/esm/Stack'
import CoachDetails from './CoachDetails'
import './ApprovalRequests.css';


const ApprovalRequests = () => {
    const [pendingCoaches, setPendingCoaches] = useState([]);
    const handleUpdateStatus = (coach_id, actionType) => {
      const updatedPendingCoaches = pendingCoaches.filter(coach => coach.user_id !== coach_id);
      setPendingCoaches(updatedPendingCoaches);
    };
        /*
        {
            name: "Dorice Brotherton",
            experience: "11 Years",
            goal: "improve endurance",
            cost:"$65/hour"

        },
        {
            name: "Lena Gentiry",
            experience: "12 Years",
            goal: "gain muscle",
            cost:"$25/hour"
        }
      ]);*/
      /*
      useEffect(() => {
        const fetchAllRequests = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/getPendingCoaches`);
            console.log(res.data);
            setPendingCoaches(res.data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchAllRequests();
      }, []); */
      useEffect(() => {
        fetch(process.env.REACT_APP_HOST+'/pendingCoaches') 
          .then((response) => response.json())
          .then((data) => setPendingCoaches(data))
          .catch((error) => console.error('Fetch error:', error));
      }, []);
    return (
        <>
            <div className='approvalRequests'>
            <h3>Pending Coach Approvals:</h3>
            {pendingCoaches.map((coach)=>(
                  <Stack gap={3}>
                    
                      <div className='p-2'>
                        <CoachDetails items={coach} onUpdateStatus={handleUpdateStatus}/>
                        {/* <CoachDetails
                          first_name={coach.first_name}
                          last_name={coach.last_name}
                          experience={coach.experience}
                          goal={coach.goal}
                          cost={coach.cost}
                        /> */}
                      </div>

                  </Stack>
              ) 
            )}
    
            </div>
    
        </>
      )
}

export default ApprovalRequests
