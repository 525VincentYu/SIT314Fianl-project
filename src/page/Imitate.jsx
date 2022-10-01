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
import Button from 'react-bootstrap/Button';
import VideoBac from '../../src/3.mp4';
import '../index.css';
import ImitateLightList from './Components/ImitateLightList';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';

export default function Imitate() {
  return (
    <div>
      <div
        className='content1'
        style={{ marginBottom: '200px', backgroundColor: 'grey' }}
      >
        <h1>imitated light display page</h1>
        <div style={{ marginTop: '100px' }}>
          <ImitateLightList />
        </div>
      </div>
    </div>
  );
}
