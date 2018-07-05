import NeuralNetwork from './lib/nn.js'
import MushroomData from './MushroomData.js'
import { Training } from './TrainingReport.js'

const numOutputNodes = 1

class MushroomLearner {
  async train(settings) {
    let data = new MushroomData()
    await data.loadData()

    this.brain = new NeuralNetwork(
      data.inputSize,
      settings.numHiddenNodes,
      numOutputNodes
    )

    this.brain.setLearningRate(settings.learningRate)
    return this.trainEpochs(10, data, settings)
  }

  trainEpochs(numEpochs, data, settings) {
    let training = new Training(this.brain, settings)

    for (let e = 0; e < numEpochs; e++) {
      for (let i = 0; i < data.train.inputs.length; i++) {
        let features = data.train.inputs[i]
        let label = data.train.labels[i]
        this.brain.train(features, [label])
      }

      let [loss, accuracy] = this.test(
        data.validation.inputs,
        data.validation.labels
      )

      training.addValidation(loss, accuracy)
      // epoch, mean squared error, accuracy
    }

    let [loss, accuracy] = this.test(data.test.inputs, data.test.labels)
    training.addTest(loss, accuracy)
    return training
  }

  test(inputs, labels) {
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
    return [
      (sumSquared / numTests).toString().slice(0, 5), // loss
      (numCorrect / numTests).toString().slice(0, 5), // accuracy
    ]
  }
}
export default MushroomLearner
