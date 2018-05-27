"use babel"

describe('Activation', function () {
  it('starts clean', function () {
    expect(window.atomMochaOSXTestPackageActivated).not.toBeDefined()
  })
  it('activates', function () {
    waitsForPromise(() => atom.packages.activatePackage('atom-mocha-osx-test'))
    runs(() => {
      expect(window.atomMochaOSXTestPackageActivated).toBe(true)
    })
  })
  it('deactivates', function () {
    waitsForPromise(() => atom.packages.deactivatePackage('atom-mocha-osx-test'))
    runs(() => {
      expect(window.atomMochaOSXTestPackageActivated).toBe(false)
    })
  })
})
