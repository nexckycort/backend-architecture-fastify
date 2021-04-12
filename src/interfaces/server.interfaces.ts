import { FastifyInstance } from 'fastify'

export enum ENVIRONMENT {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

export interface PreLoaders {
  app: FastifyInstance | undefined
}

export interface Loaders {
  app: FastifyInstance
}
