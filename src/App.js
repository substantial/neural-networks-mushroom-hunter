import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MushroomLearner from './MushroomLearner.js'
import { Provider, Subscribe, Container } from 'unstated'

class ResultsContainer extends Container {
  state = { results: [] }

  addResults = results => {
    this.setState({ results: this.state.results.concat([results]) })
  }
}

function TrainingReport(props) {
  const results = props.trainingReport
  const resultItems = results.map(result => {
    return { name: result[0], loss: result[1], accuracy: result[2] * 100 }
  })
  return (
    <div>
      <h3>Result!</h3>
      <ul>
        {resultItems.map((result, index) => (
          <li key={index}>
            {result.name}, {result.accuracy}%
          </li>
        ))}
      </ul>
    </div>
  )
}
function TrainingReportList() {
  return (
    <Subscribe to={[ResultsContainer]}>
      {resultsContainer => (
        <div>
          {resultsContainer.state.results.map((result, index) => (
            <TrainingReport key={index} trainingReport={result} />
          ))}
        </div>
      )}
    </Subscribe>
  )
}

class TrainButton extends Component {
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
    return <button onClick={this.runTraining}>Train</button>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider>
          <Subscribe to={[ResultsContainer]}>
            {resultsContainer => (
              <TrainButton
                resultsContainer={resultsContainer}
                onLearned={this.updateResults}
              />
            )}
          </Subscribe>
          <TrainingReportList />
        </Provider>
      </div>
    )
  }
}

export default App
