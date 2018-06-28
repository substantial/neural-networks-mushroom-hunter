import { Container } from 'unstated'

export class ResultsContainer extends Container {
  state = { results: [] }

  addResults = results => {
    this.setState({ results: [results].concat(this.state.results) })
  }
}
