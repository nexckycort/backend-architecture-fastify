import http from 'http'

import Fastify, { FastifyInstance } from 'fastify'
import compression from 'fastify-compress'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'

import routesV1 from 'api/routes/v1'
import { api } from 'config'

export default (): FastifyInstance => {
  const serverFactory = (handler: any, opts: any): http.Server => {
    const server = http.createServer((req, res) => {
      handler(req, res)
    })

    return server
  }

  const app: FastifyInstance = Fastify({
    serverFactory,
    logger: true,
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    trustProxy: true
  })

  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.register(helmet)

  // Compress all HTTP responses
  app.register(compression)

  // Enable Cross Origin Resource Sharing to all origins by default
  app.register(cors, {
    origin: '*',
    optionsSuccessStatus: 200
  })

  // routes
  app.register(routesV1, { prefix: api.prefix })

  return app
}
