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
    widthTop: 300,
    heightTop: 300,
    widthBottom: 300,
    heightBottom: 300
  }

  graphResizeHandler(flag) {
    switch (flag) {
      case 'top':
        this.setState({
          widthTop: this.state.widthTop * 0.8,
          heightTop: this.state.heightTop * 0.8
        })
        return
      case 'bottom':
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
          onClick={() => this.graphResizeHandler('top')}>
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.widthTop}
            height={this.state.heightTop}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
        <svg
          width="400"
          height="400"
          onClick={() => this.graphResizeHandler('bottom')}>
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
