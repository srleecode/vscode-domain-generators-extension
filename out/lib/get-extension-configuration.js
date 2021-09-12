"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionConfiguration = void 0;
const vscode_1 = require("vscode");
const getExtensionConfiguration = () => {
    const domainSchematicsConfig = vscode_1.workspace.getConfiguration("domainSchematics");
    const style = domainSchematicsConfig.get("style");
    const prefix = domainSchematicsConfig.get("prefix");
    const collection = domainSchematicsConfig.get("collection");
    const lint = domainSchematicsConfig.get("lint");
    const addJestJunitReporter = domainSchematicsConfig.get("addJestJunitReporter.enabled");
    const uiFramework = domainSchematicsConfig.get("uiFramework");
    const displayBlock = domainSchematicsConfig.get("displayBlock.enabled");
    const isExported = domainSchematicsConfig.get("isExported.enabled");
    const buildable = domainSchematicsConfig.get("buildable.enabled");
    const publishable = domainSchematicsConfig.get("publishable.enabled");
    const strict = domainSchematicsConfig.get("strict.enabled");
    const enableIvy = domainSchematicsConfig.get("enableIvy.enabled");
    const ngrxFolder = domainSchematicsConfig.get("ngrxFolder");
    return {
        style,
        prefix,
        collection,
        lint,
        addJestJunitReporter,
        uiFramework,
        displayBlock,
        isExported,
        buildable,
        publishable,
        strict,
        enableIvy,
        ngrxFolder,
    };
};
exports.getExtensionConfiguration = getExtensionConfiguration;
//# sourceMappingURL=get-extension-configuration.js.map