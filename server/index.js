const bodyParser = require('body-parser');
var firebase = require('firebase');
var Map = require('collections/map');
global.opentime = 0;
global.closetime = 0;
global.map = new Map();
global.state = true;

var firebaseConfig = {
  apiKey: 'AIzaSyDUK8PATxElMN_uhOna4jlxZlLRsv8ycNs',
  authDomain: 'task7-1-15a4f.firebaseapp.com',
  databaseURL: 'https://task7-1-15a4f-default-rtdb.firebaseio.com',
  projectId: 'task7-1-15a4f',
  storageBucket: 'task7-1-15a4f.appspot.com',
  messagingSenderId: '617805583727',
  appId: '1:617805583727:web:33808ca82f023211bc049a',
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref('LightSystem');
var plotly = require('plotly')('Vincentkkkk', 'aG6jcn3oO00iucVR5iyP');

var data = {
  x: [],
  y: [],
  type: 'scatter',
};
const mongoose = require('mongoose');
function changeColor(id) {
  database
    .orderByChild('lightNumber')
    .equalTo(id)
    .on('child_added', (snap) => {
      console.log(snap.val());
      console.log(snap.key);
      const id = snap.key;
      const todoRef = firebase.database().ref('LightSystem').child(id);
      console.log('bbb' + id.light);

      todoRef.update({
        smoke: 1,
        light: !global.state,
      });
    });
  global.state = !global.state;
}

/*database
  .orderByChild('lightNumber')
  .equalTo('light3')
  .on('child_added', (snap) => {
    console.log(snap.val());
    console.log(snap.key);
    const id = snap.key;
    const todoRef = firebase.database().ref('LightSystem').child(id);
    todoRef.update({
      light: !snap.val().light,
    });
  });*/
database.on('child_changed', (snap) => {
  var action;
  //console.log(snap.val()); // will return updated user object
  {
    if (snap.val().light == true) {
      action = 'turn on';
      global.opentime = Date.now();
    } else {
      action = ' turn off';
      global.closetime = Date.now();
    }
  }

  const sensordata = {
    id: 0,
    BuildingNumber: snap.val().name,
    RoomNumber: snap.val().roomNumber,
    LightNumber: snap.val().lightNumber,
    action: action,
    time: Date.now(),
  };
  const jsonString = JSON.stringify(sensordata);
  //console.log('111' + jsonString);
  mongoose.connect(
    'mongodb+srv://Vincent:james525@sit314.tu9vxni.mongodb.net/?retryWrites=true&w=majority'
  );
  const Sensordata = require('./models/sensor');

  const newSensor = new Sensordata({
    id: sensordata.id,
    BuildingNumber: sensordata.BuildingNumber,
    RoomNumber: sensordata.RoomNumber,
    LightNumber: sensordata.LightNumber,
    action: sensordata.action,
    time: sensordata.time,
  });
  newSensor
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .then(() => {
      if (action == ' turn off') {
        console.log('dddddddd');
        global.time = global.closetime - global.opentime;
        if (global.map.has(sensordata.LightNumber) == false) {
          global.map.set(sensordata.LightNumber, global.time);
        } else {
          console.log('past time' + global.map.get(sensordata.LightNumber));
          global.time = global.time + global.map.get(sensordata.LightNumber);
          console.log(global.time);
          global.map.add(global.time, sensordata.LightNumber);
          console.log('this time' + global.map.get(sensordata.LightNumber));
        }
        data.x.push(sensordata.LightNumber);
        data.y.push(global.time / 1000);
        var graphOptions = {
          filename: 'iot-performance',
          fileopt: 'overwrite',
        };
        plotly.plot(data, graphOptions, function (err, msg) {
          if (err) return console.log(err);
          global.opentime = 0;
          global.closetime = 0;
          console.log(msg);
        });
      }
    });
});

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mqtt = require('mqtt');
const { Ref } = require('semantic-ui-react');
const { light } = require('@mui/material/styles/createPalette');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

var topic3 = '/LightData/#';

client.on('connect', () => {
  client.subscribe(topic3);

  console.log('mqtt connected');
});
client.on('message', (topic, message) => {
  var data = +message;
  var lD = topic.split('/');

  console.log('Topics is: ' + lD[2]);
  console.log('sensor data type is: ' + lD[3]);

  console.log('Message is: ' + data);
  //passenger mode
  if (lD[3] == 'infrared') {
    console.log('lllllll');
    if (message == 1) {
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            light: true,
          });
          const sensordata = {
            id: 0,
            BuildingNumber: snap.val().name,
            RoomNumber: snap.val().roomNumber,
            LightNumber: snap.val().lightNumber,
            action: '',
            time: Date.now(),
          };
          const jsonString = JSON.stringify(sensordata);
          //console.log('111' + jsonString);
          mongoose.connect(
            'mongodb+srv://Vincent:james525@sit314.tu9vxni.mongodb.net/?retryWrites=true&w=majority'
          );
          const Sensor1 = require('./models/sensor');

          const newSensor = new Sensor1({
            id: sensordata.id,
            BuildingNumber: sensordata.BuildingNumber,
            RoomNumber: sensordata.RoomNumber,
            LightNumber: sensordata.LightNumber,
            action: 'passengers come',
            time: sensordata.time,
          });
          newSensor
            .save()
            .then((doc) => {
              console.log(doc);
            })
            .then(() => {});
        });
    } else {
      console.log('0000000');
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            light: false,
          });
          const sensordata = {
            id: 0,
            BuildingNumber: snap.val().name,
            RoomNumber: snap.val().roomNumber,
            LightNumber: snap.val().lightNumber,
            action: '',
            time: Date.now(),
          };
          const jsonString = JSON.stringify(sensordata);
          //console.log('111' + jsonString);
          mongoose.connect(
            'mongodb+srv://Vincent:james525@sit314.tu9vxni.mongodb.net/?retryWrites=true&w=majority'
          );
          const Sensor1 = require('./models/sensor');

          const newSensor = new Sensor1({
            id: sensordata.id,
            BuildingNumber: sensordata.BuildingNumber,
            RoomNumber: sensordata.RoomNumber,
            LightNumber: sensordata.LightNumber,
            action: 'passengers leave',
            time: sensordata.time,
          });
          newSensor
            .save()
            .then((doc) => {
              console.log(doc);
            })
            .then(() => {});
        });
    }
  }
  //smoke mode
  if (lD[3] == 'smoke') {
    console.log('warning!warning!smoke!');
    if (data == 0) {
      console.log('0000000');
      clearInterval(interval);
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          //console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            smoke: 0,
          });
          console.log('dsadas');
        });
    } else {
      console.log('ppppp' + lD[2]);

      var interval = setInterval(changeColor, 1500, lD[2], global.state);
    }
  }
  //sound mode
  if (lD[3] == 'sound') {
    console.log('there is a sound');
    if ((message = 0)) {
    } else {
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            light: true,
          });
        });
      setTimeout(() => {
        database
          .orderByChild('lightNumber')
          .equalTo(lD[2])
          .on('child_added', (snap) => {
            console.log(snap.val());
            console.log(snap.key);
            const id = snap.key;
            const todoRef = firebase.database().ref('LightSystem').child(id);
            todoRef.update({
              light: false,
            });
          });
      }, 5000);
    }
  }
  //brightness mode
  if (lD[3] == 'brightness') {
    if (message == 1) {
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            brightness: 3,
          });
        });
    } else if (message == 2) {
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            brightness: 2,
          });
        });
    } else if (message == 3) {
      console.log('strong brigtness, automatically change!');
      database
        .orderByChild('lightNumber')
        .equalTo(lD[2])
        .on('child_added', (snap) => {
          console.log(snap.val());
          console.log(snap.key);
          const id = snap.key;
          const todoRef = firebase.database().ref('LightSystem').child(id);
          todoRef.update({
            brightness: 1,
          });
        });
    }
  }
});

app.listen(3001, () => {
  console.log('running port 3001');
});
