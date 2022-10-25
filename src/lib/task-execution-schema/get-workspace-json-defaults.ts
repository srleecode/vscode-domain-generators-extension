import { readFileSync } from "fs";
import { GeneratorName } from "../model/generator-name";
import { getWorkspaceJson } from "./get-workspace-json";

export const getWorkspaceJsonDefaults = (
  collection: string,
  generatorName: GeneratorName,
  workspaceJsonPath: string
): {
  [name: string]: any;
} => {
  const workspaceJson = getWorkspaceJson(workspaceJsonPath);

  let defaults = workspaceJson.generators;

  if (!defaults) {
    try {
      /**
       * This could potentially fail if we're in an Angular CLI project without schematics being part of angular.json
       * Default the default to {} on the catch
       */
      defaults = workspaceJson.generators || {};
    } catch (e) {
      defaults = {};
    }
  }

  const collectionDefaults = Object.keys(defaults).reduce(
    (collectionDefaultsMap: any, key) => {
      if (key.includes(":")) {
        const [collectionName, generatorName] = key.split(":");
        if (!collectionDefaultsMap[collectionName]) {
          collectionDefaultsMap[collectionName] = {};
        }
        collectionDefaultsMap[collectionName][generatorName] = defaults?.[key];
      } else {
        const collectionName = key;
        if (!collectionDefaultsMap[collectionName]) {
          collectionDefaultsMap[collectionName] = {};
        }
        Object.keys(defaults?.[collectionName] ?? {}).forEach(
          (generatorName) => {
            collectionDefaultsMap[collectionName][generatorName] =
              defaults?.[collectionName][generatorName];
          }
        );
      }
      return collectionDefaultsMap;
    },
    {}
  );
  if (collectionDefaults[collection]) {
    return collectionDefaults[collection];
  } else if (collectionDefaults[collection]?.[generatorName]) {
    return collectionDefaults[collection][generatorName];
  }
  return {};
};
