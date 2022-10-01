import React, { useEffect } from 'react';
import { useMemo } from 'react';
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

export default function Light({ todo }) {
  const [dates, setdates] = useState('');

  const [date, setdate] = useState('');
  const [flag, setFlag] = useState();
  const [flags, setFlags] = useState(true);
  const [state, setState] = useState(true);

  const [hour, sethour] = useState('');
  const [minute, setminute] = useState('');
  const [second, setsecond] = useState('');

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  let interval;

  const deleteTodo = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);
    todoRef.remove();
  };

  const switches = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);
    todoRef.update({
      light: !todo.light,
    });
    console.log('light' + todo.light);
  };

  const setTimer = () => {
    setState(false);
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);
    todoRef.update({
      date: dates,
    });
  };
  const ss = todo.date;
  const dd = () => {
    setdate(todo.date);

    setFlag(todo.light);
  };
  const startTimer = () => {
    //console.log(date);
    const countDownDate = new Date(date).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

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

    setdate(todo.date);

    setFlag(todo.light);
    console.log(todo.light);
  }, [startTimer(), todo.light]);

  return (
    <div style={{ marginLeft: '100px', flex: '33.3%' }}>
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
        {flag == true && <BsLightbulbFill size={100} onClick={switches} />}
        {flag == false && <FaRegLightbulb size={100} onClick={switches} />}
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
          disabled={!state}
          value={dates}
          onChange={(e) => state == true && setdates(e.target.value)}
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
        <input value={hour} onChange={(e) => sethour(e.target.value)}></input>
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
  );
}
