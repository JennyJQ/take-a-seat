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
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Study Spaces</h1>
          </div>
        </div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h2 className="display-4">Fluid Jumbotron</h2>
              <div style={styles.grid}>
                {Array(12).fill(true).map((foo, i) => <Seat key={i} id={i + 1} />)}
              </div>
            </div>
          </div>
          {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Take a break!</strong> You have been studying for way too long. 
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> */}
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#e9ecef"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  }
}

export default App;
