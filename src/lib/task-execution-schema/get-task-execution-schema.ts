import { TaskExecutionSchema } from "../nx-console/task-execution-schema";
import { Command } from "../model/command";
import { GeneratorName } from "../model/generator-name";
import { getSchemaJson } from "./get-schema-json";
import { getOptions } from "./get-options";
import { CommandTriggerContext } from "../get-command-trigger-context";

export const getTaskExecutionSchema = (
  generatorName: GeneratorName,
  commandType: Command,
  commandTriggerContext: CommandTriggerContext
): TaskExecutionSchema => {
  const name = generatorName.toString();
  const cliName = "nx";
  const collection =
    commandType === Command.generate ? "@srleecode/domain" : "";
  const schemaJson = getSchemaJson(commandType, generatorName, collection);
  return {
    name,
    collection,
    options: getOptions(schemaJson, commandTriggerContext, generatorName),
    description: schemaJson.description,
    command: commandType.toString(),
    positional: getPositional(
      generatorName,
      commandType,
      collection,
      commandTriggerContext
    ),
    cliName,
    contextValues: undefined,
  };
};

const getPositional = (
  generatorName: GeneratorName,
  commandType: Command,
  collection: string,
  commandTriggerContext: CommandTriggerContext
): string => {
  switch (commandType) {
    case Command.generate:
      return `${collection}:${generatorName.toString()}`;
    case Command.run:
      const positional = `${
        commandTriggerContext.dasherizedGroupingFolderPath
      }:${generatorName.toString()}`;
      return generatorName === GeneratorName.e2e
        ? `e2e-${positional}`
        : positional;
    default:
      return "";
  }
};
