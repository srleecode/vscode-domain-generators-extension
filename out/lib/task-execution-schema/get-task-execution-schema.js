"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskExecutionSchema = void 0;
const command_1 = require("../model/command");
const generator_name_1 = require("../model/generator-name");
const get_schema_json_1 = require("./get-schema-json");
const get_options_1 = require("./get-options");
const getTaskExecutionSchema = (generatorName, commandType, commandTriggerContext) => {
    const name = generatorName.toString();
    const cliName = "nx";
    const collection = commandType === command_1.Command.generate ? "@srleecode/domain" : "";
    const schemaJson = (0, get_schema_json_1.getSchemaJson)(commandType, generatorName, collection);
    return {
        name,
        collection,
        options: (0, get_options_1.getOptions)(schemaJson, commandTriggerContext, generatorName),
        description: schemaJson.description,
        command: commandType.toString(),
        positional: getPositional(generatorName, commandType, collection, commandTriggerContext),
        cliName,
        contextValues: undefined,
    };
};
exports.getTaskExecutionSchema = getTaskExecutionSchema;
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