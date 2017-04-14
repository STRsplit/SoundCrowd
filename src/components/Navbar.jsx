import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'elemental';

const Navbar = ({}) => {
  return (
    <div className="nav-container">
      <nav> 
        <Row className="3-col-row">
          <Col sm="1/3">
           One Third
          </Col>
          <Col sm="1/3">
            One Third
          </Col>
          <Col sm="1/3">
            One Third
          </Col>
        </Row>          
      </nav>
    </div>
  )

}

export default Navbar;