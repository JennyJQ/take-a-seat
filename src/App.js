import React, { Component } from 'react';
import Seat from './components/Seat';
import './App.css';

import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyBnA78TMXx32zuPVxvp0p7Y13vPvG7wrcY",
  authDomain: "library-sensor.firebaseapp.com",
  databaseURL: "https://library-sensor.firebaseio.com",
  projectId: "library-sensor",
  storageBucket: "library-sensor.appspot.com",
  messagingSenderId: "336692978466"
});

class App extends Component {
  render() {
    return (
      <div style={styles.root}>
        <div style={styles.grid}>
          {Array(12).fill(true).map((foo, i) => <Seat key={i} id={i + 1} />)}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
  },
  grid: {
    display: "inline-grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "30%"
  }
}

export default App;
