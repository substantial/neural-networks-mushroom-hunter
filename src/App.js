import React, { Component } from 'react'
import './App.css'
import { Provider, Subscribe, Container } from 'unstated'

import { TrainingReport, TrainingReportList } from './TrainingReport.js'
import { ResultsContainer } from './ResultsContainer.js'
import { TrainButton } from './TrainButton.js'

import { Provider as Rebass, Heading, Lead, Divider } from 'rebass'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Rebass>
          <Heading>Mushroom Learning</Heading>
          <Lead>Safe to eat, or deadly poison?</Lead>
          <Divider />
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
        </Rebass>
      </div>
    )
  }
}

export default App
