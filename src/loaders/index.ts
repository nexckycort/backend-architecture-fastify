import colors from 'colors'

import { Loaders, PreLoaders } from 'interfaces/server.interfaces'
import fastifyLoader from 'loaders/fastify'
import Logger from 'helpers/logger'
import { environment } from 'config'

export default async (): Promise<Loaders> => {
  Logger.info(colors.bold.italic.blue('Loading configuration... 💻'))
  const environmentMsg = `${colors.bold.magenta('Environment:')} ${colors.italic.bold.yellow(environment)}`
  Logger.info(environmentMsg)

  const loaders: PreLoaders = {
    app: undefined
  }

  try {
    loaders.app = fastifyLoader()
    Logger.info(colors.bold.green('Fastify loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Fastify'), error)
    throw error
  }

  return (loaders as unknown) as Loaders
}
