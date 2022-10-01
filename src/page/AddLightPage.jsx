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
import { Input } from 'semantic-ui-react';
import VideoBac from '../1.mp4';
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from 'react-audio-visualizers';
import Z from './1.mp3';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';

export default function AddLight() {
  const [name, setName] = useState('');
  const [light, setLight] = useState();
  const [date, setDate] = useState();
  const [roomNumber, setRoomNumber] = useState('');
  const [lightNumber, setLightNumber] = useState('');

  const createTodo = () => {
    const todoRef = firebase.database().ref('LightSystem');
    for (let i = 0; i < 10; i++) {
      const todo = {
        name,
        roomNumber,
        lightNumber: i,
        light,
        smoke: false,
        brightness: 3,
        date: '',
      };

      todoRef.push(todo);
    }
  };
  const createTodo1 = () => {
    const todoRef = firebase.database().ref('LightSystem');

    const todo = {
      name,
      roomNumber,
      lightNumber,
      light,
      smoke: false,
      brightness: 3,
      date: '',
    };

    todoRef.push(todo);
  };
  return (
    <div>
      <video
        src={VideoBac}
        autoPlay
        loop
        muted
        style={{
          marginBottom: '-5px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div className='content1'>
        <div>
          <SpectrumVisualizer
            audio={Z}
            theme={SpectrumVisualizerTheme.radialSquaredBars}
            colors={['#ffff00', '#26a69a']}
            barWidth={40}
            numBars={100}
            iconsColor='#26a69a'
            mirror={true}
            //numBars={50}
            highFrequency={20000}
            lowFrequency={200}
          />
        </div>
        <h1
          style={{ marginBottom: '40px', fontWeight: 'Bold', color: 'black' }}
        >
          Add Light System
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backGroundColor: 'white',
            marginBottom: '20px',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id='demo-simple-select-label'>
              Building Number
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Building Number'
              onChange={(e) => setName(e.target.value)}
            >
              <MenuItem value='builidng1'>builidng 1</MenuItem>
              <MenuItem value='building2'>builidng 2</MenuItem>
              <MenuItem value='building3'>builidng 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id='demo-simple-select-label'>Room Number</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Room Number'
              onChange={(e) => setRoomNumber(e.target.value)}
            >
              <MenuItem value='room1'>room 1</MenuItem>
              <MenuItem value='room2'>room 2</MenuItem>
              <MenuItem value='room3'>room 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <TextField
              id='outlined-basic'
              label='Light Number'
              variant='outlined'
              onChange={(e) => setLightNumber(e.target.value)}
            />
          </FormControl>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id='demo-simple-select-label'>Light Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Light Status'
              onChange={(e) => setLight(e.target.value)}
            >
              <MenuItem value={true}>on</MenuItem>
              <MenuItem value={false}>off</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' size='large' onClick={createTodo1}>
            Add Light
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' size='large' onClick={createTodo}>
            Add Light(100)
          </Button>
        </div>
      </div>
    </div>
  );
}
