"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskExecutionSchema = void 0;
const command_1 = require("./model/command");
const schema_utils_1 = require("./schema-utils");
const x_prompt_model_1 = require("./model/x-prompt.model");
const get_enum_tooltips_1 = require("./get-enum-tooltips");
const getTaskExecutionSchema = (generatorName, commandType) => {
    const name = generatorName.toString();
    const cliName = "ng";
    const collection = commandType === command_1.Command.generate ? "@srleecode/domain" : "";
    const schemaJson = (0, schema_utils_1.getSchemaJson)(commandType, name, collection);
    return {
        name,
        collection,
        options: getOptions(schemaJson),
        description: schemaJson.description,
        command: command_1.Command.generate.toString(),
        positional: `${collection}:${name}`,
        cliName,
        contextValues: undefined,
    };
};
exports.getTaskExecutionSchema = getTaskExecutionSchema;
const getOptions = (schema) => Object.keys(schema.properties).map((key) => {
    const option = Object.assign({ name: key }, schema.properties[key]);
    delete option.items;
    const xPrompt = option["x-prompt"];
    const defaultValue = schema.properties[key].default;
    option.required = schema.required.includes(key);
    if (option.enum) {
        option.items = option.enum.map((item) => item.toString());
    }
    if (xPrompt) {
        option.tooltip = (0, x_prompt_model_1.isLongFormXPrompt)(xPrompt) ? xPrompt.message : xPrompt;
        option.itemTooltips = (0, get_enum_tooltips_1.getEnumTooltips)(xPrompt);
        if ((0, x_prompt_model_1.isLongFormXPrompt)(xPrompt) && !option.items) {
            const items = (xPrompt.items || []).map((item) => (0, x_prompt_model_1.isOptionItemLabelValue)(item) ? item.value : item);
            if (items.length > 0) {
                option.items = items;
            }
        }
    }
    if (defaultValue) {
        option.default = defaultValue;
    }
    return option;
});
//# sourceMappingURL=get-task-execution-schema.js.map