import {
  commands,
  RelativePattern,
  Uri,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { dirname, normalize, relative, basename } from "path";
import { writeFile } from "fs/promises";
import { BarrelType } from "./model/barrel-type.enum";

const getFiles = (
  directoryToSearch: string,
  type: BarrelType,
  relativePattern: RelativePattern
) =>
  workspace.findFiles(relativePattern, null, 50).then((uris: Uri[]) =>
    uris
      .map((uri: Uri) =>
        normalize(uri.path)
          .replace(directoryToSearch, "")
          .replace(/\\/g, "/")
          .replace(".ts", "")
      )
      .map((path: string) => (path.startsWith("/") ? path.substring(1) : path))
      .filter(
        (file) =>
          !file.endsWith(".spec") &&
          (type === BarrelType.Testing || !file.includes("mocks/"))
      )
      .sort()
  );

const getExportBase = (type: BarrelType): string =>
  type === BarrelType.Index
    ? `export * from './lib`
    : `export * from './lib/mocks`;

export const updateBarrelFile = (uri: Uri) => {
  const type = uri.path.endsWith("index.ts")
    ? BarrelType.Index
    : BarrelType.Testing;
  let workspaceFolder: WorkspaceFolder | undefined =
    workspace.getWorkspaceFolder(uri);
  if (!workspaceFolder) {
    return undefined;
  }
  let workspaceFolderPath: string = workspaceFolder.uri.path;
  const directory = normalize(dirname(uri.path));
  let directoryToSearch = directory + normalize("/lib");
  if (type === BarrelType.Testing) {
    directoryToSearch += normalize("/mocks");
  }
  const relativeDirectory = relative(workspaceFolderPath, directoryToSearch);
  let relativePattern: RelativePattern = new RelativePattern(
    workspaceFolderPath,
    relativeDirectory + normalize("/**/*.ts")
  );
  return getFiles(directoryToSearch, type, relativePattern).then((files) =>
    writeFile(
      uri.fsPath,
      files.map((file) => `${getExportBase(type)}/${file}';`).join("\n")
    )
  );
};
