import { Container } from 'unstated'

export class ResultsContainer extends Container {
  state = { results: [] }

  addResults = results => {
    this.setState({ results: this.state.results.concat([results]) })
  }
}
