import NeuralNetwork from './lib/nn.js'
import MushroomData from './MushroomData.js'

const numHiddenNodes = 17
const numOutputNodes = 1

class MushroomLearner {
  async train() {
    let data = new MushroomData()
    await data.loadData()

    this.brain = new NeuralNetwork(
      data.inputSize,
      numHiddenNodes,
      numOutputNodes
    )

    this.brain.setLearningRate(0.3)

    console.log(
      `ANN Structure: ${this.brain.input_nodes}->${this.brain.hidden_nodes}->${
        this.brain.output_nodes
      }`
    )
    return this.trainEpochs(10, data)
  }

  trainEpochs(numEpochs, data) {
    let results = []
    for (let e = 0; e < numEpochs; e++) {
      for (let i = 0; i < data.train.inputs.length; i++) {
        let features = data.train.inputs[i]
        let y = data.train.labels[i]
        this.brain.train(features, [y])
      }

      let result = this.test(
        data.validation.inputs,
        data.validation.labels,
        'Epoch ' + (e + 1)
      )
      results.push(result)
      // epoch, mean squared error, accuracy
    }

    let result = this.test(data.test.inputs, data.test.labels, 'Test')
    results.push(result)
    return results
  }

  test(inputs, labels, name) {
    // testing // TODO: how do we calculate test vs. validation error?
    let sumSquared = 0
    let numTests = 0
    let numCorrect = 0

    for (let i = 0; i < inputs.length; i++) {
      let p = labels[i]
      let prediction = this.brain.predict(inputs[i])
      let error = p - prediction

      // TODO: calculate loss via cross entropy
      prediction = prediction < 0.5 ? 0 : 1
      if (p === prediction) {
        numCorrect++
      }
      sumSquared += error * error
      numTests++
    }
    let result = [
      name,
      (sumSquared / numTests).toString().slice(0, 5),
      (numCorrect / numTests).toString().slice(0, 5),
    ]

    console.log(result)
    return result
  }
}
export default MushroomLearner
