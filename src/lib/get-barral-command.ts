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

export const getBarrelCommand = () =>
  commands.registerCommand("domain-generators.update-barrel", (uri: Uri) => {
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
    if (type === BarrelType.Testing) {
      relativeDirectory;
    }
    let relativePattern: RelativePattern = new RelativePattern(
      workspaceFolderPath,
      relativeDirectory + "/*.ts"
    );
    return getFiles(relativePattern).then((files) =>
      writeFile(
        uri.fsPath,
        files.map((file) => `${getExportBase(type)}/${file}';`).join("\n")
      )
    );
  });

const getFiles = (relativePattern: RelativePattern) =>
  workspace.findFiles(relativePattern, null, 50).then((uris: Uri[]) =>
    uris
      .map((uri: Uri) => normalize(basename(uri.path).replace(".ts", "")))
      .filter((file) => !file.endsWith(".spec"))
      .sort()
  );

const getExportBase = (type: BarrelType): string =>
  type === BarrelType.Index
    ? `export * from './lib`
    : `export * from './lib/mocks`;
