import React, { Component } from "react";
import * as firebase from 'firebase/app';
import 'firebase/database';

export default class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      status: "open"
    };

    this.statuses = {
      "in-use": "#e74c3c",
      "reserved": "#bdc3c7",
      "open": "#2ecc71"
    };
  }
  componentDidMount = () => {
    firebase.database().ref(`/seats/${this.state.id}/status`).on('value', (snapshot) => {
      this.setState({ status: snapshot.val() });
    });
  }
  render() {
    const { id, status } = this.state;
    const color = this.statuses[status];
    return (
      <div style={{...styles.seat, ...{ backgroundColor: color ? color : "" }}}>
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
    userSelect: "none"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  }
}