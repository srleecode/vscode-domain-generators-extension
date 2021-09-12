"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchematicTaskExecutionSchema = void 0;
const command_1 = require("./model/command");
const schema_utils_1 = require("./schema-utils");
const getSchematicTaskExecutionSchema = (generatorName, commandType) => {
    const name = generatorName.toString();
    const cliName = "ng";
    const collection = commandType === command_1.Command.generate ? "@srleecode/domain" : "";
    const schematicJson = (0, schema_utils_1.getSchemaJson)(commandType, name, collection);
    return {
        name,
        collection,
        options: schematicJson.properties,
        description: schematicJson.description,
        command: command_1.Command.generate.toString(),
        positional: `${collection}:${name}`,
        cliName,
        contextValues: undefined,
    };
};
exports.getSchematicTaskExecutionSchema = getSchematicTaskExecutionSchema;
//# sourceMappingURL=get-schematic-task-execution-schema.js.map