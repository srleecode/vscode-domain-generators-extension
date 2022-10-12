import { CommandTriggerContext } from "../get-command-trigger-context";

export const getDefaultValue = (
  optionName: string,
  schemaOptionDefault: any,
  commandTriggerContext: CommandTriggerContext
): any => {
  if (
    optionName === "groupingFolder" ||
    optionName === "libraryFolder" ||
    optionName === "componentLibraryPath"
  ) {
    return commandTriggerContext.groupingFolder;
  } else if (optionName === "projectName") {
    return commandTriggerContext.dasherizedGroupingFolderPath;
  }
  return schemaOptionDefault;
};
