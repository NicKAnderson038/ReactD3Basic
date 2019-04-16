import React from 'react'
// import React, { Component } from 'react'
import styled from '@emotion/styled'

const Circle = styled.circle`
  fill: steelblue;
  fill-opacity: 0.8;
  stroke: steelblue;
  stroke-width: 1.5px;
`

// class Datapoint extends Component {
//   render() {
//     const { x, y } = this.props
//     return <circle cx={x} cy={y} r="3" />
//   }
// }

// export default Datapoint

const datapoint = props => {
  const { x, y } = props
  return <Circle cx={x} cy={y} r="3" key={x + y} />
}

export default datapoint
