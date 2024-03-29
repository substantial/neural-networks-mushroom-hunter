import React, { Component } from 'react'
import {
  Label,
  Select,
  Flex,
  Box,
  Slider,
  Samp,
  Checkbox,
} from 'rebass'
import { Container } from 'unstated'
import { mushroomFeatures } from './MushroomData.js'

let defaultFeatureReduce = (acc, cur) => {
  acc[cur] = false
  return acc
}

export class SettingsContainer extends Container {
  state = {
    learningRate: 0.3,
    numHiddenNodes: 4,
    features: Object.keys(mushroomFeatures).reduce(defaultFeatureReduce, {}),
  }

  settings() {
    return {
      learningRate: this.state.learningRate,
      numHiddenNodes: this.state.numHiddenNodes,
      features: Object.assign({}, this.state.features),
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

  handleFeatureChange = event => {
    let checked = event.target.checked
    let featureName = event.target.value
    this.settingsContainer.setState(previousState => {
      let features = previousState.features
      features[featureName] = checked

      return previousState
    })
  }

  render() {
    const featureCheckboxes = Object.keys(mushroomFeatures).map(key => (
      <Box width={1 / 4}>
        <Label>
          <Checkbox
            name="features"
            value={key}
            onChange={this.handleFeatureChange}
          />
          {key}
        </Label>
      </Box>
    ))

    return (
      <Flex flexWrap="wrap" px={10}>
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
        <Box width={5 / 6} pl={2}>
          <Label>Features</Label>
          <Flex flexWrap="wrap">{featureCheckboxes}</Flex>
        </Box>
      </Flex>
    )
  }
}
