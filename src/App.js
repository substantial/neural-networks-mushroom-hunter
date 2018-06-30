import React, { Component } from 'react'
import './App.css'
import { Provider, Subscribe, Container } from 'unstated'

import { TrainingReport, TrainingReportList } from './TrainingReport.js'
import { ResultsContainer } from './ResultsContainer.js'
import { TrainButton } from './TrainButton.js'

import { Provider as Rebass, Heading, Lead, Divider, Flex, Box } from 'rebass'
import { SettingsForm, SettingsContainer } from './Settings.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Rebass>
          <Heading>Mushroom Learning 🍄</Heading>
          <Lead>Safe to eat, or deadly poison?</Lead>
          <Divider />
          <Provider>
            <Flex>
              <Box width={1 / 2}>
                <Subscribe to={[ResultsContainer, SettingsContainer]}>
                  {(resultsContainer, settingsContainer) => (
                    <TrainButton
                      resultsContainer={resultsContainer}
                      settingsContainer={settingsContainer}
                      onLearned={this.updateResults}
                    />
                  )}
                </Subscribe>
                <Box>
                  <Subscribe to={[SettingsContainer]}>
                    {settingsContainer => (
                      <SettingsForm settingsContainer={settingsContainer} />
                    )}
                  </Subscribe>
                </Box>
              </Box>
              <Box width={1 / 2}>
                <TrainingReportList />
              </Box>
            </Flex>
          </Provider>
        </Rebass>
      </div>
    )
  }
}

export default App
