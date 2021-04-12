import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

import { SuccessOkResponse, InternalError } from 'helpers/api.response'
import TestService from 'services/test/TestService'
import schema from './schema'

interface Body {
  test: string
}

function testRouterPlugin(fastify: FastifyInstance, _opts: { prefix: string }, done: HookHandlerDoneFunction): void {
  const handler = (req: FastifyRequest, res: FastifyReply): void => {
    try {
      const { test } = req.body as Body
      const result = TestService.test(test)
      SuccessOkResponse(res, 'Test successfully', result)
    } catch (error) {
      InternalError(res)
    }
  }

  fastify.post('/', schema, handler)
  done()
}

export default testRouterPlugin
