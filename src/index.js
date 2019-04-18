import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'
import Scatterplot from './Components/Scatterplot'
import Datapoint from './Components/Datapoint'

const data = d3.range(100).map(() => [Math.random(), Math.random()])
// const margin = { top: 0, right: 0, bottom: 0, left: 0 }

const rectCenterX = (0 + 56) / 2 / 100
const rectCenterY = (0 + 61.125) / 2 / 100

console.log('CALC: ', rectCenterX, rectCenterY)
console.log(data)
class App extends Component {
  state = {
    zoomInWidth: 300,
    zoomInHeight: 300,
    widthBottom: 300,
    heightBottom: 300,
    x: 50,
    y: 50
  }

  graphResizeHandler = (flag, centerX, centerY) => {
    console.log('TEST:')
    switch (flag) {
      case 'top-graph':
        this.setState({
          zoomInWidth: this.state.zoomInWidth / rectCenterX,
          zoomInHeight: this.state.zoomInHeight / rectCenterY
        })
        return
      case 'bottom-graph':
        this.setState({
          widthBottom: centerX,
          heightBottom: centerY
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
    const w = this.state.widthBottom
    const h = this.state.heightBottom
    console.log('w & h: ', w, h)
    if (w !== 300) {
      // debugger
    }
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
        <svg width="400" height="400" transform>
          <Scatterplot
            triggerGraphResizeHandler={this.graphResizeHandler}
            x={this.state.x}
            y={this.state.y}
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
