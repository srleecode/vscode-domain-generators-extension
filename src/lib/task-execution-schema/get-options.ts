import { CommandTriggerContext } from "../get-command-trigger-context";
import { SchemaJson } from "../model/schema-json";
import { Option } from "../model/option";
import {
  XPrompt,
  isLongFormXPrompt,
  isOptionItemLabelValue,
} from "../model/x-prompt.model";
import { getDefaultValue } from "./get-default-value";
import { getEnumTooltips } from "./get-enum-tooltips";

export const getOptions = (
  schema: SchemaJson,
  commandTriggerContext: CommandTriggerContext
): Option[] => {
  return Object.keys(schema.properties).map((key): Option => {
    const schemaProperty = schema.properties[key];
    const option: Option = {
      name: key,
      ...schemaProperty,
    };
    delete option.items;
    const xPrompt: XPrompt = schemaProperty["x-prompt"];
    const defaultValue = getDefaultValue(
      key,
      schemaProperty.default,
      commandTriggerContext
    );
    option.required = schema.required.includes(key);
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
