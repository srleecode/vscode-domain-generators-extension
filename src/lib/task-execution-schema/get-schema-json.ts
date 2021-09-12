import { readFileSync, existsSync } from "fs";
import { showError } from "../error-utils";
import { getSchemaPath } from "./get-schema-path";
import { Command } from "../model/command";
import { GeneratorName } from "../model/generator-name";

export const getSchemaJson = (
  command: Command,
  generatorName: GeneratorName,
  collection: string
) => {
  const schematicJsonFilePath = getSchemaPath(generatorName);
  if (!schematicJsonFilePath) {
    let error = `Unable to find schema for ${command} ${collection}:${generatorName}`;
    if (collection === "@srleecode/domain") {
      error += ` Please ensure that you have the latest version of @srleecode/domain installed`;
    } else {
      error += ` Please ensure that you have installed ${collection}`;
    }
    showError(error);
  } else if (!existsSync(schematicJsonFilePath)) {
    showError(`${schematicJsonFilePath} does not exist`);
  }
  const schematicJsonFile = readFileSync(schematicJsonFilePath);
  return JSON.parse(schematicJsonFile.toString());
};
