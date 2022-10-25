import { readFileSync } from "fs";

export const getWorkspaceJson = (workspaceJsonPath: string) =>
  JSON.parse(readFileSync(workspaceJsonPath).toString());
