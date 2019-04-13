import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import "./styles.css";

const data = d3.range(100).map(() => [Math.random(), Math.random()]);

console.log(data);
function App() {
  return (
    <div className="App">
      <h1>Basic D3 Scatter Plot Graph</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
