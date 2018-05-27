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
    console.log('activating...')
    if (atom.packages.isPackageActive('markdown-preview')) {
      atom.packages.deactivatePackage('markdown-preview')
    }
    if (!atom.packages.isPackageDisabled('markdown-preview')) {
      atom.packages.disablePackage('markdown-preview')
      atom.notifications.addInfo(
        'Markdown-preview-plus has disabled markdown-preview package.',
        { dismissable: true },
      )
    }
  },

  deactivate() {
    window.atomMochaOSXTestPackageActivated = false;
  },
};
