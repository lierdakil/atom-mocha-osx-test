module.exports = {
  config: {
    test: {
      title: 'Test config item',
      type: 'boolean',
      default: true,
    },
  },

  activate() {
    window.atomMochaOSXTestPackageActivated = true;
  },

  deactivate() {
    window.atomMochaOSXTestPackageActivated = false;
  },
};
