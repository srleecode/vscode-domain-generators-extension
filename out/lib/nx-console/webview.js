"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframeHtml = exports.createWebViewPanel = exports.revealWebViewPanel = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const get_task_execution_schema_1 = require("../task-execution-schema/get-task-execution-schema");
const get_cli_task_with_defaults_1 = require("../get-cli-task-with-defaults");
let webviewPanel;
let webViewSchema;
let indexHtml;
function revealWebViewPanel(context, nxConsoleExtensionPath, cliTaskProvider, generatorName, command, commandTriggerContext) {
    const schema = (0, get_task_execution_schema_1.getTaskExecutionSchema)(generatorName, command, commandTriggerContext);
    if (!schema) {
        return;
    }
    const webViewPanel = createWebViewPanel(nxConsoleExtensionPath, schema, command, cliTaskProvider);
    context.subscriptions.push(webViewPanel);
    return webViewPanel;
}
exports.revealWebViewPanel = revealWebViewPanel;
function createWebViewPanel(nxConsoleExtensionPath, schema, title, cliTaskProvider) {
    webViewSchema = schema;
    if (webviewPanel) {
        webviewPanel.title = title;
        webviewPanel.webview.postMessage({ taskExecutionSchema: schema });
        webviewPanel.reveal();
    }
    else {
        webviewPanel = vscode_1.window.createWebviewPanel("nx-console", // Identifies the type of the webview. Used internally
        title, // Title of the panel displayed to the user
        vscode_1.ViewColumn.Active, // Editor column to show the new webview panel in.
        {
            retainContextWhenHidden: true,
            enableScripts: true,
        });
        webviewPanel.onDidDispose(() => {
            webviewPanel = undefined;
        });
        webviewPanel.iconPath = vscode_1.Uri.file((0, path_1.join)(nxConsoleExtensionPath, "assets", "nx-console.svg"));
        webviewPanel.webview.html = getIframeHtml(nxConsoleExtensionPath, webViewSchema);
        webviewPanel.webview.onDidReceiveMessage((message) => {
            const messageWithOptionDefaults = (0, get_cli_task_with_defaults_1.getCliTaskWithDefaults)(message, webViewSchema);
            cliTaskProvider.executeTask(messageWithOptionDefaults);
        });
    }
    return webviewPanel;
}
exports.createWebViewPanel = createWebViewPanel;
function getIframeHtml(nxConsoleExtensionPath, schema) {
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
    <style>${(0, fs_1.readFileSync)((0, path_1.join)(nxConsoleExtensionPath, "assets/public/styles.css"))}</style>
  </head>
  <body>
    <vscode-ui-task-execution-form></vscode-ui-task-execution-form>
    <script>
      ${(0, fs_1.readFileSync)((0, path_1.join)(nxConsoleExtensionPath, "assets/public/runtime.js"))}
    </script>
    <script>
      ${(0, fs_1.readFileSync)((0, path_1.join)(nxConsoleExtensionPath, "assets/public/main.js"))}
    </script>
  </body>
</html>`;
    }
    return indexHtml.replace("window.VSCODE_UI_SCHEMA = {};", `window.VSCODE_UI_SCHEMA = ${JSON.stringify(schema)};`);
}
exports.getIframeHtml = getIframeHtml;
//# sourceMappingURL=webview.js.map