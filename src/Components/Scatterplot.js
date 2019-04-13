import React, { Component } from "react";
import * as d3 from "d3";

class Scatterplot extends Component {
  render() {
    const { x, y } = this.props;
    return <g transform={`translate(${x}, ${y})`} />;
  }
}
export default Scatterplot;
