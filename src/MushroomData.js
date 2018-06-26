import { processData, shuffle } from './data-loading.js'
import Papa from 'papaparse'

const trainSize = 4200
const testSize = 2000

Papa.parseAsync = function(file) {
  return new Promise(function(complete, error) {
    Papa.parse(file, {
      download: true,
      header: true,
      delimiter: ',',
      complete,
      error,
    })
  })
}

class MushroomData {
  constructor() {
    this.test = {
      inputs: [],
      labels: [],
    }
    this.train = {
      inputs: [],
      labels: [],
    }

    this.validation = {
      inputs: [],
      labels: [],
    }
  }

  async loadData() {
    let response = await this.parseData()
    let data = shuffle(response.data)
    let [inputs, labels] = processData(data)
    ;[
      this.train.inputs,
      this.train.labels,
      this.test.inputs,
      this.test.labels,
      this.validation.inputs,
      this.validation.labels,
    ] = this.segmentData(inputs, labels)
  }

  async parseData() {
    let response = await Papa.parseAsync('./mushrooms.csv')
    console.log(response)
    return response
  }

  segmentData(inputs, labels) {
    let testValX = inputs.slice(trainSize)
    let testValY = labels.slice(trainSize)

    return [
      inputs.slice(0, trainSize),
      labels.slice(0, trainSize),
      testValX.slice(0, testSize),
      testValY.slice(0, testSize),
      testValX.slice(testSize),
      testValY.slice(testSize),
    ]
  }
}

export default MushroomData
