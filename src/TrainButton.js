import MushroomLearner from './MushroomLearner.js'
import React, { Component } from 'react'
import { Button } from 'rebass'

export class TrainButton extends Component {
  constructor(props) {
    super(props)
    this.resultsContainer = props.resultsContainer
    this.ml = new MushroomLearner(this.onLearned)
  }

  runTraining = async () => {
    let results = await this.ml.train()
    this.resultsContainer.addResults(results)
  }

  render() {
    return (
      <Button bg="orange" onClick={this.runTraining}>
        Train
      </Button>
    )
  }
}
