import React, { Component } from 'react'
import { Label, Select, Box } from 'rebass'
import { Container } from 'unstated'
export class SettingsContainer extends Container {
  state = { learningRate: 0.3 }

  settings() {
    return {
      learningRate: this.state.learningRate,
    }
  }
}
export class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.settingsContainer = props.settingsContainer
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.settingsContainer.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Box>
        <Box width={1 / 6}>
          <Label>Learning Rate</Label>
          <Select
            name="learningRate"
            value={this.settingsContainer.state.learningRate}
            onChange={this.handleInputChange}
          >
            {[0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3].map((val, index) => (
              <option value={val} key={index}>
                {val}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    )
  }
}
