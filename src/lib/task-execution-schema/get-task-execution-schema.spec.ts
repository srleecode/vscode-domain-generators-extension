jest.mock(
  "vscode",
  () => ({
    workspace: {
      workspaceFolders: [
        {
          uri: {
            path: "/c:/Users/Default.SCOTT-PC/Documents/GitHub/domain-example",
          },
        },
      ],
      getConfiguration: () => ({
        get: () => "",
      }),
    },
  }),
  { virtual: true }
);
import * as vscodeMock from "vscode";
import { GeneratorName } from "../model/generator-name";
import { Command } from "../model/command";
import { getTaskExecutionSchema } from "./get-task-execution-schema";
import { TaskExecutionSchema } from "../nx-console/task-execution-schema";
import * as getSchemaJsonMock from "./get-schema-json";
import { schemaMock } from "../model/schema-mock";
import { ItemTooltips } from "../model/item-tooltips.model";
import { CommandTriggerContext } from "../get-command-trigger-context";
import * as getWorkspaceJsonMock from "./get-workspace-json";

describe("getSchematicTaskExecutionSchema", () => {
  let schema: TaskExecutionSchema;
  const customCollection = "@custom-collection/domain";
  let commandTriggerContext: CommandTriggerContext = {
    groupingFolder: "libs/ng-second-test-app",
    dasherizedGroupingFolderPath: "ng-second-test-app",
  };
  const getSelectedOption = (options: any[] | undefined, optionName: string) =>
    (options || []).filter((option) => option.name === optionName)[0];

  beforeAll(() => {
    jest
      .spyOn(getSchemaJsonMock, "getSchemaJson")
      .mockReturnValue(schemaMock as any);
    const angularJson = {
      ["generators"]: {
        "@srleecode/domain": {
          [GeneratorName.ngComponent.toString()]: {
            style: "css",
          },
        },
        [customCollection]: {
          [GeneratorName.ngComponent.toString()]: {
            style: "less",
          },
        },
      },
    };
    jest
      .spyOn(getWorkspaceJsonMock, "getWorkspaceJson")
      .mockReturnValue(angularJson);
    schema = getTaskExecutionSchema(
      GeneratorName.appGroupingFolder,
      Command.generate,
      commandTriggerContext,
      "workspace.json"
    );
  });

  it("should set cliName to nx when there is a workspace.json", () => {
    expect(schema?.cliName).toBe("nx");
  });
  it("should set collection to @srleecode/domain", () => {
    expect(schema?.collection).toBe("@srleecode/domain");
  });
  it("should set command to generate", () => {
    expect(schema?.command).toBe("generate");
  });
  it("should set items when schema option has enum values", () => {
    expect(getSelectedOption(schema?.options, "uiFramework").items).toEqual([
      "@storybook/angular",
      "@storybook/react",
    ]);
  });
  describe("xPrompt", () => {
    it("should set tooltip when option has short form xPrompt", async () => {
      expect(getSelectedOption(schema?.options, "application").tooltip).toBe(
        schemaMock.properties.application["x-prompt"]
      );
    });

    it("should set tooltip when option has long form xPrompt", async () => {
      expect(getSelectedOption(schema?.options, "libraries").tooltip).toBe(
        schemaMock.properties.libraries["x-prompt"].message
      );
    });

    it("should set enumTooltips when x-prompt has items and labels", async () => {
      const tooltips: ItemTooltips = {};
      schemaMock.properties.libraries["x-prompt"].items.forEach(
        (item) => (tooltips[item.value] = item.label)
      );
      expect(
        getSelectedOption(schema?.options, "libraries").itemTooltips
      ).toEqual(tooltips);
    });
    it("should set items from xPrompt items with label and value when enum is not provided", async () => {
      const xPromptValues = schemaMock.properties.style["x-prompt"].items.map(
        (item) => item.value
      );
      expect(getSelectedOption(schema?.options, "style").items).toEqual(
        xPromptValues
      );
    });
    it("should use given items when option has items property", async () => {
      expect(getSelectedOption(schema?.options, "libraries").items).toEqual(
        schemaMock.properties.libraries.items.enum
      );
    });
  });
  describe("default value", () => {
    it("should override grouping folder with command trigger context grouping folder", () => {
      expect(getSelectedOption(schema?.options, "groupingFolder").default).toBe(
        "libs/ng-second-test-app"
      );
    });
    it("should override library folder with command trigger context grouping folder", () => {
      expect(getSelectedOption(schema?.options, "libraryFolder").default).toBe(
        "libs/ng-second-test-app"
      );
    });
    it("should override projectName with dasherized version of the command trigger context grouping folder", () => {
      expect(getSelectedOption(schema?.options, "projectName").default).toBe(
        "ng-second-test-app"
      );
    });
  });

  describe("run", () => {
    it("should get correct run lint schema", () => {
      schema = getTaskExecutionSchema(
        GeneratorName.lint,
        Command.run,
        {
          groupingFolder:
            "libs/ng-second-test-app/test-domain/feature-test-example",
          dasherizedGroupingFolderPath:
            "ng-second-test-app-test-domain-feature-test-example",
        },
        "workspace.json"
      );
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("lint");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:lint"
      );
    });
    it("should get correct run test schema", () => {
      schema = getTaskExecutionSchema(
        GeneratorName.test,
        Command.run,
        {
          groupingFolder:
            "libs/ng-second-test-app/test-domain/feature-test-example",
          dasherizedGroupingFolderPath:
            "ng-second-test-app-test-domain-feature-test-example",
        },
        "workspace.json"
      );
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("test");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:test"
      );
    });
    it("should get correct run ct schema", () => {
      schema = getTaskExecutionSchema(
        GeneratorName.ct,
        Command.run,
        {
          groupingFolder:
            "libs/ng-second-test-app/test-domain/feature-test-example",
          dasherizedGroupingFolderPath:
            "ng-second-test-app-test-domain-feature-test-example",
        },
        "workspace.json"
      );
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("ct");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:ct"
      );
    });
    it("should get correct run e2e schema", () => {
      schema = getTaskExecutionSchema(
        GeneratorName.e2e,
        Command.run,
        {
          groupingFolder: "libs/ng-second-test-app/test-domain",
          dasherizedGroupingFolderPath: "ng-second-test-app-test-domain",
        },
        "workspace.json"
      );
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("e2e");
      expect(schema.positional).toBe("e2e-ng-second-test-app-test-domain:e2e");
    });
    describe("custom collection", () => {
      beforeAll(() => {
        const mock = jest
          .spyOn(vscodeMock.workspace, "getConfiguration")
          .mockReturnValue({
            get: (type: string) => {
              if (type === "customCollection") {
                return customCollection;
              }
              if (type === "customCollectionGenerators") {
                return [GeneratorName.ngComponent];
              }
            },
          } as any);
        schema = getTaskExecutionSchema(
          GeneratorName.ngComponent,
          Command.generate,
          {
            groupingFolder: "libs/ng-second-test-app/test-domain",
            dasherizedGroupingFolderPath: "ng-second-test-app-test-domain",
          },
          "workspace.json"
        );
        mock.mockReset();
      });
      it("should use custom collection when it is set in the extension settings and generator is used", () => {
        expect(schema.collection).toBe(customCollection);
      });
      it("should override default using value from workspace json", () => {
        expect(getSelectedOption(schema?.options, "style").default).toEqual(
          "less"
        );
      });
    });
  });
});
