"use babel";

export function activate() {
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

export function deactivate() {
  window.atomMochaOSXTestPackageActivated = false;
}
