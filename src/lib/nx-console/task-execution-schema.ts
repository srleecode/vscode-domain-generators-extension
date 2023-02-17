export interface TaskExecutionSchema {
  name: string;
  command: string;
  collection?: string;
  positional: string;
  cliName: "nx";
  builder?: string;
  description: string;
  configurations?: TargetConfiguration[];
  options: Option[];
  contextValues?: {
    path?: string;
    directory?: string;
    project?: string;
    projectName?: string;
  };
}

export interface Option extends CliOption {
  type?: string | string[];
  description: string;
  tooltip?: string;
  itemTooltips?: ItemTooltips;
  items?: string[] | ItemsWithEnum;
  aliases: string[];
  isRequired: boolean;
  "x-dropdown"?: "projects";
  "x-priority"?: "important" | "internal";
  required?: string[];
  enum?: string[];
  properties?: any;
  alias?: string;
  format?: string;
  visible?: boolean;
  default?:
    | string
    | number
    | boolean
    | string[]
    | {
        [key: string]: string | number | boolean | string[];
      };
  $ref?: string;
  $default?:
    | {
        $source: "argv";
        index: number;
      }
    | {
        $source: "projectName";
      }
    | {
        $source: "unparsed";
      };
  additionalProperties?: boolean;
  "x-prompt"?:
    | string
    | {
        message: string;
        type: string;
        items?: any[];
        multiselect?: boolean;
      };
  "x-deprecated"?: boolean | string;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export interface DefaultValue {
  name: string;
  defaultValue: string | undefined;
}

export interface TargetConfiguration {
  name: string;
  defaultValues: DefaultValue[];
}

export enum OptionType {
  Any = "any",
  Array = "array",
  Boolean = "boolean",
  Number = "number",
  String = "string",
}

export type CliOption = {
  name: string;
  originalName?: string;
  positional?: number;
  alias?: string;
  hidden?: boolean;
  deprecated?: boolean | string;
};
export interface ItemTooltips {
  [itemValue: string]: string;
}

export interface ItemsWithEnum {
  enum: string[];
  type: OptionType;
}
