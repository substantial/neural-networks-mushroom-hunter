import MushroomLearner from './MushroomLearner.js'
import React, { Component } from 'react'
import { Button } from 'rebass'

export class TrainButton extends Component {
  constructor(props) {
    super(props)
    this.resultsContainer = props.resultsContainer
    this.settingsContainer = props.settingsContainer
    this.ml = new MushroomLearner()
    this.state = { isTraining: false }
  }

  runTraining = async () => {
    this.setState({ isTraining: true })
    const settings = this.settingsContainer.settings()
    let results = await this.ml.train(settings)

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
