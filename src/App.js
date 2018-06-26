import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MushroomLearner from './MushroomLearner.js'

class TrainButton extends Component {
  constructor(props) {
    super(props)
    this.ml = new MushroomLearner()
  }

  runTraining = () => {
    this.ml.train()
  }

  render() {
    return <button onClick={this.runTraining}>Train</button>
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <TrainButton />
      </div>
    )
  }
}

export default App
