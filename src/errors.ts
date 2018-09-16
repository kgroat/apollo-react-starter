
import { GraphQLError } from 'graphql'
import { FetchResult } from 'apollo-link'

export class FetchResultError extends Error {
  errors: GraphQLError[]

  constructor (
    public requestName: string,
    public result: FetchResult,
  ) {
    super(`Graphql request "${requestName}" failed.`)
    this.errors = result.errors!
  }
}
