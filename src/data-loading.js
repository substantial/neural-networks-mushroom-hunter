/*
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

// point: features, feature size, nn structure
const features = {
  'cap-shape': ['b', 'c', 'x', 'f', 'k', 's'],
  'cap-color': ['n', 'b', 'c', 'g', 'r', 'p', 'u', 'e', 'w', 'y'],
  'cap-surface': ['f', 'g', 'y', 's'],
  bruises: ['t'],
  odor: ['a', 'l', 'c', 'y', 'f', 'm', 'n', 'p', 's'],
  'gill-attachment': ['a', 'd', 'f', 'n'],
  'gill-spacing': ['c', 'w', 'd'],
  'gill-size': ['b'],
  'gill-color': ['k', 'n', 'b', 'h', 'g', 'r', 'o', 'p', 'u', 'e', 'w', 'y'],
  'stalk-shape': ['e'],
  'stalk-root': ['b', 'c', 'u', 'e', 'z', 'r', '?'],
  habitat: ['g', 'l', 'm', 'p', 'u', 'w', 'd'],
}

let processData = function(data) {
  let memo = []
  let labels = []
  for (let row of data) {
    memo.push(oneHotEncode(row))
  }

  // TODO: needs to return things rather than modifying state via side-effect
  for (let row of data) {
    labels.push(row['class'] == 'p' ? 1 : 0)
  }
  return [memo, labels]
}

function oneHotEncode(row) {
  let encoded = []
  for (let feature of Object.keys(features)) {
    for (let col of features[feature]) {
      let encoding = row[feature] == col ? 1 : 0
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

export { processData, shuffle }
