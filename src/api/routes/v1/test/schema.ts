import { RouteShorthandOptions } from 'fastify'

const bodyJsonSchema = {
  type: 'object',
  properties: {
    test: { type: 'string', minLength: 3, maxLength: 10 }
  },
  required: ['test']
}

const headersJsonSchema = {
  type: 'object',
  properties: {
    'h-Custom': { type: 'string' }
  },
  required: ['h-Custom']
}

const opts: RouteShorthandOptions = {
  schema: {
    body: bodyJsonSchema,
    headers: headersJsonSchema
  }
}

export default opts
