"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValue = void 0;
const getDefaultValue = (optionName, schemaOptionDefault, commandTriggerContext, workspaceJsonDefaults) => {
    if (workspaceJsonDefaults === null || workspaceJsonDefaults === void 0 ? void 0 : workspaceJsonDefaults[optionName]) {
        return workspaceJsonDefaults[optionName];
    }
    else if (optionName === "groupingFolder" ||
        optionName === "libraryFolder" ||
        optionName === "componentLibraryPath") {
        return commandTriggerContext.groupingFolder;
    }
    else if (optionName === "projectName") {
        return commandTriggerContext.dasherizedGroupingFolderPath;
    }
    return schemaOptionDefault;
};
exports.getDefaultValue = getDefaultValue;
//# sourceMappingURL=get-default-value.js.map