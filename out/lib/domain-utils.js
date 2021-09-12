"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCypressFolder = exports.isLibraryFolder = exports.getWorkspaceRootPath = exports.getLibraries = exports.getDirectories = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const domain_library_name_enum_1 = require("./model/domain-library-name.enum");
const isDirectory = (path) => (0, fs_1.lstatSync)(path).isDirectory();
const getDirectories = (path) => (0, fs_1.readdirSync)(path)
    .map((name) => (0, path_1.join)(path, name))
    .filter(isDirectory);
exports.getDirectories = getDirectories;
const getLibraries = (commandTriggerContext) => {
    let folder = `libs/${commandTriggerContext.application}/${commandTriggerContext.topLevelDomain}`;
    if (commandTriggerContext.childDomain) {
        folder += `/${commandTriggerContext.childDomain}`;
    }
    const rootPath = (0, exports.getWorkspaceRootPath)();
    if (rootPath) {
        const fullPath = (0, path_1.join)(rootPath, folder);
        const directories = (0, exports.getDirectories)(fullPath);
        const folders = directories.map((path) => (0, path_1.basename)(path));
        return folders.filter(exports.isLibraryFolder);
    }
    return [];
};
exports.getLibraries = getLibraries;
const getWorkspaceRootPath = () => { var _a, _b; return (_b = (_a = (vscode_1.workspace.workspaceFolders || [])[0]) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.fsPath; };
exports.getWorkspaceRootPath = getWorkspaceRootPath;
const isLibraryFolder = (domainName) => Object.values(domain_library_name_enum_1.DomainLibraryName).some((libraryName) => domainName === libraryName);
exports.isLibraryFolder = isLibraryFolder;
const isCypressFolder = (domainName) => [".cypress", ".storybook"].some((cypressFolder) => domainName === cypressFolder);
exports.isCypressFolder = isCypressFolder;
//# sourceMappingURL=domain-utils.js.map