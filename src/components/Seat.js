import React, { Component } from "react";
import * as firebase from 'firebase/app';
import 'firebase/database';

export default class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      status: "open",
      timeoutId: null,
      timeoutId2: null,
    };

    this.statuses = {
      "inuse": "#e74c3c",
      "reserved": "#bdc3c7",
      "open": "#2ecc71"
    };
  }
  componentDidMount = () => {
    firebase.database().ref(`/seats/${this.state.id}/status`).on('value', (snapshot) => {
      const val = snapshot.val();
      if (this.state.status === "reserved" && val === "inuse") {
        if (this.state.timeoutId) {
          clearTimeout(this.state.timeoutId);
        }
      }
      if (this.state.status === "inuse" && val === "open") {
        if (this.state.timeoutId2) {
          clearTimeout(this.state.timeoutId2);
        }
        const timeoutId2 = setTimeout(() => {
          this.setState({ status: "open" });
          firebase.database().ref(`/seats/${this.state.id}/status`).set("open");
        }, 5000);
        this.setState({ status: "reserved", timeoutId2: timeoutId2 });
        firebase.database().ref(`/seats/${this.state.id}/status`).set("reserved");
        return;
      }
      this.setState({ status: val });
    });
    firebase.database().ref(`/seats/${this.state.id}/status`).set("open");
  }
  reserveSeat = () => {
    if (this.state.status === "open") {
      const timeoutId = setTimeout(() => {
        this.setState({ status: "open" });
        firebase.database().ref(`/seats/${this.state.id}/status`).set("open");  
      }, 5000);
      this.setState({ status: "reserved", timeoutId: timeoutId });
      firebase.database().ref(`/seats/${this.state.id}/status`).set("reserved");
    }
  }
  render() {
    const { id, status } = this.state;
    const color = this.statuses[status];
    return (
      <div style={{...styles.seat, ...{ backgroundColor: color ? color : "", cursor: status === "open" ? "pointer" : "initial" }}} onClick={this.reserveSeat}>
        <p style={styles.text}>{id}</p>
      </div>
    );
  }
}

const styles = {
  seat: {
    width: 67.5,
    height: 50,
    borderRadius: "0 0 17.5px 17.5px",
    margin: 20,
    border: 2,
    borderStyle: "solid",
    borderColor: "black",
    justifySelf: "center",
    userSelect: "none",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  }
}