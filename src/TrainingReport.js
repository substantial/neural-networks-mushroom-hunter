import React from 'react'
import { Subscribe } from 'unstated'
import { ResultsContainer } from './ResultsContainer.js'
import { Flex, Box, Panel, Samp, Subhead, Text } from 'rebass'
import { formatDistance } from 'date-fns'

export function TrainingReport(props) {
  const training = props.trainingReport
  const brain = training.brain
  const { learningRate } = training.settings
  const accuracyFormat = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })
  const lossFormat = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
  return (
    <Panel>
      <Panel.Header>
        <Flex width={1}>
          <Box width={1 / 2} px={2}>
            <Subhead fontSize="5">
              {accuracyFormat.format(training.test.accuracy * 100)}%
            </Subhead>
            <Subhead fontSize="1" color="darken">
              Test Accuracy
            </Subhead>
          </Box>
          <Box width={1 / 2} px={2}>
            <Subhead fontSize="5">
              {lossFormat.format(training.test.loss)}
            </Subhead>
            <Subhead fontSize="1" color="darken">
              Test Loss
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
            <Box width={1 / 2}>
              {accuracyFormat.format(validation.accuracy * 100)}%
            </Box>
            <Box width={1 / 2}>{lossFormat.format(validation.loss)}</Box>
          </Flex>
        ))}

        <Subhead fontSize="1" pt={10} color="darken">
          Learning Rate
        </Subhead>

        <Text pt={10}>{learningRate}</Text>
        <Subhead fontSize="1" pt={10} color="darken">
          Features
        </Subhead>
        <Flex flexWrap="wrap">
          {Object.keys(training.settings.features)
            .filter(key => training.settings.features[key] === true)
            .map((feature, index) => (
              <Box px={1} py={1 / 2} width={1} fontSize={1}>
                {feature}
              </Box>
            ))}
        </Flex>
        <Text fontSize="1" color="darken">
          {formatDistance(training.completionTime, new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Box>
      <Panel.Footer>
        <Text>
          <Samp>{brain.input_nodes}</Samp> input{' '}
          {brain.input_nodes === 1 ? 'node' : 'nodes'} /{' '}
          <Samp>{brain.hidden_nodes}</Samp> hidden{' '}
          {brain.hidden_nodes === 1 ? 'node' : 'nodes'} /{' '}
          <Samp>{brain.output_nodes}</Samp> output{' '}
          {brain.output_nodes === 1 ? 'node' : 'nodes'}
        </Text>
      </Panel.Footer>
    </Panel>
  )
}
export function TrainingReportList() {
  return (
    <Subscribe to={[ResultsContainer]}>
      {resultsContainer => (
        <Flex flexWrap="wrap">
          {resultsContainer.state.results.map((result, index) => (
            <Box py={10} px={1} width={1 / 3} key={index}>
              <TrainingReport trainingReport={result} />
            </Box>
          ))}
        </Flex>
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
