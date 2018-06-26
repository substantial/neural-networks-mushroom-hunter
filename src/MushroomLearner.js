import NeuralNetwork from './lib/nn.js'
import MushroomData from './MushroomData.js'

const numHiddenNodes = 17
const numOutputNodes = 1

class MushroomLearner {
  async train() {
    let data = new MushroomData()
    await data.loadData()
    let numInputs = data.train.inputs[0].length

    this.brain = new NeuralNetwork(numInputs, numHiddenNodes, numOutputNodes)

    // point: learning rate
    this.brain.setLearningRate(0.3)

    console.log(
      `ANN Structure: ${this.brain.input_nodes}->${this.brain.hidden_nodes}->${
        this.brain.output_nodes
      }`
    )
    this.trainEpochs(10, data)
  }

  trainEpochs(numEpochs, data) {
    for (let e = 0; e < numEpochs; e++) {
      for (let i = 0; i < data.train.inputs.length; i++) {
        let features = data.train.inputs[i]
        let y = data.train.labels[i]
        this.brain.train(features, [y])
      }

      this.test(
        data.validation.inputs,
        data.validation.labels,
        'Epoch: ' + (e + 1) + '\t'
      )
      // epoch, mean squared error, accuracy
    }

    this.test(data.test.inputs, data.test.labels, 'Test :\t\t')
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
    console.log(
      name,
      (sumSquared / numTests).toString().slice(0, 5),
      (numCorrect / numTests).toString().slice(0, 5)
    )
  }
}
export default MushroomLearner
