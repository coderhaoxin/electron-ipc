'use strict'

const BrowserWindow = require('browser-window')
const ipc = require('../build')
const app = require('app')

require('crash-reporter').start()

let mainWindow = null

app.on('window-all-close', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600
  })

  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  mainWindow.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})

ipc.once('one', function(args) {
  console.info('once one', args)
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(args)
    }, 3000)
  })
})

ipc.on('two', function(args) {
  console.info('on two', args)
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(args)
    }, 3000)
  })
})
