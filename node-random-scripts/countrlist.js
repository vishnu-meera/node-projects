const {Dataset} = require('data.js')

const path = 'https://datahub.io/core/country-list/datapackage.json'

// We're using self-invoking function here as we want to use async-await syntax:
;(async () => {
  const dataset = await Dataset.load(path)
  // get list of all resources:
  for (const id in dataset.resources) {
    console.log(dataset.resources[id]._descriptor.name)
  }
  // get all tabular data(if exists any)
  for (const id in dataset.resources) {
    if (dataset.resources[id]._descriptor.format === "csv") {
      const file = dataset.resources[id]
      // Get a raw stream
      const stream = await file.stream()
      // entire file as a buffer (be careful with large files!)
      const buffer = await file.buffer
      // print data
      stream.pipe(process.stdout)
    }
  }
})()