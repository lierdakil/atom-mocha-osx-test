"use strict";

var config = {
  test: {
    title: 'Test config item',
    type: 'boolean',
    default: true,
  },
};

exports.config = config;


function activate() {
  window.atomMochaOSXTestPackageActivated = true;
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
}
exports.activate = activate;

function deactivate() {
  window.atomMochaOSXTestPackageActivated = false;
}
exports.deactivate = deactivate;
