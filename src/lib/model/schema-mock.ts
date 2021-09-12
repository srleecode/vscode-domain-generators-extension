export const schemaMock = {
  $schema: "http://json-schema.org/draft-07/schema",
  id: "create",
  title: "Create",
  type: "object",
  properties: {
    groupingFolder: {
      description: "The app grouping folder that the domain will be created in",
      type: "string",
    },
    application: {
      type: "string",
      description: "Application that the new domain libraries will belong to",
      alias: "a",
      "x-prompt": "What application will the new domain libraries be under?",
    },
    libraryFolder: {
      type: "string",
    },
    mockFileName: {
      type: "string",
    },
    projectName: {
      type: "string",
    },
    libraries: {
      description: "The library types that will be generated",
      alias: "l",
      minItems: 1,
      items: {
        enum: ["data-access", "feature", "shell", "ui", "util"],
        type: "string",
      },
      default: ["data-access", "feature", "shell", "ui", "util"],
      "x-prompt": {
        message: "Which library types do you want to generate?",
        type: "list",
        multiselect: true,
        items: [
          {
            value: "data-access",
            label: "data-access - for state management and services",
          },
          {
            value: "feature",
            label: "feature - for smart components (containers)",
          },
          {
            value: "shell",
            label:
              "shell - for wrapping different libraries and exposing them as a single library. Also, for routing.",
          },
          {
            value: "ui",
            label: "ui - for dumb components",
          },
          {
            value: "util",
            label:
              "util - for model files, constants, validators, pipes and any other miscellaneous items, e.g. shared functions.",
          },
        ],
      },
    },
    style: {
      description: "The file extension to be used for style files.",
      type: "string",
      default: "scss",
      alias: "s",
      "x-prompt": {
        message: "Which stylesheet format would you like to use?",
        type: "list",
        items: [
          { value: "css", label: "CSS" },
          {
            value: "scss",
            label: "SASS(.scss) [http://sass-lang.com]",
          },
          {
            value: "less",
            label: "LESS        [http://lesscss.org]",
          },
        ],
      },
    },
    uiFramework: {
      type: "string",
      default: "@storybook/angular",
      description: "Storybook UI Framework to use",
      enum: ["@storybook/angular", "@storybook/react"],
      "x-prompt": "What UI framework plugin should storybook use?",
    },
  },
  required: ["domain"],
};
