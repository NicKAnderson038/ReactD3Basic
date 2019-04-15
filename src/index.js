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
    width1: 300,
    height1: 300,
    width2: 300,
    height2: 300
  }

  onClick(flag) {
    switch (flag) {
      case 'one':
        this.setState({
          width1: this.state.width1 * 0.8,
          height1: this.state.height1 * 0.8
        })
        return
      case 'two':
        this.setState({
          width2: this.state.width2 * 0.8,
          height2: this.state.height2 * 0.8
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
        <h1>Basic D3 Scatter Plot Graph</h1>
        <br />
        <svg width="400" height="400" onClick={() => this.onClick('one')}>
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.width1}
            height={this.state.height1}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
        <svg width="400" height="400" onClick={() => this.onClick('two')}>
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.width2}
            height={this.state.height2}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
