import React, { PureComponent } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

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
    console.log('BRUSH update', this.refs.brush)
    // d3.brush()
    //   // .extent([
    //   //   [margin.left, margin.top],
    //   //   [this.props.width, this.props.height]
    //   // ])
    //   .on('end', e => console.log('end brush: ', e))
    // this.setState({
    //   xScale: d3.transition().duration(750),
    //   yScale: d3.transition().duration(750)
    // })

    const x = d3.event.type
    console.log(x)
  }

  // brushEnd = (x = this.state.xScale) => {
  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, 1])
  //     .range([0, this.props.height])
  //   console.log('++++++++++++++++++++++++++++++++++++++++')
  //   console.log('xScale: ', x, this.props.width)
  //   console.log('yScale: ', y, this.props.height)
  //   console.log('Brush End')
  //   const circles = d3.selectAll('circle')
  //   console.log(
  //     'circles: ',
  //     circles._groups[0]
  //     // .data(this.state.data)
  //     // .attr('cx', function(d) {
  //     //   console.log(d)
  //     //   return x(d[0])
  //     // })
  //     // .attr('cy', function(d) {
  //     //   return y(d[0])
  //     // })
  //   )
  //   if (!d3.event.selection) {
  //     // this.setState({
  //     //   xScale: null, // this.state.width * 0.8,
  //     //   yScale: null // this.state.height * 0.8
  //     // })
  //     // this.props.updateRange([])
  //     return
  //   }
  //   const [x1, x2] = d3.event.selection
  //   console.log('section results: ', x1, x2)

  //   // individual circles
  //   const t = d3.transition().duration(750)
  //   const result = []
  //   circles.transition(t)._groups[0].forEach(d => {
  //     const z = _.values(d)
  //     let cx = x(z[1].cx)
  //     let cy = y(z[1].cy)
  //     // console.log('cx: ', cx, ' & cy: ', cy)
  //     return result.push([cx, cy])
  //   })
  //   console.log('Result: ', result)
  //   return result
  // }

  brushEnd = () => {
    const [x1, x2] = d3.event.selection
    const centerX = (this.props.width + (x1[0] + x2[0]) / 2) * 3
    const centerY = (this.props.height + (x1[1] + x2[1]) / 2) * 3
    const x = (x1[0] + x2[0]) / 2
    const y = (x1[1] + x2[1]) / 2
    console.log(centerX, centerY)
    console.log(x, y)
    this.props.triggerGraphResizeHandler('bottom-graph', centerX, centerY)
    // this.props.triggerGraphResizeHandler('bottom-graph', centerX, centerY)
  }

  render() {
    const { x, y, data, height, datapoint } = this.props

    const { xScale, yScale } = this.state

    const transitionHandler = () => {
      console.log(d3.event)
    }
    transitionHandler()
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
