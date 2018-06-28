import React, { Component } from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import { ResultsContainer } from './ResultsContainer.js'

export function TrainingReport(props) {
  const results = props.trainingReport
  const resultItems = results.map(result => {
    return { name: result[0], loss: result[1], accuracy: result[2] * 100 }
  })
  return (
    <div>
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
export function TrainingReportList() {
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
