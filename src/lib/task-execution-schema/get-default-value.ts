import { CommandTriggerContext } from "../get-command-trigger-context";
import { ExtensionConfiguration } from "../model/extension-configuration";
import { GeneratorName } from "../model/generator-name";

export const getDefaultValue = (
  optionName: string,
  schemaOptionDefault: any,
  commandTriggerContext: CommandTriggerContext,
  extensionConfiguration: ExtensionConfiguration,
  gemeratorName: GeneratorName
): any => {
  if (optionName === "groupingFolder" || optionName === "libraryFolder") {
    return commandTriggerContext.groupingFolder;
  } else if (optionName === "projectName") {
    return commandTriggerContext.dasherizedGroupingFolderPath;
  } else if (
    gemeratorName === GeneratorName.ct &&
    optionName === "testingType"
  ) {
    return "component";
  } else if (optionName === "mockFileName") {
    return "mock";
  }
  if ((extensionConfiguration as any)[optionName]) {
    return (extensionConfiguration as any)[optionName];
  }
  return schemaOptionDefault;
};
