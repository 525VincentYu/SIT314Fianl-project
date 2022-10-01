import React, { useEffect, Fragment } from 'react';
import '../../App.css';
import Accordion from 'react-bootstrap/Accordion';
import Clock from './Clock';
import { BsLightbulbFill } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import Axios from 'axios';
import LightList from '../LightList';
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from 'react-audio-visualizers';
import Z from '../1.mp3';

export default function ImitateLight({ todo }) {
  const [dates, setdates] = useState('');
  const [smoke, setSmoke] = useState(0);
  const [date, setdate] = useState('');
  const [flag, setFlag] = useState();
  const [brightness, setBrightness] = useState();
  const [flags, setFlags] = useState(true);
  const [state, setState] = useState(true);
  const [music, setMusic] = useState();

  const [hour, sethour] = useState('');
  const [minute, setminute] = useState('');
  const [second, setsecond] = useState('');

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [mesg, setMesg] = useState('nothing');
  let interval;

  // preciouschicken.com is the MQTT topic

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
    Axios.get('http://localhost:3001/api/get').then((response) => {
      console.log(response);
    });

    setFlag(todo.light);
    setMusic(todo.music);
    setSmoke(todo.smoke);
    setBrightness(todo.brightness);

    console.log(todo.light);
  });

  return (
    <div>
      <div>
        <div style={{ position: 'abusolute' }}>
          {music == 0 && (
            <SpectrumVisualizer
              audio={Z}
              theme={SpectrumVisualizerTheme.radialSquaredBars}
              colors={['#ffff00', '#ffff00']}
              iconsColor='#ffff00'
              mirror={true}
              barWidth={1}
              numBars={200}
              //numBars={50}
              highFrequency={20000}
              lowFrequency={1}
            />
          )}
        </div>
        <div style={{ marginLeft: '110px', marginTop: '-100px' }}>
          {flag == true && smoke == 0 && brightness == 3 && (
            <BsLightbulbFill color='yellow' size={50} onClick={switches} />
          )}
          {flag == true && smoke == 0 && brightness == 2 && (
            <BsLightbulbFill
              color='rgb(200, 200, 30)'
              size={50}
              onClick={switches}
            />
          )}
          {flag == true && smoke == 0 && brightness == 1 && (
            <BsLightbulbFill
              color='rgb(150, 150, 30)'
              size={50}
              onClick={switches}
            />
          )}
          {flag == true && smoke == 1 && (
            <BsLightbulbFill color='red' size={50} onClick={switches} />
          )}
          {flag == false && smoke == 0 && (
            <FaRegLightbulb size={50} onClick={switches} />
          )}
          {flag == false && smoke == 1 && (
            <FaRegLightbulb color='red' size={50} onClick={switches} />
          )}
        </div>
      </div>
      <div style={{ marginLeft: '30px' }}>{todo.name}</div>
      <div style={{ marginLeft: '30px' }}>{todo.roomNumber}</div>
      <div style={{ marginLeft: '30px' }}>{todo.lightNumber}</div>
    </div>
  );
}
