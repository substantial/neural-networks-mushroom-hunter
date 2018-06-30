import React, { Component } from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import { ResultsContainer } from './ResultsContainer.js'
import { Flex, Box, Divider, Panel, Samp, Subhead, Label, Text } from 'rebass'
import { formatDistance } from 'date-fns'

export function TrainingReport(props) {
  const training = props.trainingReport
  const brain = training.brain
  const { learningRate } = training.settings
  return (
    <Panel>
      <Panel.Header>
        <Flex width={1}>
          <Box width={1 / 2} px={2}>
            <Subhead fontSize="5">{training.test.accuracy * 100}%</Subhead>
            <Subhead fontSize="1" color="darken">
              Test Accuracy
            </Subhead>
          </Box>
          <Box width={1 / 2} px={2}>
            <Subhead fontSize="5">{training.test.loss}</Subhead>
            <Subhead fontSize="1" color="darken">
              Loss
            </Subhead>
          </Box>
        </Flex>
      </Panel.Header>
      <Box>
        <Subhead fontSize="1" pt={10} color="darken">
          Validations
        </Subhead>
        {training.validations.map((validation, index) => (
          <Flex key={index}>
            <Box width={1 / 2}> {validation.accuracy * 100}%</Box>
            <Box width={1 / 2}>{validation.loss}</Box>
          </Flex>
        ))}

        <Text pt={10}>Learning Rate: {learningRate}</Text>
        <Text fontSize="1" color="darken">
          {formatDistance(training.completionTime, new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Box>
      <Panel.Footer>
        <Text>
          <Samp>{brain.input_nodes}</Samp> input{' '}
          {brain.input_nodes == 1 ? 'node' : 'nodes'}{' '}
        </Text>
        <Text>
          <Samp>{brain.hidden_nodes}</Samp> hidden{' '}
          {brain.hidden_nodes == 1 ? 'node' : 'nodes'}{' '}
        </Text>
        <Text>
          <Samp>{brain.output_nodes}</Samp> output{' '}
          {brain.output_nodes == 1 ? 'node' : 'nodes'}
        </Text>
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
            <Box py={10} width={1 / 2} mx="auto" key={index}>
              <TrainingReport trainingReport={result} />
            </Box>
          ))}
        </Box>
      )}
    </Subscribe>
  )
}

export class Training {
  constructor(brain, settings) {
    this.brain = brain
    this.validations = []
    this.test = {}
    this.settings = settings
  }

  addValidation(loss, accuracy) {
    this.validations.push({ loss: loss, accuracy: accuracy })
  }

  addTest(loss, accuracy) {
    this.completionTime = new Date()
    this.test = { loss: loss, accuracy: accuracy }
  }
}
