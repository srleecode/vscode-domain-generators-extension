import { CommandTriggerContext } from "../get-command-trigger-context";
import { SchemaJson } from "../model/schema-json";
import {
  XPrompt,
  isLongFormXPrompt,
  isOptionItemLabelValue,
} from "../model/x-prompt.model";
import { getDefaultValue } from "./get-default-value";
import { getEnumTooltips } from "./get-enum-tooltips";
import { getWorkspaceJsonDefaults } from "./get-workspace-json-defaults";
import { GeneratorName } from "../model/generator-name";
import { Option } from "../nx-console/task-execution-schema";

export const getOptions = (
  schema: SchemaJson,
  commandTriggerContext: CommandTriggerContext,
  collection: string,
  generatorName: GeneratorName,
  workspaceJsonPath: string
): Option[] => {
  const workspaceJsonDefaults = getWorkspaceJsonDefaults(
    collection,
    generatorName,
    workspaceJsonPath
  );

  return Object.keys(schema.properties).map((key): Option => {
    const schemaProperty = schema.properties[key];
    const option: Option = {
      name: key,
      originalName: key,
      aliases: schemaProperty.alias ? [schemaProperty.alias] : [],
      ...schemaProperty,
    };
    delete option.items;
    const xPrompt: XPrompt = schemaProperty["x-prompt"];
    const defaultValue = getDefaultValue(
      key,
      schemaProperty.default,
      commandTriggerContext,
      workspaceJsonDefaults[generatorName.toString()]
    );
    option.isRequired = schema.required.includes(key);
    if (option.enum) {
      option.items = option.enum.map((item: any) => item.toString());
    }
    if (xPrompt) {
      option.tooltip = isLongFormXPrompt(xPrompt) ? xPrompt.message : xPrompt;
      option.itemTooltips = getEnumTooltips(xPrompt);
      if (isLongFormXPrompt(xPrompt) && !option.items) {
        const items = (xPrompt.items || []).map((item) =>
          isOptionItemLabelValue(item) ? item.value : item
        );
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
