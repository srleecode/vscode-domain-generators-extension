import { join } from "path";
import {
  commands,
  Extension,
  ExtensionContext,
  ExtensionMode,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from "vscode";
import { watch } from "fs";
import {
  TaskExecutionOutputMessage,
  TaskExecutionSchemaInputMessage,
  TaskExecutionGlobalConfigurationInputMessage,
} from "../model/task-execution-output-message";
import { TaskExecutionOutputMessageType } from "../model/task-execution-output-message-type";
import { getTaskExecutionSchema } from "../task-execution-schema/get-task-execution-schema";
import { CliTaskProvider } from "./cli-task-provider";
import { TaskExecutionSchema } from "./task-execution-schema";
import { CommandTriggerContext } from "../get-command-trigger-context";
import { GeneratorName } from "../model/generator-name";
import { Command } from "../model/command";
import { getCliTaskWithDefaults } from "../get-cli-task-with-defaults";

let webviewPanel: WebviewPanel | undefined;
let taskSchema: TaskExecutionSchema;
export async function revealWebViewPanel(
  context: ExtensionContext,
  cliTaskProvider: CliTaskProvider,
  generatorName: GeneratorName,
  command: Command,
  commandTriggerContext: CommandTriggerContext,
  nxConsoleExtension: Extension<any>
) {
  const schema = await getTaskExecutionSchema(
    generatorName,
    command,
    commandTriggerContext,
    cliTaskProvider.workspaceJsonPath
  );

  if (!schema) {
    return;
  }

  const webViewPanel = createWebViewPanel(
    schema,
    command,
    cliTaskProvider,
    nxConsoleExtension
  );
  context.subscriptions.push(webViewPanel);

  return webViewPanel;
}

export function createWebViewPanel(
  schema: TaskExecutionSchema,
  title: string,
  cliTaskProvider: CliTaskProvider,
  nxConsoleExtension: Extension<any>
) {
  const webviewPanelExists = !!webviewPanel;
  taskSchema = schema;
  if (!webviewPanel) {
    webviewPanel = window.createWebviewPanel(
      "nx-console", // Identifies the type of the webview. Used internally
      title, // Title of the panel displayed to the user
      ViewColumn.Active, // Editor column to show the new webview panel in.
      {
        retainContextWhenHidden: false,
        enableScripts: true,
        localResourceRoots: [
          Uri.joinPath(nxConsoleExtension.extensionUri, "generate-ui"),
        ],
      }
    );
    webviewPanel.onDidDispose(() => {
      webviewPanel = undefined;
    });
    webviewPanel.iconPath = {
      light: Uri.file(
        join(nxConsoleExtension.extensionPath, "assets", "nx-console-light.svg")
      ),
      dark: Uri.file(
        join(nxConsoleExtension.extensionPath, "assets", "nx-console-dark.svg")
      ),
    };
    setWebViewContent(webviewPanel, nxConsoleExtension);

    webviewPanel.webview.onDidReceiveMessage(
      (message: TaskExecutionOutputMessage) => {
        switch (message.type) {
          case TaskExecutionOutputMessageType.RunCommand: {
            const messageWithOptionDefaults = getCliTaskWithDefaults(
              message.payload,
              taskSchema
            );
            cliTaskProvider.executeTask(messageWithOptionDefaults);
            break;
          }
          case TaskExecutionOutputMessageType.TaskExecutionFormInit: {
            commands.executeCommand('workbench.action.focusActiveEditorGroup');
            publishMessagesToTaskExecutionForm(
              webviewPanel as WebviewPanel,
              taskSchema
            );
            break;
          }
        }
      }
    );
  }

  if (!webviewPanelExists) {webviewPanel.title = title;}

  publishMessagesToTaskExecutionForm(webviewPanel, taskSchema);

  webviewPanel?.reveal();

  return webviewPanel;
}

function publishMessagesToTaskExecutionForm(
  webViewPanelRef: WebviewPanel,
  schema: TaskExecutionSchema
) {
  webViewPanelRef.webview.postMessage(
    new TaskExecutionSchemaInputMessage(schema)
  );
  webViewPanelRef.webview.postMessage(
    new TaskExecutionGlobalConfigurationInputMessage({
      enableTaskExecutionDryRunOnChange: true,
    })
  );
}

function setWebViewContent(
  webviewPanel: WebviewPanel,
  nxConsoleExtension: Extension<any>
) {
  webviewPanel.webview.html = getIframeHtml(
    webviewPanel.webview,
    nxConsoleExtension
  );
}

export function getIframeHtml(
  webView: Webview,
  nxConsoleExtension: Extension<any>
) {
  const stylePath = Uri.joinPath(
    nxConsoleExtension.extensionUri,
    "generate-ui",
    "styles.css"
  );
  const runtimePath = Uri.joinPath(
    nxConsoleExtension.extensionUri,
    "generate-ui",
    "runtime.js"
  );
  const mainPath = Uri.joinPath(
    nxConsoleExtension.extensionUri,
    "generate-ui",
    "main.js"
  );

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>VscodeUi</title>
    <base href="/" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link href="${webView.asWebviewUri(stylePath)}" rel="stylesheet"/>
    <style>
      body {
        color: var(--secondary-text-color);
      }
    </style>
  </head>
  <body>
    <generate-ui-task-execution-form></generate-ui-task-execution-form>
    <script src="${webView.asWebviewUri(runtimePath)}"></script>
    <script src="${webView.asWebviewUri(mainPath)}"></script>
  </body>
</html>`;
}
