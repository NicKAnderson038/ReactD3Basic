import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

import './styles.css'
import Scatterplot from './Components/Scatterplot'

const data = d3
  .range(100)
  .map(() => [
    Math.random(),
    Math.random()
  ])

console.log(data)
class App extends Component {
  state = {
    width: 300,
    height: 300
  }

  onClick() {
    this.setState({
      width: this.state.width * 0.8,
      height: this.state.height * 0.8
    })
  }

  render() {
    return (
      <div className="App">
        <h1>
          Basic D3 Scatter Plot Graph
        </h1>
        <br />
        <svg
          width="800"
          height="800"
          onClick={() =>
            this.onClick()
          }>
          <Scatterplot
            x={50}
            y={50}
            data={data}
            width={this.state.width}
            height={this.state.height}
          />
        </svg>
      </div>
    )
  }
}

const rootElement = document.getElementById(
  'root'
)
ReactDOM.render(<App />, rootElement)
