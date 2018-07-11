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

/*
  cap-shape: b,c,x,f, k,s
  cap-surface: f,g,y,s
  cap-color: n,b,c,g,r,p,u,e,w,yellowy
  bruises: t,f
  odor: a,l,c,y,f,m,n,p,s
  gill-attachment: a,d,f,n
  gill-spacing: c,w,d
  gill-size: b,n
  gill-color: k,n,b,h,g, r,o,p,u,e,w,y
  stalk-shape: e,t
  stalk-root: b,c,u,e,z,r,?
  stalk-surface-above-ring: f,y,k,s
  stalk-surface-below-ring: f,y,k,s
  stalk-color-above-ring: n,b,c,g,o,p,e,w,y
  stalk-color-below-ring: n,b,c,g,o,p,e,w,y
  veil-type: p,u
  veil-color: n,o,w,y
  ring-number: n,o,t
  ring-type: c,e,f,l,n,p,s,z
  spore-print-color: k,n,b,h,r,o,u,w,y
  population: a,c,n,s,v,y
  habitat: g,l,m,p,u,w,d
*/

export const mushroomFeatures = {
  'cap-shape': ['b', 'c', 'x', 'f', 'k', 's'],
  'cap-color': ['n', 'b', 'c', 'g', 'r', 'p', 'u', 'e', 'w', 'y'],
  'cap-surface': ['f', 'g', 'y', 's'],
  bruises: ['t'],
  odor: ['a', 'l', 'c', 'y', 'f', 'm', 'n', 'p', 's'],
  'gill-attachment': ['a', 'd', 'f', 'n'],
  'gill-spacing': ['c', 'w', 'd'],
  'gill-size': ['b'],
  'gill-color': ['k', 'n', 'b', 'h', 'g', 'r', 'o', 'p', 'u', 'e', 'w', 'y'],
  'stalk-root': ['b', 'c', 'u', 'e', 'z', 'r', '?'],
  'stalk-shape': ['e', 't'],
  'stalk-surface-above-ring': ['f', 'y', 'k', 's'],
  'stalk-surface-below-ring': ['f', 'y', 'k', 's'],
  'stalk-color-above-ring': ['n', 'b', 'c', 'g', 'o', 'p', 'e', 'w', 'y'],
  'stalk-color-below-ring': ['n', 'b', 'c', 'g', 'o', 'p', 'e', 'w', 'y'],
  'veil-type': ['p'],
  'veil-color': ['n', 'o', 'w', 'y'],
  'ring-number': ['n', 'o', 't'],
  'ring-type': ['c', 'e', 'f', 'l', 'n', 'p', 's', 'z'],
  'spore-print-color': ['k', 'n', 'b', 'h', 'r', 'o', 'u', 'w', 'y'],
  population: ['a', 'c', 'n', 's', 'v', 'y'],
  habitat: ['g', 'l', 'm', 'p', 'u', 'w', 'd'],
}

let processData = function(data, features) {
  let memo = []
  let labels = []
  for (let row of data) {
    memo.push(oneHotEncode(row, features))
  }

  // TODO: needs to return things rather than modifying state via side-effect
  for (let row of data) {
    labels.push(row['class'] === 'p' ? 1 : 0)
  }
  return [memo, labels]
}

function oneHotEncode(row, features) {
  let encoded = []
  for (let feature of Object.keys(features)) {
    for (let col of features[feature]) {
      let encoding = row[feature] === col ? 1 : 0
      encoded.push(encoding)
    }
  }
  return encoded
}
let shuffle = function(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

class MushroomData {
  constructor(settings) {
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
    this.inputSize = 0
    this.features = {}
    for (const key of Object.keys(settings.features)) {
      if (!settings.features[key]) {
        continue
      }
      this.features[key] = mushroomFeatures[key]
    }
  }

  async loadData() {
    let response = await Papa.parseAsync('./mushrooms.csv')
    let data = shuffle(response.data)
    let [inputs, labels] = processData(data, this.features)
    this.inputSize = inputs[0].length
    ;[
      this.train.inputs,
      this.train.labels,
      this.test.inputs,
      this.test.labels,
      this.validation.inputs,
      this.validation.labels,
    ] = this.segmentData(inputs, labels)
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
/* FULL FEATURE LISt
  cap-shape: bell=b,conical=c,convex=x,flat=f, knobbed=k,sunken=s
  cap-surface: fibrous=f,grooves=g,scaly=y,smooth=s
  cap-color: brown=n,buff=b,cinnamon=c,gray=g,green=r,pink=p,purple=u,red=e,white=w,yellowy
  bruises: bruises=t,no=f
  odor: almond=a,anise=l,creosote=c,fishy=y,foul=f,musty=m,none=n,pungent=p,spicy=s
  gill-attachment: attached=a,descending=d,free=f,notched=n
  gill-spacing: close=c,crowded=w,distant=d
  gill-size: broad=b,narrow=n
  gill-color: black=k,brown=n,buff=b,chocolate=h,gray=g, green=r,orange=o,pink=p,purple=u,red=e,white=w,yellow=y
  stalk-shape: enlarging=e,tapering=t
  stalk-root: bulbous=b,club=c,cup=u,equal=e,rhizomorphs=z,rooted=r,missing=?
  stalk-surface-above-ring: fibrous=f,scaly=y,silky=k,smooth=s
  stalk-surface-below-ring: fibrous=f,scaly=y,silky=k,smooth=s
  stalk-color-above-ring: brown=n,buff=b,cinnamon=c,gray=g,orange=o,pink=p,red=e,white=w,yellow=y
  stalk-color-below-ring: brown=n,buff=b,cinnamon=c,gray=g,orange=o,pink=p,red=e,white=w,yellow=y
  veil-type: partial=p,universal=u
  veil-color: brown=n,orange=o,white=w,yellow=y
  ring-number: none=n,one=o,two=t
  ring-type: cobwebby=c,evanescent=e,flaring=f,large=l,none=n,pendant=p,sheathing=s,zone=z
  spore-print-color: black=k,brown=n,buff=b,chocolate=h,green=r,orange=o,purple=u,white=w,yellow=y
  population: abundant=a,clustered=c,numerous=n,scattered=s,several=v,solitary=y
  habitat: grasses=g,leaves=l,meadows=m,paths=p,urban=u,waste=w,woods=d
*/
