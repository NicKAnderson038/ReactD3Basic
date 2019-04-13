import React, { Component } from "react";
import * as d3 from "d3";

class Scatterplot extends Component {
  dataPlotHandler = data => {
    return data.map(([x, y]) => (
      <circle cx={x} cy={y} r="3" key={`${x + y}`} />
    ));
  };

  render() {
    const { x, y, data } = this.props;
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* {data.map(([x, y]) => (
          <circle cx={x} cy={y} r="3" />
        ))} */}
        {this.dataPlotHandler(data)}
      </g>
    );
  }
}
export default Scatterplot;
