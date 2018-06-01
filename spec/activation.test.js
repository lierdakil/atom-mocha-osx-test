"use babel"

import {expect} from 'chai'

try {
  require('fsevents')
} catch (e) {
  console.log(e)
  process.exit(1)
}

describe('Test', function () {
  it('works', function () {
    expect(true).to.be.true
  })
})
