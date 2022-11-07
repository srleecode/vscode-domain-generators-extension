"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const x_prompt_model_1 = require("../model/x-prompt.model");
const get_default_value_1 = require("./get-default-value");
const get_enum_tooltips_1 = require("./get-enum-tooltips");
const get_workspace_json_defaults_1 = require("./get-workspace-json-defaults");
const getOptions = (schema, commandTriggerContext, collection, generatorName, workspaceJsonPath) => {
    const workspaceJsonDefaults = (0, get_workspace_json_defaults_1.getWorkspaceJsonDefaults)(collection, generatorName, workspaceJsonPath);
    return Object.keys(schema.properties).map((key) => {
        const schemaProperty = schema.properties[key];
        const option = Object.assign({ name: key }, schemaProperty);
        delete option.items;
        const xPrompt = schemaProperty["x-prompt"];
        const defaultValue = (0, get_default_value_1.getDefaultValue)(key, schemaProperty.default, commandTriggerContext, workspaceJsonDefaults[generatorName.toString()]);
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
};
exports.getOptions = getOptions;
//# sourceMappingURL=get-options.js.map