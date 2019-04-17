import React, { PureComponent } from 'react'
import * as d3 from 'd3'

import Axis from './Axis'

const width = 650
const height = 400
const margin = { top: 0, right: 0, bottom: 0, left: 0 }

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

  componentDidMount() {
    this.brush = d3
      .brush()
      .extent([
        [margin.left, margin.top],
        [this.props.width - margin.right, this.props.height - margin.bottom]
      ])
      .on('end', this.brushEnd)
    d3.select(this.refs.brush).call(this.brush)
  }

  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale)
    d3.select(this.refs.xAxis).call(this.xAxis)
    this.yAxis.scale(this.state.yScale)
    d3.select(this.refs.yAxis).call(this.yAxis)
  }

  render() {
    const { x, y, data, height, datapoint } = this.props

    const { xScale, yScale } = this.state

    return (
      <g transform={`translate(${x}, ${y})`} className="bush" ref="brush">
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
