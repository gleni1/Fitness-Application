import React, { useEffect, useState } from 'react'
import FilterButton from './FilterButton';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OneCoach from './OneCoach';
import Stack from 'react-bootstrap';
import AllCoaches from './AllCoaches';
import axios from 'axios';
import RandomCoaches from './RandomCoaches';


const Filter = ({userId}) => {


    const [goalList, setGoalsList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [costList, setCostList] = useState([]);
    // const costList = ["Cost" ,"$59/month", "$69/month", "$89/month", "$129/month"];

    
    const [clicked, setClicked] = useState(false);
    const [items, setItems] = useState([]);

    // Get all distinct type of goals from the database.
    useEffect(() => {
        const fetchAllGoals = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/goalsList`);
            console.log(res.data);
            setGoalsList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllGoals();
      }, []); 

    // Get experience list.
    useEffect(() => {
        const fetchAllExperiences = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/experienceList`);
            console.log(res.data);
            setExperienceList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllExperiences();
      }, []); 

    // Get location list.
    useEffect(() => {
        const fetchAllLocations = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/locationList`);
            console.log(res.data);
            setLocationList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllLocations();
      }, []); 

    // Get city list.
    useEffect(() => {
        const fetchAllCities = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/cityList`);
            console.log(res.data);
            setCityList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllCities();
      }, []); 

    // Get price list.
    useEffect(() => {
        const fetchCostList = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/costList`);
            console.log(res.data);
            setCostList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchCostList();
      }, []); 


      const modifiedList = [''].concat(goalList); // Add an empty string at the beginning
      const modifiedExperience = [''].concat(experienceList); // Add an empty string at the beginning
      const modifiedState = [''].concat(locationList); // Add an empty string at the beginning
      const modifiedCost = [''].concat(costList); // Add an empty string at the beginning





    const toggleBtn = () => {
        setClicked(true);
    }
    
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [cityVal, setCityVal] = useState('');

 

    return (
        <>
            <div className='bar-1'>
                <span className='filter-by'>FILTER BY: </span>
                <div className='top-bar'>
                    <Container>
                        <Row className='bla'>
                            <Col>
                                <Dropdown style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                  <span style={{marginRight:"5px"}}>Goal</span>
                                    <Dropdown.Toggle className='button-4' variant="success" id="button-4" style={{width:"12.5vw"}}>
                                        {value1 || (modifiedList[0] && modifiedList[0].goal) + " goal"}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu id="dropdown">
                                        {modifiedList.map((item, index) => (
                                        <Dropdown.Item key={index}  onClick={()=>setValue1(item.goal)}>
                                        {item.goal + " goal"}
                                        </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <span style={{marginRight:"5px"}}>Experience</span>
                                    <Dropdown.Toggle className='button-4' variant="success" id="button-4" style={{width:"11.5vw"}}>
                                        {value2 + " Years" || (experienceList[0] && experienceList[0].experience) + " Years"}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu id="dropdown" style={{maxHeight:"30vh", overflowY:"auto"}}>
                                        {modifiedExperience.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={()=>setValue2(item.experience)}>
                                        {item.experience + " Years"}
                                        </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                    <span style={{marginRight:"5px"}}>State</span>
                                    <Dropdown.Toggle className='button-4' variant="success" id="button-4" style={{width:"11.5vw"}}>
                                        {value3  || (modifiedState[0] && modifiedState[0].state) + " state"}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu id="dropdown" style={{maxHeight:"30vh", overflowY:"auto"}}>
                                        {modifiedState.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={()=>setValue3(item.state)}>
                                        {item.state + " "}
                                        </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                    <span style={{marginRight:"5px"}}>Cost</span>
                                    <Dropdown.Toggle className='button-4' variant="success" id="button-4" style={{width:"11.5vw"}}>
                                        {"$" + value4 + "/month" || "$" + (costList[0] && costList[0].cost) + "/month"}
                                    </Dropdown.Toggle>
                                
                                    <Dropdown.Menu id="dropdown" style={{maxHeight:"30vh", overflowY:"auto"}}>
                                        {modifiedCost.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={()=>setValue4(item.cost)}>
                                        {"$" + item.cost + "/month"}
                                        </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <br />
                <div className='apply-btn'>
                    <Button 
                        onClick={toggleBtn}
                        id='apply' 
                        variant="dark"
                    >
                        APPLY
                    </Button>
                </div>
            </div>
            {clicked ? 
              <AllCoaches vals = {[value1, value2, value3, value4]} userId={userId}/> 
              : 
              <RandomCoaches vals={[value1, value2, value3, value4]}  userId={userId}/>}
        </>
      );
}

export default Filter

 

/*

<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
  <span style={{marginRight:"5px"}}>Location</span>
  <input type="checkbox" checked={isChecked}  onChange={handleCheckboxChange} />
</div>

*/