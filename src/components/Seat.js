import React, { Component } from "react";

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
  turnGreen = () => {
    this.setState({ status: "open" });
  }
  turnGray = () => {
    this.setState({ status: "reserved" });
  }
  turnRed = () => {
    this.setState({ status: "in-use" });
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
    cursor: "pointer",
    userSelect: "none"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  }
}