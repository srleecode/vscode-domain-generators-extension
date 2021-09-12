import { join } from "path";
import { workspace } from "vscode";
import { GeneratorName } from "../model/generator-name";

export const getSchemaPath = (generatorName: GeneratorName): string => {
  const rootPath = getWorkspaceRootPath();
  let schemaPath = getSchemaRelativePath(generatorName);
  return join(rootPath, schemaPath);
};

const getSchemaRelativePath = (generatorName: GeneratorName): string => {
  switch (generatorName) {
    case GeneratorName.appGroupingFolder:
      return "node_modules/@srleecode/domain/generators/grouping-folder/create-app/src/schema.json";
    case GeneratorName.domainGroupingFolder:
      return "node_modules/@srleecode/domain/generators/grouping-folder/create-domain/src/schema.json";
    case GeneratorName.domainTest:
      return "node_modules/@srleecode/domain/generators/cypress/domain-test/src/schema.json";
    case GeneratorName.mockFile:
      return "node_modules/@srleecode/domain/generators/mock-file/src/schema.json";
    case GeneratorName.moveGroupingFolder:
      return "node_modules/@srleecode/domain/generators/grouping-folder/move/src/schema.json";
    case GeneratorName.removeGroupingFolder:
      return "node_modules/@srleecode/domain/generators/grouping-folder/remove/src/schema.json";
    case GeneratorName.ngApplicationLayer:
      return "node_modules/@srleecode/domain/generators/front-end/angular/application-layer/src/schema.json";
    case GeneratorName.ngComponent:
      return "node_modules/@srleecode/domain/generators/front-end/angular/component/src/schema.json";
    case GeneratorName.ngDataAccessLayer:
      return "node_modules/@srleecode/domain/generators/front-end/angular/data-access-layer/src/schema.json";
    case GeneratorName.ngDirective:
      return "node_modules/@srleecode/domain/generators/front-end/angular/directive/src/schema.json";
    case GeneratorName.ngDomainLayer:
      return "node_modules/@srleecode/domain/generators/front-end/angular/domain-layer/src/schema.json";
    case GeneratorName.ngRemoveLibrary:
      return "node_modules/@srleecode/domain/generators/front-end/angular/remove-library/src/schema.json";
    case GeneratorName.ngUtilLayer:
      return "node_modules/@srleecode/domain/generators/front-end/angular/util-layer/src/schema.json";
    case GeneratorName.lint:
      return "node_modules/@nrwl/linter/src/executors/eslint/schema.json";
    case GeneratorName.test:
      return "node_modules/@nrwl/jest/src/executors/jest/schema.json";
    case GeneratorName.ct:
    case GeneratorName.e2e:
      return "node_modules/@nrwl/cypress/src/executors/cypress/schema.json";
    default:
      return "";
  }
};

const getWorkspaceRootPath = (): string =>
  (workspace.workspaceFolders || [])[0]?.uri?.fsPath;
