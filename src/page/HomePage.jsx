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
import Z from './1.mp3';
import LightList from './LightList';

import ReactDOM from 'react-dom';
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from 'react-audio-visualizers';

function HomePage() {
  const [light1, setLight1] = useState(0);
  const [light2, setLight2] = useState(0);
  const [light3, setLight3] = useState(0);

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [date, setdate] = useState('');
  const [dates, setdates] = useState('');

  const [hour, sethour] = useState('');
  const [minute, setminute] = useState('');
  const [second, setsecond] = useState('');
  const [Flag, setFlag] = useState(false);

  const todoRef = firebase.database().ref('building1');
  const todoRef1 = firebase.database().ref('building2');
  const todoRef2 = firebase.database().ref('building3');
  const todoRef3 = firebase.database().ref('date');

  let interval;

  const setTimer = () => {
    setFlag(true);
    const todoRef3 = firebase.database().ref('date');

    todoRef3.set(date);
  };

  const startTimer = () => {
    global.countDownDate = new Date(dates.toString()).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = global.countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer

        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
    todoRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setLight1(data);
    });
    todoRef1.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setLight2(data);
    });
    todoRef2.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setLight3(data);
    });
    todoRef3.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setdates(data);
    });
  });

  const createTodo = () => {
    const todoRef = firebase.database().ref('building1');
    setLight1(1);

    todoRef.set(1);
    //console.log('light2' + light1);
  };
  const createTodo1 = () => {
    setLight1(0);
    //console.log('light1' + light1);
    const todoRef = firebase.database().ref('building1');
    todoRef.set(0);
  };
  const createTodo2 = () => {
    const todoRef = firebase.database().ref('building2');
    setLight2(1);

    todoRef.set(1);
    //console.log('light2' + light1);
  };
  const createTodo3 = () => {
    setLight2(0);
    //console.log('light1' + light1);
    const todoRef = firebase.database().ref('building2');
    todoRef.set(0);
  };
  const createTodo4 = () => {
    const todoRef = firebase.database().ref('building3');
    setLight3(1);

    todoRef.set(1);
    //console.log('light2' + light1);
  };
  const createTodo5 = () => {
    setLight3(0);
    //console.log('light1' + light1);
    const todoRef = firebase.database().ref('building3');
    todoRef.set(0);
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Smart light control IoT system
        <BsLightbulbFill />
      </h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <div style={{ flex: '33.3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaBuilding size={100} />
          </div>
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            Buiding 1
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {light1 == 0 && <BsLightbulbFill size={100} onClick={createTodo} />}
            {light1 == 1 && <FaRegLightbulb size={100} onClick={createTodo1} />}
          </div>
          <div
            style={{
              margin: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {<IoIosTimer size={100} onClick={setTimer} />}
          </div>
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            set date
            <input
              disabled={Flag}
              value={date}
              onChange={(e) => Flag == false && setdate(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            set hour
            <input
              value={hour}
              onChange={(e) => sethour(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            set minute
            <input
              value={minute}
              onChange={(e) => setminute(e.target.value)}
            ></input>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            set second
            <input
              value={second}
              onChange={(e) => setsecond(e.target.value)}
            ></input>
          </div>
          <div className='App'>
            <Clock
              timerDays={timerDays}
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
            />
          </div>
        </div>

        <div style={{ flex: '33.3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaBuilding size={100} />
          </div>
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            Buiding 2
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {light2 == 0 && (
              <BsLightbulbFill size={100} onClick={createTodo2} />
            )}
            {light2 == 1 && <FaRegLightbulb size={100} onClick={createTodo3} />}
          </div>
          <div
            style={{
              margin: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {<IoIosTimer size={100} />}
          </div>
          <div className='App'>
            <Clock
              timerDays={timerDays}
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
            />
          </div>
        </div>
        <div style={{ flex: '33.3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaBuilding size={100} />
          </div>
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            Buiding 3
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {light3 == 0 && (
              <BsLightbulbFill size={100} onClick={createTodo4} />
            )}
            {light3 == 1 && <FaRegLightbulb size={100} onClick={createTodo5} />}
          </div>
          <div
            style={{
              margin: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {<IoIosTimer size={100} />}
          </div>
        </div>
      </div>
      <SpectrumVisualizer
        audio={Z}
        theme={SpectrumVisualizerTheme.radialSquaredBars}
        colors={['#009688', '#26a69a']}
        iconsColor='#26a69a'
        backgroundColor='white'
        showMainActionIcon
        showLoaderIcon
        highFrequency={8000}
      />
    </div>
  );
}

export default HomePage;
