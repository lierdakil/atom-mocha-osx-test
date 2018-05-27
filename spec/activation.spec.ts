import {expect} from 'chai'
import path = require('path')

declare global {
  interface Window {
    atomMochaOSXTestPackageActivated?: boolean
  }
}

describe('Activation', function () {
  it('starts clean', async function () {
    expect(window.atomMochaOSXTestPackageActivated).to.be.undefined
  })
  it('activates', async function () {
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    expect(window.atomMochaOSXTestPackageActivated).to.be.true
  })
  it('deactivates', async function () {
    await atom.packages.deactivatePackage('atom-mocha-osx-test')
    expect(window.atomMochaOSXTestPackageActivated).to.be.false
  })
})

describe('Activation2', function () {
    beforeEach(function() {
    expect(atom.packages.isPackageActive('atom-mocha-osx-test')).to.be.false
  })
  afterEach(async function() {
    await atom.packages.deactivatePackage('atom-mocha-osx-test')
    expect(window.atomMochaOSXTestPackageActivated).to.be.false
  })

  it('activates a second time', async function() {
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    expect(atom.packages.isPackageActive('atom-mocha-osx-test')).to.be.true
  })

  it('sets the variable', async function() {
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    expect(window.atomMochaOSXTestPackageActivated).to.be.true
  })

  it('sets the variable again', async function() {
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    expect(window.atomMochaOSXTestPackageActivated).to.be.true
  })
})

describe('Config', function () {
  beforeEach(async function () {
    await atom.packages.activatePackage(path.join(__dirname, '..'))
  })
  it('Defines config', function () {
    const config = atom.config.get('atom-mocha-osx-test')
    expect(config.test).to.be.ok
    expect(config.test).to.be.true
  })
})
