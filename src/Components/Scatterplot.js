import React, { Component } from 'react'
import * as d3 from 'd3'

import Axis from './Axis'

class Scatterplot extends Component {
  xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, this.props.width])
  yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, this.props.height])

  dataPlotHandler = data => {
    return data.map(([x, y]) => (
      <React.Fragment>
        <circle
          cx={this.xScale(x)}
          cy={this.yScale(y)}
          r="3"
          key={`${x + y}`}
        />
      </React.Fragment>
    ))
  }

  render() {
    const {
      x,
      y,
      data,
      height
    } = this.props

    return (
      <g
        transform={`translate(${x}, ${y})`}>
        {this.dataPlotHandler(data)}
        <Axis
          x={0}
          y={0}
          scale={this.yScale}
          type="Left"
        />
        <Axis
          x={0}
          y={height}
          scale={this.xScale}
          type="Bottom"
        />
      </g>
    )
  }
}
export default Scatterplot
