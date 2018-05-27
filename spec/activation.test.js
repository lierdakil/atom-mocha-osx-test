"use babel"

import {expect} from 'chai'
const path = require('path')

describe('Activation', function () {
  it('starts clean', async function () {
    expect(window.atomMochaOSXTestPackageActivated).to.be.undefined
  })
  it('activates', async function () {
    const pkg = await atom.packages.activatePackage(path.join(__dirname, '..'))
    console.log('\n')
    console.log('Package.isCompatible() = ', pkg.isCompatible())
    console.log('Package.getIncompatibleNativeModules() = ', pkg.getIncompatibleNativeModules())
    expect(window.atomMochaOSXTestPackageActivated).to.be.true
  })
  it('deactivates', async function () {
    await atom.packages.deactivatePackage('atom-mocha-osx-test')
    expect(window.atomMochaOSXTestPackageActivated).to.be.false
  })
})
