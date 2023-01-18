jest.mock("vscode", () => {}, { virtual: true });
jest.mock(
  "vscode",
  () => ({
    workspace: {
      workspaceFolders: [
        {
          uri: {
            path: "test",
          },
        },
        {
          uri: {
            path: "/c:/Users/Default.SCOTT-PC/Documents/GitHub/domain-example",
          },
        },
      ],
    },
  }),
  { virtual: true }
);
import { getCommandTriggerContext } from "./get-command-trigger-context";

describe("getCommandTriggerContext", () => {
  it("should return grouping folder for given context path", () => {
    const command = getCommandTriggerContext({
      path: "/c:/Users/Default.SCOTT-PC/Documents/GitHub/domain-example/libs/application/domain",
    } as any);
    expect(command.groupingFolder).toBe("libs/application/domain");
  });
  it("should return dasherizedGroupingFolderPath for given context path", () => {
    const command = getCommandTriggerContext({
      path: "libs/application/domain",
      fsPath: "libs/application/domain",
    } as any);
    expect(command.dasherizedGroupingFolderPath).toBe("application-domain");
  });
});
