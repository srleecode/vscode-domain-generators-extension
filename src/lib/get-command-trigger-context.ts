import { Uri, workspace } from "vscode";

export interface CommandTriggerContext {
  groupingFolder: string;
  dasherizedGroupingFolderPath: string;
}

export const getCommandTriggerContext = (
  triggeredFromUri: Uri
): CommandTriggerContext => {
  const rootPath = (workspace.workspaceFolders || [])[0]?.uri?.path;
  const groupingFolder = triggeredFromUri.path.replace(`${rootPath}/`, "");
  return {
    groupingFolder,
    dasherizedGroupingFolderPath: groupingFolder
      .replace("libs/", "")
      .replace("/.e2e", "")
      .replace("/.ct", "")
      .replace(/\//g, "-"),
  };
};
