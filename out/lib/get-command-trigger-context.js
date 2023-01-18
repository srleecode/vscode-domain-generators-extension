"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandTriggerContext = void 0;
const vscode_1 = require("vscode");
const getCommandTriggerContext = (triggeredFromUri) => {
    const workspaceFolder = (vscode_1.workspace.workspaceFolders || []).find(folder => triggeredFromUri.path.startsWith(folder.uri.path));
    const rootPath = workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.uri.path;
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