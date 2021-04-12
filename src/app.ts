/* eslint-disable import/first */
process.stdout.write('\x1Bc')
import colors from 'colors'

import Logger from 'helpers/logger'
import loaders from 'loaders'
import { port } from 'config'

const start = async (): Promise<void> => {
  const { app: server } = await loaders()
  try {
    await server.listen(port)

    const severListeningMsg = colors.bold.green(`Server ${colors.blue('name')} listening on port:`)
    Logger.info(`${colors.yellow('########################################################')}
🛡️  ${severListeningMsg} ${colors.bold.blue(port)} 🛡️
${colors.yellow('########################################################')}`)
  } catch (err) {
    Logger.error('error in server.listen', err)
    server.log.error('error in server.listen', err)
    process.exit(1)
  }
}
start()
