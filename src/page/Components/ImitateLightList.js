import React, { useEffect } from 'react';
import '../../App.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BsLightbulbFill } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import ImitateLight from './ImitateLight';
import Button from 'react-bootstrap/Button';
import { Grid, GridColumn } from 'semantic-ui-react';

export default function ImitateLightList() {
  const [ImitateList, setImitate] = useState();

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
    const todoRef = firebase.database().ref('LightSystem');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const lightList = [];
      for (let id in todos) {
        lightList.push({ id, ...todos[id] });
      }
      setImitate(lightList);
      console.log(ImitateList);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',

        fontWeight: 'bold',
        marginTop: '100px',
        marginBottom: '100px',
      }}
    >
      {' '}
      <Row xs={1} md={5} className='g-4'>
        {ImitateList
          ? ImitateList.map((todo, index) => (
              <Col style={{ marginBottom: '100px' }}>
                <ImitateLight todo={todo} key={index} />
              </Col>
            ))
          : ''}
      </Row>
    </div>
  );
}
