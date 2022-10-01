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
import Light from './Light';

export default function LightList() {
  const [lightList, setLightList] = useState();

  useEffect(() => {
    const todoRef = firebase.database().ref('LightSystem');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const lightList = [];
      for (let id in todos) {
        lightList.push({ id, ...todos[id] });
      }
      setLightList(lightList);
    });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      {lightList
        ? lightList.map((todo, index) => <Light todo={todo} key={index} />)
        : ''}
    </div>
  );
}
