'use strict'

import { send } from '../'

send('one', 'hello one 1')
  .then((data) => {
    console.log('one finished')
    console.info(data)
  })
  .then(() => {
    return send('one', 'hello one 2')
      .then((data) => {
        console.log('one finished')
        console.info(data)
      })
  })
  .catch((err) => {
    console.error(err)
  })

send('two', 'hello two 1')
  .then((data) => {
    console.log('two finished')
    console.info(data)
  })
  .then(() => {
    return send('two', 'hello two 2')
      .then((data) => {
        console.log('two finished')
        console.info(data)
      })
  })
  .catch((err) => {
    console.error(err)
  })

