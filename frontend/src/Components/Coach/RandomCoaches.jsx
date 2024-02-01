import React, {useState, useEffect} from 'react'
import OneCoach from './OneCoach'
import Stack from 'react-bootstrap/Stack';
import FilterButton from './FilterButton';
import './AllCoaches.css'
import axios from 'axios';

const RandomCoaches = ({vals, userId}) => {

    console.log('okokokkookkokokko'  + {vals})
    const [coachesList, setCoachesList] = useState([]);

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


    if (!vals || vals.length !== 4) {
      return null; // or render loading state or default content
    }

    return (
        <>
        <br />
            <div className='allCoaches'>
                {coachesList.slice(0,10).map((coach)=>{
                     /* ERROR HERE  vals[0] */ 
                     <h1>slakdfalskjfjaslkfjdslkjldskjlfksjda</h1>
                        return(
                            <Stack gap={3}>
                                <div className='p-2'><OneCoach userId={userId}  items={coach} /></div>
                            </Stack>
                        );
                    
                })}

            </div>

        </>
      );

}

export default RandomCoaches