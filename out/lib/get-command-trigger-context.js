"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandTriggerContext = void 0;
const vscode_1 = require("vscode");
const getCommandTriggerContext = (triggeredFromUri) => {
    var _a, _b;
    const rootPath = (_b = (_a = (vscode_1.workspace.workspaceFolders || [])[0]) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.path;
    const groupingFolder = triggeredFromUri.path.replace(`${rootPath}/`, "");
    return {
        groupingFolder,
        dasherizedGroupingFolderPath: groupingFolder
            .replace("libs/", "")
            .replace("/.e2e", "")
            .replace("/.ct", "")
            .replace(/\//g, "-"),
    };
};
exports.getCommandTriggerContext = getCommandTriggerContext;
//# sourceMappingURL=get-command-trigger-context.js.map