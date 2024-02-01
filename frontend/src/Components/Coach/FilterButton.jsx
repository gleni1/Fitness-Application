import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './Filter.css'
import OneCoach from './OneCoach'
import Stack from 'react-bootstrap/Stack';
import './AllCoaches.css'
import AllCoaches from './AllCoaches';

const FilterButton = ({ items }) => {
  
  const [value, setValue] = useState('');

  

    return (
      <>
        <Dropdown>
          <Dropdown.Toggle className='button-4' variant="success" id="button-4">
            {items[0]}
          </Dropdown.Toggle>
    
          <Dropdown.Menu id="dropdown">
            {items.slice(1).map((item, index) => (
            <Dropdown.Item key={index} onClick={()=>setValue(item)}>
              {item}
            </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <p>{value}</p>
      </>
      );

}

export default FilterButton