import React, { PureComponent } from 'react'
import * as d3 from 'd3'

import Axis from './Axis'

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
    console.log('BRUSH mount')
    this.brush = d3
      .brush()
      .extent([
        [margin.left, margin.top],
        [this.props.width, this.props.height]
      ])
      .on('end', this.brushEnd)
    d3.select(this.refs.brush).call(this.brush)
  }

  componentDidUpdate() {
    console.log('BRUSH update')
    this.brush = d3
      .brush()
      .extent([
        [margin.left, margin.top],
        [this.props.width, this.props.height]
      ])
      .on('end', this.brushEnd)
    d3.select(this.refs.brush).call(this.brush)
  }

  brushEnd = (x = this.state.xScale, y = this.state.yScale) => {
    console.log('Brush End')
    const circles = d3.selectAll('circle')
    console.log(
      circles
      // .data(this.state.data)
      // .attr('cx', function(d) {
      //   console.log(d)
      //   return x(d[0])
      // })
      // .attr('cy', function(d) {
      //   return y(d[0])
      // })
    )
    if (!d3.event.selection) {
      // this.setState({
      //   xScale: null, // this.state.width * 0.8,
      //   yScale: null // this.state.height * 0.8
      // })
      // this.props.updateRange([])
      return
    }
    const [x1, x2] = d3.event.selection
    console.log(x1, x2, this.state.xScale)
    const range = [this.state.xScale.invert(x1), this.state.xScale.invert(x2)]
    console.log('range: ', range)
    this.props.updateRange(range)
  }

  render() {
    const { x, y, data, height, datapoint } = this.props

    const { xScale, yScale } = this.state

    return (
      <g transform={`translate(${x}, ${y})`} ref="brush">
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
