import {expect} from 'chai'
import path = require('path')

declare global {
  interface Window {
    atomMochaOSXTestPackageActivated: boolean
  }
}

declare module 'atom' {
  interface Package {
    getIncompatibleNativeModules(): object[]
  }
  interface PackageManager {
    loadPackage(path: string): Package
  }
}

describe('Activation', function () {
  before(async function () {
    const pkg = await atom.packages.loadPackage(path.join(__dirname, '..'))
    pkg.isCompatible = () => true
  })
  it('starts clean', async function () {
    expect(window.atomMochaOSXTestPackageActivated).to.be.undefined
  })
  it('activates', async function () {
    const pkg = await atom.packages.activatePackage('atom-mocha-osx-test')
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
