import { TaskExecutionSchema } from "../nx-console/task-execution-schema";
import { Command } from "../model/command";
import { GeneratorName } from "../model/generator-name";
import { getSchemaJson } from "./get-schema-json";
import { getOptions } from "./get-options";
import { CommandTriggerContext } from "../get-command-trigger-context";
import { workspace } from "vscode";

export const getTaskExecutionSchema = (
  generatorName: GeneratorName,
  commandType: Command,
  commandTriggerContext: CommandTriggerContext,
  workspaceJsonPath: string
): TaskExecutionSchema => {
  const name = generatorName.toString();
  const collection = getCollection(commandType, generatorName);
  const schemaJson = getSchemaJson(commandType, generatorName, collection);
  return {
    name,
    collection,
    options: getOptions(
      schemaJson,
      commandTriggerContext,
      collection,
      generatorName,
      workspaceJsonPath
    ),
    description: schemaJson.description,
    command: commandType.toString(),
    positional: getPositional(
      generatorName,
      commandType,
      collection,
      commandTriggerContext
    ),
    cliName: "nx",
    contextValues: undefined,
  };
};

const getCollection = (
  commandType: Command,
  generatorName: GeneratorName
): string => {
  if (commandType === Command.generate) {
    const workSpaceConfig = workspace.getConfiguration("domainGenerators");
    const customCollection = workSpaceConfig.get("customCollection") as string;
    const customCollectionGenerators = workSpaceConfig.get(
      "customCollectionGenerators"
    ) as string[];
    const isGeneratorUsingCustomCollection =
      customCollection &&
      (customCollectionGenerators || []).includes(generatorName.toString());
    return isGeneratorUsingCustomCollection
      ? customCollection
      : "@srleecode/domain";
  }
  return "";
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
