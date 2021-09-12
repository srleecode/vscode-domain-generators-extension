import { workspace, WorkspaceConfiguration } from "vscode";
import {
  ComponentConfiguration,
  DomainLibraryConfiguration,
  ExtensionConfiguration,
} from "../model/extension-configuration";

export const getExtensionConfiguration = (): ExtensionConfiguration => {
  const workSpaceConfig = workspace.getConfiguration("domainGenerators");
  const collection = workSpaceConfig.get("collection") as string;

  return {
    collection,
    ...getComponentOptions(workSpaceConfig),
    ...getDomainLibraryOptions(workSpaceConfig),
  };
};

const getDomainLibraryOptions = (
  workSpaceConfig: WorkspaceConfiguration
): DomainLibraryConfiguration => ({
  buildable: workSpaceConfig.get("buildable.enabled") as boolean,
  strict: workSpaceConfig.get("strict.enabled") as boolean,
  enableIvy: workSpaceConfig.get("enableIvy.enabled") as boolean,
  publishable: workSpaceConfig.get("publishable.enabled") as boolean,
});

const getComponentOptions = (
  workSpaceConfig: WorkspaceConfiguration
): ComponentConfiguration => ({
  mountType: workSpaceConfig.get("mountType") as "component" | "story",
  unitTestType: workSpaceConfig.get("unitTestType") as
    | "noTest"
    | "testBed"
    | "noTestBed",
  style: workSpaceConfig.get("style") as "scss" | "less" | "css",
  displayBlock: workSpaceConfig.get("displayBlock.enabled") as boolean,
});
