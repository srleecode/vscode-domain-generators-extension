"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValue = void 0;
const generator_name_1 = require("../model/generator-name");
const getDefaultValue = (optionName, schemaOptionDefault, commandTriggerContext, extensionConfiguration, gemeratorName) => {
    if (optionName === "groupingFolder" || optionName === "libraryFolder") {
        return commandTriggerContext.groupingFolder;
    }
    else if (optionName === "projectName") {
        return commandTriggerContext.dasherizedGroupingFolderPath;
    }
    else if (gemeratorName === generator_name_1.GeneratorName.ct &&
        optionName === "testingType") {
        return "component";
    }
    else if (optionName === "mockFileName") {
        return "mock";
    }
    if (extensionConfiguration[optionName]) {
        return extensionConfiguration[optionName];
    }
    return schemaOptionDefault;
};
exports.getDefaultValue = getDefaultValue;
//# sourceMappingURL=get-default-value.js.map