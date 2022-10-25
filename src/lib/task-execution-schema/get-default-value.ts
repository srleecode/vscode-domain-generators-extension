import { CommandTriggerContext } from "../get-command-trigger-context";

export const getDefaultValue = (
  optionName: string,
  schemaOptionDefault: any,
  commandTriggerContext: CommandTriggerContext,
  workspaceJsonDefaults: {
    [name: string]: string;
  }
): any => {
  if (workspaceJsonDefaults?.[optionName]) {
    return workspaceJsonDefaults[optionName];
  } else if (
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
