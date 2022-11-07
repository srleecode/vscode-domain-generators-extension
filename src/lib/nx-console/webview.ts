import { readFileSync } from "fs";
import { join } from "path";
import {
  ExtensionContext,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
} from "vscode";
import { CliTaskProvider } from "./cli-task-provider";
import { TaskExecutionSchema } from "./task-execution-schema";
import { CliTaskDefinition } from "./cli-task-definition";
import { getTaskExecutionSchema } from "../task-execution-schema/get-task-execution-schema";
import { GeneratorName } from "../model/generator-name";
import { CommandTriggerContext } from "../get-command-trigger-context";
import { Command } from "../model/command";
import { getCliTaskWithDefaults } from "../get-cli-task-with-defaults";
import { TaskExecutionOutputMessageType } from "../model/task-execution-output-message-type";
import {
  TaskExecutionGlobalConfigurationInputMessage,
  TaskExecutionOutputMessage,
  TaskExecutionSchemaInputMessage,
} from "../model/task-execution-output-message";

let webviewPanel: WebviewPanel | undefined;
let webViewSchema: TaskExecutionSchema;
let indexHtml: string | undefined;

export function revealWebViewPanel(
  context: ExtensionContext,
  nxConsoleExtensionPath: string,
  cliTaskProvider: CliTaskProvider,
  generatorName: GeneratorName,
  command: Command,
  commandTriggerContext: CommandTriggerContext
) {
  const schema = getTaskExecutionSchema(
    generatorName,
    command,
    commandTriggerContext,
    cliTaskProvider.workspaceJsonPath
  );

  if (!schema) {
    return;
  }

  const webViewPanel = createWebViewPanel(
    nxConsoleExtensionPath,
    schema,
    command,
    cliTaskProvider
  );
  context.subscriptions.push(webViewPanel);

  return webViewPanel;
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

export function createWebViewPanel(
  nxConsoleExtensionPath: string,
  schema: TaskExecutionSchema,
  title: string,
  cliTaskProvider: CliTaskProvider
) {
  webViewSchema = schema;
  if (webviewPanel) {
    webviewPanel.title = title;
    webviewPanel.webview.postMessage({ taskExecutionSchema: schema });
    webviewPanel.reveal();
  } else {
    webviewPanel = window.createWebviewPanel(
      "nx-console", // Identifies the type of the webview. Used internally
      title, // Title of the panel displayed to the user
      ViewColumn.Active, // Editor column to show the new webview panel in.
      {
        retainContextWhenHidden: true,
        enableScripts: true,
      }
    );
    webviewPanel.onDidDispose(() => {
      webviewPanel = undefined;
    });
    webviewPanel.iconPath = Uri.file(
      join(nxConsoleExtensionPath, "assets", "nx-console.svg")
    );

    webviewPanel.webview.html = getIframeHtml(
      nxConsoleExtensionPath,
      webViewSchema
    );

    webviewPanel.webview.onDidReceiveMessage(
      (message: CliTaskDefinition) => {}
    );
    webviewPanel.webview.onDidReceiveMessage(
      (message: TaskExecutionOutputMessage) => {
        switch (message.type) {
          case TaskExecutionOutputMessageType.RunCommand: {
            const messageWithOptionDefaults = getCliTaskWithDefaults(
              message.payload,
              webViewSchema
            );
            cliTaskProvider.executeTask(messageWithOptionDefaults);
            break;
          }
          case TaskExecutionOutputMessageType.TaskExecutionFormInit: {
            publishMessagesToTaskExecutionForm(
              webviewPanel as WebviewPanel,
              schema
            );
            break;
          }
        }
      }
    );
  }

  return webviewPanel;
}

export function getIframeHtml(
  nxConsoleExtensionPath: string,
  schema: TaskExecutionSchema
) {
  if (!indexHtml) {
    // Cache html and inline all styles and scripts.
    indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>VscodeUi</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script>
      // At runtime, VSCode server will replace this empty schema with the one to render.
      window.VSCODE_UI_SCHEMA = {};
      window.addEventListener('message', event => {
        const taskExecutionSchema = event.data.taskExecutionSchema;
        if (taskExecutionSchema && window.SET_TASK_EXECUTION_SCHEMA) {
          window.SET_TASK_EXECUTION_SCHEMA(taskExecutionSchema);
        }
      });
      window.vscode = acquireVsCodeApi();
    </script>
    <style>${readFileSync(
      join(nxConsoleExtensionPath, "assets/public/styles.css")
    )}</style>
  </head>
  <body>
    <vscode-ui-task-execution-form></vscode-ui-task-execution-form>
    <script>
      ${readFileSync(join(nxConsoleExtensionPath, "assets/public/runtime.js"))}
    </script>
    <script>
      ${readFileSync(join(nxConsoleExtensionPath, "assets/public/main.js"))}
    </script>
  </body>
</html>`;
  }

  return indexHtml.replace(
    "window.VSCODE_UI_SCHEMA = {};",
    `window.VSCODE_UI_SCHEMA = ${JSON.stringify(schema)};`
  );
}
