import MushroomLearner from './MushroomLearner.js'
import React, { Component } from 'react'
import { Button } from 'rebass'

export class TrainButton extends Component {
  constructor(props) {
    super(props)
    this.resultsContainer = props.resultsContainer
    this.ml = new MushroomLearner(this.onLearned)
    this.state = { isTraining: false }
  }

  runTraining = async () => {
    this.setState({ isTraining: true })
    let results = await this.ml.train()

    this.resultsContainer.addResults(results)
    this.setState({ isTraining: false })
  }

  render() {
    return (
      <Button
        bg="red"
        disabled={this.state.isTraining}
        onClick={this.runTraining}
      >
        Train
      </Button>
    )
  }
}
