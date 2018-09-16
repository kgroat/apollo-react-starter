
const { writeFileSync } = require('fs')
const { printSchema } = require('graphql')

let schemaJson, typeDefs
try {
  schemaJson = require('../schema.json')
} catch (err) {
  console.error('There was an issue reading schema.json.  Make sure you have already run `npm start graphql.download`.')
  console.error(err)
  process.exit(1)
}

try {
  typeDefs = printSchema(schemaJson, { commentDescriptions: true })
} catch (err) {
  console.error('The contents of schema.json are not valid.  Try re-running `npm start graphql.download` to ensure you have a valid schema.')
  console.error(err)
  process.exit(1)
}

try {
  writeFileSync(require.resolve('../schema.graphql'), typeDefs)
} catch (err) {
  console.error('Failed to write to `schema.graphql`.  Make sure you have permissions to write to this file.')
  console.error(err)
  process.exit(1)
}