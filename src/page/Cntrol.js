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
import { IoIosSwitch } from 'react-icons/io';
import { ImCancelCircle } from 'react-icons/im';
import { BsDoorClosed } from 'react-icons/bs';
import { grey } from '@mui/material/colors';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Control({ todo }) {
  const primary = grey[50];
  const [dates, setdates] = useState('');

  const [date, setdate] = useState('0');
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
  global.statuss = false;
  const [value, setValue] = useState([1, 3]);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  global.count = 0;
  const handleChange = (val) => setValue(val);

  const switches = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);
    todoRef.update({
      light: !todo.light,
    });

    global.count = global.count + 1;
    console.log('dsdsdsds' + global.count);
    console.log('light' + todo.light);
  };

  const ss1 = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);

    todoRef.update({
      brightness: 1,
    });
    //console.log('light' + todo.light);
  };
  const ss2 = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);

    todoRef.update({
      brightness: 2,
    });
    //console.log('light' + todo.light);
  };
  const ss3 = () => {
    const todoRef = firebase.database().ref('LightSystem').child(todo.id);

    todoRef.update({
      brightness: 3,
    });
    //console.log('light' + todo.light);
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
        const todoRef = firebase.database().ref('LightSystem').child(todo.id);
        todoRef.update({
          light: false,
        });
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };
  const startTimer2 = () => {
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

      if (distance == 0) {
        // Stop Timer

        clearInterval(interval.current);
        const todoRef = firebase.database().ref('LightSystem').child(todo.id);
        todoRef.update({
          light: false,
        });
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
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
          marginBottom: '40px',
        }}
      >
        <div style={{ marginRight: '70px' }}>
          <FaBuilding size={50} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {todo.name}
          </div>
        </div>
        <div style={{ marginRight: '70px' }}>
          <BsDoorClosed size={50} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {todo.roomNumber}
          </div>
        </div>

        <div style={{ marginRight: '70px' }}>
          {flag == true && <BsLightbulbFill size={50} />}
          {flag == false && <FaRegLightbulb size={50} />}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {todo.lightNumber}
          </div>
        </div>
        <div style={{ marginRight: '70px' }}>
          <IoIosSwitch size={50} onClick={switches} />
          <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        </div>
        <div style={{ marginRight: '70px' }}>
          <IoIosTimer onClick={setTimer} size={50} />
          <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        </div>
        <div style={{ marginRight: '70px' }}>
          <div>
            set date
            <div>
              <input
                style={{ width: '100px' }}
                disabled={!state}
                value={dates}
                onChange={(e) => state == true && setdates(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            set hour
            <div>
              <input
                style={{ width: '100px' }}
                disabled={!state}
                value={hour}
                onChange={(e) => state == true && sethour(e.target.value)}
              ></input>
            </div>
          </div>

          <div>
            set minute
            <div>
              <input
                style={{ width: '100px' }}
                disabled={!state}
                value={minute}
                onChange={(e) => state == true && setminute(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '50px' }}>
          <Clock
            timerDays={timerDays}
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
          />
        </div>
        <div style={{ marginLeft: '70px', marginBottom: '20px' }}>
          <ButtonGroup vertical aria-label='Basic example'>
            <Button variant='secondary' onClick={ss1}>
              brightness1
            </Button>
            <Button variant='secondary' onClick={ss2}>
              brightness2
            </Button>
            <Button variant='secondary' onClick={ss3}>
              brightness3
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginLeft: '50px' }}>
          <ImCancelCircle size={50} />
        </div>
      </div>
    </div>
  );
}
