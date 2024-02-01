import React, {useState, useEffect} from 'react'
import OneCoach from './OneCoach'
import Stack from 'react-bootstrap/Stack';
import FilterButton from './FilterButton';
import './AllCoaches.css'
import axios from 'axios';

const AllCoaches = ({vals, userId}) => {


    // console.log('okokokkookkokokko'  + {vals})
    const [coachesList, setCoachesList] = useState([]);

    // alert(userId);

    // Get all coaches.
    useEffect(() => {
      // Fetch coaches only when vals has values
      if (vals && vals.length === 4) {
        const fetchAllCoaches = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/coachList`);
            setCoachesList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllCoaches();
      }
    }, [vals]);
    //   const lst = ['Yoga', '5 Years', 'Ridgefield', '$59/month'];

    if (!vals || vals.length !== 4) {
      return null; // or render loading state or default content
    }

    return (
        <>
        <br />
            <div className='allCoaches'>
                {coachesList.map((coach)=>{
                     /* ERROR HERE  vals[0] */ 
                     if (
                      (!vals[0] || coach.goal === vals[0]) &&
                      (!vals[1] || coach.experience === vals[1]) &&
                      (!vals[2] || coach.state === vals[2]) &&
                      (!vals[3] || coach.cost === vals[3])
                  ) {
                        console.log('cldkdckcjdlcj' + coach);
                        return(
                            <Stack gap={3}>
                                <div className='p-2'>
                                  <OneCoach userId={userId} items={coach} acceptedCoache/>
                                </div>
                            </Stack>
                        );
                    }else{
                        return(null);
                    }
                })}

              {coachesList.every(coach =>
                  (vals[0] && coach.goal !== vals[0]) ||
                  (vals[1] && coach.experience !== vals[1]) ||
                  (vals[2] && coach.state !== vals[2]) ||
                  (vals[3] && coach.cost !== vals[3])
              ) ? (
                  <Stack gap={3} style={{ paddingLeft: "10px", marginTop: "10px" }}>
                      <p>No coaches meet the specified conditions.</p>
                      {/* Additional content */}
                  </Stack>
              ) : (
                  // Your other code here
                <p></p>
              )}
                
            </div>

        </>
      );

}

export default AllCoaches