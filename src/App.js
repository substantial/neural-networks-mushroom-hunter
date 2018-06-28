import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MushroomLearner from './MushroomLearner.js'

class TrainButton extends Component {
  constructor(props) {
    super(props)
    this.onLearned = props.onLearned
    this.ml = new MushroomLearner(this.onLearned)
  }

  runTraining = async () => {
    let results = await this.ml.train()
    this.onLearned(results)
  }

  render() {
    return <button onClick={this.runTraining}>Train</button>
  }
}

class App extends Component {
  updateResults = results => {
    console.log('update results', results)
  }
  render() {
    return (
      <div className="App">
        <TrainButton onLearned={this.updateResults} />
      </div>
    )
  }
}

export default App
