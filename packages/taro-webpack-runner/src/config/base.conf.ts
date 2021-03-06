import * as path from 'path'
import * as Chain from 'webpack-chain'

import { getRootPath } from '../util'
import { getBabelLoader, defaultBabelLoaderOption } from '../util/chain';

export default () => {
  const chain = new Chain()

  chain.merge({
    module: {
      rule: {
        jsx: {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: {
            babelLoader: getBabelLoader([defaultBabelLoaderOption])
          }
        },
        media: {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: {
            urlLoader: {
              loader: require.resolve('url-loader')
            }
          }
        },
        font: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            urlLoader: {
              loader: require.resolve('url-loader'),
              options: {
                limit: 2000
              }
            }
          }
        },
        image: {
          test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
          use: {
            urlLoader: {
              loader: require.resolve('url-loader'),
              options: {
                limit: 2000
              }
            }
          }
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['main', 'module'],
      symlinks: true,
      modules: [path.join(getRootPath(), 'node_modules'), 'node_modules']
    },
    resolveLoader: {
      modules: [path.join(getRootPath(), 'node_modules')]
    }
  })

  return chain
}
