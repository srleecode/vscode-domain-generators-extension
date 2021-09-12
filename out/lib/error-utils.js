"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = void 0;
const vscode_1 = require("vscode");
const showError = (errorMessage) => {
    vscode_1.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
};
exports.showError = showError;
//# sourceMappingURL=error-utils.js.map