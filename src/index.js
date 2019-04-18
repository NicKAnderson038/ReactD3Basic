import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'
import Scatterplot from './Components/Scatterplot'
import Datapoint from './Components/Datapoint'

const data = d3.range(100).map(() => [Math.random(), Math.random()])
// const margin = { top: 0, right: 0, bottom: 0, left: 0 }

console.log(data)
class App extends Component {
  state = {
    // brush: React.createRef(),
    zoomInWidth: 300,
    zoomInHeight: 300,
    widthBottom: 300,
    heightBottom: 300
  }

  graphResizeHandler(flag) {
    switch (flag) {
      case 'zoomIn':
        this.setState({
          zoomInWidth: this.state.zoomInWidth / 0.9,
          zoomInHeight: this.state.zoomInHeight / 0.9
        })
        return
      case 'place-holder':
        this.setState({
          widthBottom: this.state.widthBottom * 0.8,
          heightBottom: this.state.heightBottom * 0.8
        })
        return
      default:
        return null
    }
    // this.setState({
    //   width: this.state.width * 0.8,
    //   height: this.state.height * 0.8
    // })
  }

  // componentDidMount() {
  //   this.brush = d3
  //     .brush()
  //     .extent([
  //       [margin.left, margin.top],
  //       [this.props.width - margin.right, this.props.height - margin.bottom]
  //     ])
  //     .on('end', this.brushEnd)
  //   d3.select(this.refs.brush).call(this.brush)
  // }

  // brushEnd = () => {
  //   console.log(this.refs.xAxis, d3.event.selection)
  //   if (!d3.event.selection) {
  //     // this.setState({
  //     //   xScale: null, // this.state.width * 0.8,
  //     //   yScale: null // this.state.height * 0.8
  //     // })
  //     // this.props.updateRange([])
  //     return
  //   }
  //   const [x1, x2] = d3.event.selection
  //   const range = [this.state.xScale.invert(x1), this.state.xScale.invert(x2)]

  //   this.props.updateRange(range)
  // }

  render() {
    return (
      <div className="App">
        <h1>D3 Scatter Plot Graph</h1>
        <br />
        <svg
          width="400"
          height="400"
          onClick={() => this.graphResizeHandler('zoomIn')}>
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.zoomInWidth}
            height={this.state.zoomInHeight}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
        <svg width="400" height="400">
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.widthBottom}
            height={this.state.heightBottom}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
