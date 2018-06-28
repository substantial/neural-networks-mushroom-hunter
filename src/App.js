import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Provider, Subscribe, Container } from 'unstated'
import { Provider as RebassProvider, Heading } from 'rebass'
import { TrainingReport, TrainingReportList } from './TrainingReport.js'
import { ResultsContainer } from './ResultsContainer.js'
import { TrainButton } from './TrainButton.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RebassProvider>
          <Heading>Mushroom Learning</Heading>
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
        </RebassProvider>
      </div>
    )
  }
}

export default App
