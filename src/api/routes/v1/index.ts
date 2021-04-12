import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'

import test from 'api/routes/v1/test'

function myRoutesPlugin(fastify: FastifyInstance, _opts: { prefix: string }, done: HookHandlerDoneFunction): void {
  fastify.register(test, { prefix: '/test' })
  done()
}

export default myRoutesPlugin
