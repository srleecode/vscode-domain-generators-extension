"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMock = void 0;
exports.schemaMock = {
    $schema: "http://json-schema.org/draft-07/schema",
    id: "create",
    title: "Create",
    type: "object",
    properties: {
        application: {
            type: "string",
            description: "Application that the new domain libraries will belong to",
            alias: "a",
            "x-prompt": "What application will the new domain libraries be under?",
        },
        domain: {
            type: "string",
            description: "Name of the domain. Format is parent-domain/child-domain for child domains and domain/shared for parent domains.",
            alias: "d",
            "x-prompt": "What is the name of the domain? Use parent-domain/child-domain format for a child domain. Use domain/shared format for parent domains.",
        },
        prefix: {
            type: "string",
            description: "The prefix to apply to generated selectors.",
            alias: "p",
            oneOf: [
                {
                    maxLength: 0,
                },
                {
                    minLength: 1,
                    format: "html-selector",
                },
            ],
            "x-prompt": "What is the prefix to apply to generated selectors?",
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
                        label: "shell - for wrapping different libraries and exposing them as a single library. Also, for routing.",
                    },
                    {
                        value: "ui",
                        label: "ui - for dumb components",
                    },
                    {
                        value: "util",
                        label: "util - for model files, constants, validators, pipes and any other miscellaneous items, e.g. shared functions.",
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
        addJestJunitReporter: {
            description: "Add jest junit reporter setup",
            type: "boolean",
            default: false,
            "x-prompt": "Configure jest junit reporter?",
        },
        addE2EProject: {
            description: "Add a e2e cypress project",
            type: "boolean",
            default: false,
            "x-prompt": "Add a cypress e2e app?",
        },
        addStorybookProject: {
            description: "Add storybook project",
            type: "boolean",
            default: false,
            "x-prompt": "Add a storybook app?",
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
//# sourceMappingURL=schema-mock.const.js.map