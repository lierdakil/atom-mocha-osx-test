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
    pkg.getIncompatibleNativeModules = () => []
    if (!pkg.isCompatible()) {
      const res = await pkg.rebuild()
      console.log('Rebuild finished with', res.code, res.stdout, res.stderr)
    }
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
