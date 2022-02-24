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
    },
  }),
  { virtual: true }
);
import { GeneratorName } from "../model/generator-name";
import { Command } from "../model/command";
import { getTaskExecutionSchema } from "./get-task-execution-schema";
import { TaskExecutionSchema } from "../nx-console/task-execution-schema";
import * as getSchemaJsonMock from "./get-schema-json";
import { schemaMock } from "../model/schema-mock";
import { ItemTooltips } from "../model/item-tooltips.model";
import { CommandTriggerContext } from "../get-command-trigger-context";
import * as extensionConfig from "./get-extension-configuration";
import { ExtensionConfiguration } from "../model/extension-configuration";
describe("getSchematicTaskExecutionSchema", () => {
  let schema: TaskExecutionSchema;
  let commandTriggerContext: CommandTriggerContext = {
    groupingFolder: "libs/ng-second-test-app",
    dasherizedGroupingFolderPath: "ng-second-test-app",
  };
  const extensionConfiguration: ExtensionConfiguration = {
    style: "scss",
    collection: "@srleecode/domain",
    unitTestType: "noTest",
    buildable: true,
    enableIvy: true,
    strict: true,
    publishable: false,
  };
  const getSelectedOption = (options: any[] | undefined, optionName: string) =>
    (options || []).filter((option) => option.name === optionName)[0];

  beforeAll(() => {
    jest
      .spyOn(getSchemaJsonMock, "getSchemaJson")
      .mockReturnValue(schemaMock as any);
    jest
      .spyOn(extensionConfig, "getExtensionConfiguration")
      .mockReturnValue(extensionConfiguration);
    schema = getTaskExecutionSchema(
      GeneratorName.appGroupingFolder,
      Command.generate,
      commandTriggerContext
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
  it("should set cliName to ng when workspace.json is not found", () => {
    expect(schema?.cliName).toBe("nx");
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
    it("should override mockFileName with mock", () => {
      expect(getSelectedOption(schema?.options, "mockFileName").default).toBe(
        "mock"
      );
    });
    it("should override •	projectName with dasherized version of the command trigger context grouping folder", () => {
      expect(getSelectedOption(schema?.options, "projectName").default).toBe(
        "ng-second-test-app"
      );
    });
    it("should set default in from extension configuration", () => {
      expect(getSelectedOption(schema?.options, "style").default).toBe(
        extensionConfiguration.style
      );
    });
  });

  describe("run", () => {
    it("should get correct run lint schema", () => {
      schema = getTaskExecutionSchema(GeneratorName.lint, Command.run, {
        groupingFolder:
          "libs/ng-second-test-app/test-domain/feature-test-example",
        dasherizedGroupingFolderPath:
          "ng-second-test-app-test-domain-feature-test-example",
      });
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("lint");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:lint"
      );
    });
    it("should get correct run test schema", () => {
      schema = getTaskExecutionSchema(GeneratorName.test, Command.run, {
        groupingFolder:
          "libs/ng-second-test-app/test-domain/feature-test-example",
        dasherizedGroupingFolderPath:
          "ng-second-test-app-test-domain-feature-test-example",
      });
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("test");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:test"
      );
    });
    it("should get correct run ct schema", () => {
      schema = getTaskExecutionSchema(GeneratorName.ct, Command.run, {
        groupingFolder:
          "libs/ng-second-test-app/test-domain/feature-test-example",
        dasherizedGroupingFolderPath:
          "ng-second-test-app-test-domain-feature-test-example",
      });
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("ct");
      expect(schema.positional).toBe(
        "ng-second-test-app-test-domain-feature-test-example:ct"
      );
    });
    it("should get correct run e2e schema", () => {
      schema = getTaskExecutionSchema(GeneratorName.e2e, Command.run, {
        groupingFolder: "libs/ng-second-test-app/test-domain",
        dasherizedGroupingFolderPath: "ng-second-test-app-test-domain",
      });
      expect(schema.command).toBe("run");
      expect(schema.name).toBe("e2e");
      expect(schema.positional).toBe("e2e-ng-second-test-app-test-domain:e2e");
    });
  });
});
