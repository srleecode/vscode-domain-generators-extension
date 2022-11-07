"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskExecutionSchema = void 0;
const command_1 = require("../model/command");
const generator_name_1 = require("../model/generator-name");
const get_schema_json_1 = require("./get-schema-json");
const get_options_1 = require("./get-options");
const vscode_1 = require("vscode");
const getTaskExecutionSchema = (generatorName, commandType, commandTriggerContext, workspaceJsonPath) => {
    const name = generatorName.toString();
    const cliName = "nx";
    const collection = getCollection(commandType, generatorName);
    const schemaJson = (0, get_schema_json_1.getSchemaJson)(commandType, generatorName, collection);
    return {
        name,
        collection,
        options: (0, get_options_1.getOptions)(schemaJson, commandTriggerContext, collection, generatorName, workspaceJsonPath),
        description: schemaJson.description,
        command: commandType.toString(),
        positional: getPositional(generatorName, commandType, collection, commandTriggerContext),
        cliName,
        contextValues: undefined,
    };
};
exports.getTaskExecutionSchema = getTaskExecutionSchema;
const getCollection = (commandType, generatorName) => {
    if (commandType === command_1.Command.generate) {
        const workSpaceConfig = vscode_1.workspace.getConfiguration("domainGenerators");
        const customCollection = workSpaceConfig.get("customCollection");
        const customCollectionGenerators = workSpaceConfig.get("customCollectionGenerators");
        const isGeneratorUsingCustomCollection = customCollection &&
            (customCollectionGenerators || []).includes(generatorName.toString());
        return isGeneratorUsingCustomCollection
            ? customCollection
            : "@srleecode/domain";
    }
    return "";
};
const getPositional = (generatorName, commandType, collection, commandTriggerContext) => {
    switch (commandType) {
        case command_1.Command.generate:
            return `${collection}:${generatorName.toString()}`;
        case command_1.Command.run:
            const positional = `${commandTriggerContext.dasherizedGroupingFolderPath}:${generatorName.toString()}`;
            return generatorName === generator_name_1.GeneratorName.e2e
                ? `e2e-${positional}`
                : positional;
        default:
            return "";
    }
};
//# sourceMappingURL=get-task-execution-schema.js.map