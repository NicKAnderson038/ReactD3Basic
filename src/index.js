import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'
import Scatterplot from './Components/Scatterplot'
import Datapoint from './Components/Datapoint'

const data = d3.range(100).map(() => [Math.random(), Math.random()])

console.log(data)
class App extends Component {
  state = {
    zoomInWidth: 300,
    zoomInHeight: 300,
    widthBottom: 300,
    heightBottom: 300
  }

  graphResizeHandler(flag) {
    switch (flag) {
      case 'zoomIn':
        this.setState({
          zoomInWidth: this.state.zoomInWidth * 0.8,
          zoomInHeight: this.state.zoomInHeight * 0.8
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
