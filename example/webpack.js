'use strict'

const path = require('path')

module.exports = {
  target: 'atom',

  entry: {
    index: path.join(__dirname, './index')
  },

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        loose: 'all',
        stage: 0
      }
    }]
  }
}
