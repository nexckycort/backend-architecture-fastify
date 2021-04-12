import nodeExternals from 'webpack-node-externals'
import CopyPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'
import path from 'path'
const {
  compilerOptions: { paths: tsconfigPaths }
} = require('./tsconfig.json')

const paths = Object.assign(
  {},
  ...Object.keys(tsconfigPaths).map((key) => {
    const keyTemp = key.includes('/*') ? key.slice(0, -2) : key
    const pathUrl = `${path.resolve(__dirname, 'src/', tsconfigPaths[key][0])}`
    const valueTemp = pathUrl.includes('/*') || pathUrl.includes('\\*') ? pathUrl.slice(0, -2) : pathUrl
    return {
      [keyTemp]: valueTemp
    }
  })
)

const config: Configuration = {
  entry: path.join(__dirname, 'src/app.ts'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    alias: paths,
    extensions: ['.ts']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'package.json', to: '.' },
        { from: '.env', to: '.' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  }
}

export default config
