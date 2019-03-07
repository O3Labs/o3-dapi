'use strict'

const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';
  return {
    resolve: {
      extensions: ['.ts', '.js'],
    },
    entry: ['./src/index'],
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: "tslint-loader",
          exclude: [/node_modules/],
          include: path.join(__dirname, './src'),
        },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: 'ts-loader',
          include: path.join(__dirname, './src'),
        },
      ],
    },
    devtool: !DISTRIBUTION && 'inline-source-map',
    output: {
      path: path.join(__dirname, DISTRIBUTION ? 'lib' : 'build'),
      filename: DISTRIBUTION ? 'o3-dapi-core.min.js' : 'bundle.js',
      libraryTarget: "umd",
      library: 'o3dapi',
      libraryExport: 'default',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    externals: [
      {'socket.io-client-node': 'socket.io-client'},
      {'node-crypto': 'crypto'},
    ],
  };
};
