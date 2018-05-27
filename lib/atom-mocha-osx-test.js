'use babel';

export default {
  activate() {
    window.atomMochaOSXTestPackageActivated = true;
  },

  deactivate() {
    window.atomMochaOSXTestPackageActivated = false;
  },
};
