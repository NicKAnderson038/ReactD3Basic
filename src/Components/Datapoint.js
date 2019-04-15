import React, { Component } from 'react'

class Datapoint extends Component {
  render() {
    const { x, y } = this.props
    return <circle cx={x} cy={y} r="3" />
  }
}

export default Datapoint
