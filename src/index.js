import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'
import Scatterplot from './Components/Scatterplot'
import Datapoint from './Components/Datapoint'

const data = d3.range(100).map(() => [Math.random(), Math.random()])
// const margin = { top: 0, right: 0, bottom: 0, left: 0 }

const centerX = (0 + 56) / 2 / 100
const centerY = (0 + 61.125) / 2 / 100

console.log('CALC: ', centerX, centerY)
console.log(data)
class App extends Component {
  state = {
    // brush: React.createRef(),
    zoomInWidth: 300,
    zoomInHeight: 300,
    widthBottom: 300,
    heightBottom: 300
  }

  graphResizeHandler = (flag, x = 0, y = 0) => {
    console.log('TEST: ', x, y)
    switch (flag) {
      case 'top-graph':
        this.setState({
          zoomInWidth: this.state.zoomInWidth / centerX,
          zoomInHeight: this.state.zoomInHeight / centerY
          // zoomInWidth: this.state.zoomInWidth / 0.9,
          // zoomInHeight: this.state.zoomInHeight / 0.9
        })
        return
      case 'bottom-graph':
        this.setState({
          widthBottom: x,
          heightBottom: y
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

  render() {
    const w = this.state.zoomInWidth
    const h = this.state.zoomInHeight
    console.log('w & h: ', w, h)

    console.log(Scatterplot)
    return (
      <div className="App">
        <h1>D3 Scatter Plot Graph</h1>
        <br />
        <svg
          width="400"
          height="400"
          onClick={() => this.graphResizeHandler('top-graph')}>
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
            triggerGraphResizeHandler={this.graphResizeHandler}
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
