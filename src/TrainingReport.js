import React, { Component } from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import { ResultsContainer } from './ResultsContainer.js'
import { Flex, Box, Divider, Panel, Samp, Subhead } from 'rebass'

export function TrainingReport(props) {
  const training = props.trainingReport
  const brain = training.brain
  return (
    <Panel>
      <Panel.Header fontSize="2">
        Training Completed At {training.completionTime.toTimeString()}
      </Panel.Header>
      <Box>
        <Subhead fontSize="3" color="blue">
          Test Accuracy
        </Subhead>
        <Subhead fontSize="5">{training.test.accuracy * 100}%</Subhead>
        <Subhead fontSize="3" pt={10} color="blue">
          Validations
        </Subhead>
        {training.validations.map((validation, index) => (
          <Flex key={index}>
            <Box width={1 / 2}>{validation.loss}</Box>
            <Box width={1 / 2}> {validation.accuracy * 100}%</Box>
          </Flex>
        ))}
      </Box>
      <Panel.Footer>
        <Samp>{brain.input_nodes}</Samp> inputs,{' '}
        <Samp>{brain.hidden_nodes}</Samp> hidden nodes,{' '}
        <Samp>{brain.output_nodes}</Samp> output nodes
      </Panel.Footer>
    </Panel>
  )
}
export function TrainingReportList() {
  return (
    <Subscribe to={[ResultsContainer]}>
      {resultsContainer => (
        <Box>
          {resultsContainer.state.results.map((result, index) => (
            <Box py={10} width={1 / 2} mx="auto">
              <TrainingReport key={index} trainingReport={result} />
            </Box>
          ))}
        </Box>
      )}
    </Subscribe>
  )
}

export class Training {
  constructor(brain) {
    this.brain = brain
    this.validations = []
    this.test = {}
  }

  addValidation(loss, accuracy) {
    this.validations.push({ loss: loss, accuracy: accuracy })
  }

  addTest(loss, accuracy) {
    this.completionTime = new Date()
    this.test = { loss: loss, accuracy: accuracy }
  }
}
