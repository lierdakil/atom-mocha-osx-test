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

describe('Activation3', function () {
  afterEach(async function() {
    await atom.packages.deactivatePackage('atom-mocha-osx-test')
    expect(window.atomMochaOSXTestPackageActivated).to.be.false
  })

  it('disables markdown-preview package', async function() {
    atom.packages.enablePackage('markdown-preview')
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    expect(atom.packages.isPackageDisabled('markdown-preview')).to.be.true
  })

  it('deactivates markdown-preview package', async function() {
    await atom.packages.activatePackage('markdown-preview')
    await atom.packages.activatePackage(path.join(__dirname, '..'))
    await waitsFor(
      () => atom.packages.isPackageActive('markdown-preview') === false,
    )
  })

  describe('notifications', function() {
    before(async () => atom.packages.activatePackage('notifications'))
    after(async () => atom.packages.deactivatePackage('notifications'))

    it('notifies about deactivation', async function() {
      await atom.packages.activatePackage('markdown-preview')
      await atom.packages.activatePackage(path.join(__dirname, '..'))
      expect(
        atom.views
          .getView(atom.workspace)
          .querySelector('atom-notification.info'),
      ).to.exist
    })
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

async function waitsFor<T>(
  func: () => T | undefined | null | Promise<T | undefined | null>,
  timeout = 8000,
  intervalTime = 500,
  msg: string = func.toString(),
): Promise<T> {
  return new Promise<T>(function(fufill, reject) {
    const interval = setInterval(async function() {
      try {
        const res = await func()
        if (res) {
          clearTimeout(timeoutId)
          clearInterval(interval)
          fufill(res)
        }
      } catch (e) {
        reject(e)
      }
    }, intervalTime)

    const timeoutId = setTimeout(function() {
      clearInterval(interval)
      reject(new Error('Waits for condition never met: ' + msg))
    }, timeout)
  })
}
