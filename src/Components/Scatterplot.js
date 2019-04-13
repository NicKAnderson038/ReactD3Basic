import React, { Component } from 'react'
import * as d3 from 'd3'

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
      <circle
        cx={this.xScale(x)}
        cy={this.yScale(y)}
        r="3"
        key={`${x + y}`}
      />
    ))
  }

  render() {
    const { x, y, data } = this.props

    return (
      <g
        transform={`translate(${x}, ${y})`}
      >
        {this.dataPlotHandler(data)}
      </g>
    )
  }
}
export default Scatterplot
