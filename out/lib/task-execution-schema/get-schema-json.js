"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaJson = void 0;
const fs_1 = require("fs");
const error_utils_1 = require("../error-utils");
const get_schema_path_1 = require("./get-schema-path");
const getSchemaJson = (command, generatorName, collection) => {
    const schematicJsonFilePath = (0, get_schema_path_1.getSchemaPath)(generatorName);
    if (!schematicJsonFilePath) {
        let error = `Unable to find schema for ${command} ${collection}:${generatorName}`;
        if (collection === "@srleecode/domain") {
            error += ` Please ensure that you have the latest version of @srleecode/domain installed`;
        }
        else {
            error += ` Please ensure that you have installed ${collection}`;
        }
        (0, error_utils_1.showError)(error);
    }
    else if (!(0, fs_1.existsSync)(schematicJsonFilePath)) {
        (0, error_utils_1.showError)(`${schematicJsonFilePath} does not exist`);
    }
    const schematicJsonFile = (0, fs_1.readFileSync)(schematicJsonFilePath);
    return JSON.parse(schematicJsonFile.toString());
};
exports.getSchemaJson = getSchemaJson;
//# sourceMappingURL=get-schema-json.js.map