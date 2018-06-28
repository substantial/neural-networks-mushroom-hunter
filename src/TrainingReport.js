import React, { Component } from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import { ResultsContainer } from './ResultsContainer.js'
import { Flex, Box, Divider } from 'rebass'

export function TrainingReport(props) {
  const results = props.trainingReport
  const resultItems = results.map(result => {
    return { name: result[0], loss: result[1], accuracy: result[2] * 100 }
  })
  return (
    <div>
      {resultItems.map((result, index) => (
        <Flex key={index}>
          <Box width={1 / 2}>{result.name}</Box>
          <Box width={1 / 2}> {result.accuracy}%</Box>
        </Flex>
      ))}
    </div>
  )
}
export function TrainingReportList() {
  return (
    <Subscribe to={[ResultsContainer]}>
      {resultsContainer => (
        <Box>
          {resultsContainer.state.results.map((result, index) => (
            <Box py={10} width={1}>
              <TrainingReport key={index} trainingReport={result} />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Subscribe>
  )
}
