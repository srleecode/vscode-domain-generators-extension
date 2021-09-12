"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaPath = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const getSchemaPath = () => {
    const rootPath = getWorkspaceRootPath();
    const schemaPath = "node_modules/@srleecode/domain/generators/grouping-folder/create-app/src/schema.json";
    return (0, path_1.join)(rootPath, schemaPath);
};
exports.getSchemaPath = getSchemaPath;
const getWorkspaceRootPath = () => { var _a, _b; return (_b = (_a = (vscode_1.workspace.workspaceFolders || [])[0]) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.fsPath; };
//# sourceMappingURL=get-schema-path.js.map