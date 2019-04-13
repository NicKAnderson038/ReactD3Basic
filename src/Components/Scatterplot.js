import React, { Component } from "react";
import * as d3 from "d3";

class Scatterplot extends Component {
  xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 300]);
  yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 200]);

  dataPlotHandler = data => {
    return data.map(([x, y]) => (
      <circle cx={x} cy={y} r="3" key={`${x + y}`} />
    ));
  };

  render() {
    const { x, y, data } = this.props;
    const xScale = this.xScale(x);
    const yScale = this.yScale(y);
    return (
      <g transform={`translate(${xScale}, ${yScale})`}>
        {this.dataPlotHandler(data)}
      </g>
    );
  }
}
export default Scatterplot;
