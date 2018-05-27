"use babel";

export function activate() {
  window.atomMochaOSXTestPackageActivated = true;
}

export function deactivate() {
  window.atomMochaOSXTestPackageActivated = false;
}
