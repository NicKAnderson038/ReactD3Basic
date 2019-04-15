import React, { PureComponent } from 'react'
import * as d3 from 'd3'

import Axis from './Axis'

class Scatterplot extends PureComponent {
  state = {
    xScale: d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.width]),
    yScale: d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.height])
  }

  static getDerivedStateFromProps(props, state) {
    const { xScale, yScale } = state

    xScale.range([0, props.width])
    yScale.range([0, props.height])

    return {
      ...state,
      xScale,
      yScale
    }
  }

  dataPlotHandler(datapoint, xScale, yScale) {
    return datapoint({
      x: xScale,
      y: yScale
    })
  }

  render() {
    const { x, y, data, height, datapoint } = this.props

    const { xScale, yScale } = this.state

    return (
      <g transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) =>
          this.dataPlotHandler(datapoint, xScale(x), yScale(y))
        )}
        <Axis x={0} y={0} scale={yScale} type="Left" />
        <Axis x={0} y={height} scale={xScale} type="Bottom" />
      </g>
    )
  }
}
export default Scatterplot
