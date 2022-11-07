"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaPath = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const generator_name_1 = require("../model/generator-name");
const getSchemaPath = (generatorName) => {
    const rootPath = getWorkspaceRootPath();
    let schemaPath = getSchemaRelativePath(generatorName);
    return (0, path_1.join)(rootPath, schemaPath);
};
exports.getSchemaPath = getSchemaPath;
const getSchemaRelativePath = (generatorName) => {
    switch (generatorName) {
        case generator_name_1.GeneratorName.appGroupingFolder:
            return "node_modules/@srleecode/domain/generators/grouping-folder/create-app/src/schema.json";
        case generator_name_1.GeneratorName.domainGroupingFolder:
            return "node_modules/@srleecode/domain/generators/grouping-folder/create-domain/src/schema.json";
        case generator_name_1.GeneratorName.domainTest:
            return "node_modules/@srleecode/domain/generators/cypress/domain-test/src/schema.json";
        case generator_name_1.GeneratorName.mockFile:
            return "node_modules/@srleecode/domain/generators/mock-file/src/schema.json";
        case generator_name_1.GeneratorName.moveGroupingFolder:
            return "node_modules/@srleecode/domain/generators/grouping-folder/move/src/schema.json";
        case generator_name_1.GeneratorName.removeGroupingFolder:
            return "node_modules/@srleecode/domain/generators/grouping-folder/remove/src/schema.json";
        case generator_name_1.GeneratorName.ngApplicationLayer:
            return "node_modules/@srleecode/domain/generators/front-end/angular/application-layer/src/schema.json";
        case generator_name_1.GeneratorName.ngComponent:
            return "node_modules/@srleecode/domain/generators/front-end/angular/component/src/schema.json";
        case generator_name_1.GeneratorName.ngComponentGlobalStyles:
            return "node_modules/@srleecode/domain/generators/front-end/angular/component-global-styles/src/schema.json";
        case generator_name_1.GeneratorName.ngDataAccessLayer:
            return "node_modules/@srleecode/domain/generators/front-end/angular/data-access-layer/src/schema.json";
        case generator_name_1.GeneratorName.ngDirective:
            return "node_modules/@srleecode/domain/generators/front-end/angular/directive/src/schema.json";
        case generator_name_1.GeneratorName.ngDomainLayer:
            return "node_modules/@srleecode/domain/generators/front-end/angular/domain-layer/src/schema.json";
        case generator_name_1.GeneratorName.ngRemoveLibrary:
            return "node_modules/@srleecode/domain/generators/front-end/angular/remove-library/src/schema.json";
        case generator_name_1.GeneratorName.ngUtilLayer:
            return "node_modules/@srleecode/domain/generators/front-end/angular/util-layer/src/schema.json";
        case generator_name_1.GeneratorName.lint:
            return "node_modules/@nrwl/linter/src/executors/eslint/schema.json";
        case generator_name_1.GeneratorName.test:
            return "node_modules/@nrwl/jest/src/executors/jest/schema.json";
        case generator_name_1.GeneratorName.ct:
        case generator_name_1.GeneratorName.e2e:
            return "node_modules/@nrwl/cypress/src/executors/cypress/schema.json";
        default:
            return "";
    }
};
const getWorkspaceRootPath = () => { var _a, _b; return (_b = (_a = (vscode_1.workspace.workspaceFolders || [])[0]) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.fsPath; };
//# sourceMappingURL=get-schema-path.js.map