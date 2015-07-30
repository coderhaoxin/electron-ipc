'use strict'

import ipc from 'ipc'

/**
 * @param {String} event
 * @param {Any} args
 */

function send(event, args) {
  return Promise.race([
    new Promise((resolve, reject) => {
      // renderer process
      ipc.once(event, (data) => {
        resolve(data)
      })
      // send
      ipc.send(event, args)
    }),
    new Promise((resolve, reject) => {
      let timeout = 5000
      setTimeout(() => {
        let err = new Error('Timeout: ' + timeout + 'ms')
        reject(err)
      }, timeout)
    })
  ])
}

/**
 * @param {String} event
 * @param {Function} cb (cb must return a Promise)
 */

function once(event, cb) {
  // main process
  ipc.once(event, (e, args) => {
    cb(args).then((data) => {
      e.sender.send(event, data)
    }).catch((err) => {
      e.sender.send('error', err)
    })
  })
}

/**
 * @param {String} event
 * @param {Function} cb (cb must return a Promise)
 */

function on(event, cb) {
  // main process
  ipc.on(event, (e, args) => {
    cb(args).then((data) => {
      e.sender.send(event, data)
    }).catch((err) => {
      e.sender.send('error', err)
    })
  })
}

/**
 * export
 */

export {
  send,
  once,
  on
}
