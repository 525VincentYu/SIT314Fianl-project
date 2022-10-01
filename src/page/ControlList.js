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
import Control from './Cntrol';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { AiOutlineSearch } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

export default function ControlList() {
  const [ControlList, setControlList] = useState();
  const [option, setOption] = useState();
  const [query, setQuery] = useState('');

  const switches1 = () => {
    const todoRef1 = firebase
      .database()
      .ref('LightSystem')
      .orderByChild('light')
      .equalTo(false)
      .on('child_added', (snap) => {
        console.log(snap.val());
        console.log(snap.key);
        const id = snap.key;
        const todoRef = firebase.database().ref('LightSystem').child(id);
        todoRef.update({
          light: !snap.val().light,
        });
      });
  };
  const music = () => {
    const todoRef1 = firebase
      .database()
      .ref('LightSystem')
      .orderByChild('music')
      .equalTo(1)
      .on('child_added', (snap) => {
        console.log(snap.val());
        console.log(snap.key);
        const id = snap.key;
        const todoRef = firebase.database().ref('LightSystem').child(id);
        todoRef.update({
          music: 0,
        });
      });
  };
  const music1 = () => {
    const todoRef1 = firebase
      .database()
      .ref('LightSystem')
      .orderByChild('music')
      .equalTo(0)
      .on('child_added', (snap) => {
        console.log(snap.val());
        console.log(snap.key);
        const id = snap.key;
        const todoRef = firebase.database().ref('LightSystem').child(id);
        todoRef.update({
          music: 1,
        });
      });
  };
  const switches2 = () => {
    const todoRef1 = firebase
      .database()
      .ref('LightSystem')
      .orderByChild('light')
      .equalTo(true)
      .on('child_added', (snap) => {
        console.log(snap.val());
        console.log(snap.key);
        const id = snap.key;
        const todoRef = firebase.database().ref('LightSystem').child(id);
        todoRef.update({
          light: !snap.val().light,
        });
      });
  };

  useEffect(() => {
    setOption(0);
    const todoRef = firebase.database().ref('LightSystem');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const lightList = [];
      for (let id in todos) {
        lightList.push({ id, ...todos[id] });
      }
      setControlList(lightList);
      console.log(ControlList);
    });
  }, []);

  return (
    <div>
      <div style={{ marginLeft: '500px' }}>
        <div>
          <FormGroup>
            <FormControlLabel
              onClick={() => setOption(1)}
              control={<Checkbox />}
              label='Building Number'
            />
            <FormControlLabel
              onClick={() => setOption(2)}
              control={<Checkbox />}
              label='Room Number'
            />
            <FormControlLabel
              onClick={() => setOption(3)}
              control={<Checkbox />}
              label='Light Number'
            />
          </FormGroup>
        </div>
        <Button onClick={switches1} variant='primary' size='lg'>
          turn on all
        </Button>
        <Button onClick={switches2} variant='primary' size='lg'>
          turn off all
        </Button>
        <Button onClick={music} variant='primary' size='lg'>
          music mode on
        </Button>
        <Button onClick={music1} variant='primary' size='lg'>
          music mode off
        </Button>

        <div style={{ display: 'flex' }}>
          <button className='ai'>
            <AiOutlineSearch size={22} />
          </button>
          <input
            style={{ width: '350px', marginRight: '50px' }}
            type='text'
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search...'
          ></input>
        </div>
      </div>
      <div
        style={{
          display: 'flex',

          fontWeight: 'bold',
          marginTop: '40px',
          marginBottom: '40px',
        }}
      >
        <div style={{ marginRight: '10px' }}>
          <p>Builing number</p>
        </div>
        <div style={{ marginRight: '10px' }}>
          <p>Room number</p>
        </div>
        <div style={{ marginRight: '30px' }}>
          <p>Light number</p>
        </div>
        <div style={{ marginRight: '70px' }}>
          <p>Switch</p>
        </div>
        <div style={{ marginRight: '60px' }}>
          <p>Timer</p>
        </div>
        <div style={{ marginRight: '100px' }}>
          <p>Set estimated time</p>
        </div>
        <div style={{ marginRight: '50px' }}>
          <p>See the time</p>
        </div>
      </div>
      {option == 0 && ControlList
        ? ControlList.map((todo, index) => <Control todo={todo} key={index} />)
        : ''}
      {option == 1 && ControlList
        ? ControlList.filter((todo) =>
            todo.name.toLowerCase().includes(query)
          ).map((todo, index) => <Control todo={todo} key={index} />)
        : ''}
      {option == 2 && ControlList
        ? ControlList.filter((todo) =>
            todo.roomNumber.toLowerCase().includes(query)
          ).map((todo, index) => <Control todo={todo} key={index} />)
        : ''}
      {option == 3 && ControlList
        ? ControlList.filter((todo) => todo.Number.includes(query)).map(
            (todo, index) => <Control todo={todo} key={index} />
          )
        : ''}
    </div>
  );
}
