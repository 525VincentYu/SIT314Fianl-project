import React, { useEffect } from 'react';
import '../App.css';
import Accordion from 'react-bootstrap/Accordion';
import Clock from './Components/Clock';
import { BsLightbulbFill } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import LightList from './LightList';
import Control from './Cntrol';
import ControlList from './ControlList';
import VideoBac from '../VideoBac.mp4';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  let navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: 'grey',
      }}
    >
      <div>
        <Nav className='justify-content-center' activeKey='/home'>
          <Nav.Item>
            <Nav.Link href='/AddLight'>Add Light</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/Imitate'>See Imitate Light</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/SignUp'>Sign Up</Nav.Link>
          </Nav.Item>
        </Nav>
        <div>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>
            Smart light control IoT system
            <BsLightbulbFill />
          </h1>

          <div style={{ marginTop: '0px' }}>
            <ControlList />
          </div>
        </div>
      </div>
    </div>
  );
}
