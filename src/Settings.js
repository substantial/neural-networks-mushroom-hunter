import React, { Component } from 'react'
import { Label, Select, Flex, Box, Slider, Samp } from 'rebass'
import { Container } from 'unstated'
export class SettingsContainer extends Container {
  state = { learningRate: 0.3, numHiddenNodes: 4 }

  settings() {
    return {
      learningRate: this.state.learningRate,
      numHiddenNodes: this.state.numHiddenNodes,
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
    let value = target.type === 'checkbox' ? target.checked : target.value
    if (target.valueAsNumber != null) {
      value = target.valueAsNumber
    }

    const name = target.name

    this.settingsContainer.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Flex>
        <Box width={2 / 6} px={10}>
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
        <Box width={4 / 6} px={10}>
          <Label>Hidden Nodes</Label>
          <Flex>
            <Slider
              name="numHiddenNodes"
              value={this.settingsContainer.state.numHiddenNodes}
              onChange={this.handleInputChange}
              width={8 / 10}
              min={1}
              max={40}
            />
            <Samp width={1 / 10} px={1}>
              {this.settingsContainer.state.numHiddenNodes}
            </Samp>
          </Flex>
        </Box>
      </Flex>
    )
  }
}
