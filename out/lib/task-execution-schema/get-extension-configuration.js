"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionConfiguration = void 0;
const vscode_1 = require("vscode");
const getExtensionConfiguration = () => {
    const workSpaceConfig = vscode_1.workspace.getConfiguration("domainGenerators");
    const collection = workSpaceConfig.get("collection");
    return Object.assign(Object.assign({ collection }, getComponentOptions(workSpaceConfig)), getDomainLibraryOptions(workSpaceConfig));
};
exports.getExtensionConfiguration = getExtensionConfiguration;
const getDomainLibraryOptions = (workSpaceConfig) => ({
    buildable: workSpaceConfig.get("buildable.enabled"),
    strict: workSpaceConfig.get("strict.enabled"),
    enableIvy: workSpaceConfig.get("enableIvy.enabled"),
    publishable: workSpaceConfig.get("publishable.enabled"),
});
const getComponentOptions = (workSpaceConfig) => ({
    mountType: workSpaceConfig.get("mountType"),
    unitTestType: workSpaceConfig.get("unitTestType"),
    style: workSpaceConfig.get("style"),
    displayBlock: workSpaceConfig.get("displayBlock.enabled"),
});
//# sourceMappingURL=get-extension-configuration.js.map