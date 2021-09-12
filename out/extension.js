"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const get_command_trigger_context_1 = require("./lib/get-command-trigger-context");
const cli_task_provider_1 = require("./lib/nx-console/cli-task-provider");
const webview_1 = require("./lib/nx-console/webview");
const generator_name_1 = require("./lib/model/generator-name");
const command_1 = require("./lib/model/command");
const error_utils_1 = require("./lib/error-utils");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const taskProvider = new cli_task_provider_1.CliTaskProvider();
    const nxConsole = vscode_1.extensions.getExtension("nrwl.angular-console");
    if (nxConsole === undefined) {
        (0, error_utils_1.showError)("The Nx console extension should be installed for the @srleecode/domain to work");
    }
    else if ((nxConsole === null || nxConsole === void 0 ? void 0 : nxConsole.isActive) === false) {
        nxConsole.activate();
    }
    const registerCommand = (name, action, type) => {
        const command = vscode_1.commands.registerCommand(name, (e) => {
            if (!!nxConsole) {
                (0, webview_1.revealWebViewPanel)(context, nxConsole === null || nxConsole === void 0 ? void 0 : nxConsole.extensionPath, taskProvider, action, type, (0, get_command_trigger_context_1.getCommandTriggerContext)(e));
            }
        });
        context.subscriptions.push(command);
    };
    registerCommand("domain-generators.appGroupingFolder", generator_name_1.GeneratorName.appGroupingFolder, command_1.Command.generate);
    registerCommand("domain-generators.domainGroupingFolder", generator_name_1.GeneratorName.domainGroupingFolder, command_1.Command.generate);
    registerCommand("domain-generators.moveGroupingFolder", generator_name_1.GeneratorName.moveGroupingFolder, command_1.Command.generate);
    registerCommand("domain-generators.removeGroupingFolder", generator_name_1.GeneratorName.removeGroupingFolder, command_1.Command.generate);
    registerCommand("domain-generators.ngApplicationLayer", generator_name_1.GeneratorName.ngApplicationLayer, command_1.Command.generate);
    registerCommand("domain-generators.ngComponent", generator_name_1.GeneratorName.ngComponent, command_1.Command.generate);
    registerCommand("domain-generators.ngDataAccessLayer", generator_name_1.GeneratorName.ngDataAccessLayer, command_1.Command.generate);
    registerCommand("domain-generators.ngDirective", generator_name_1.GeneratorName.ngDirective, command_1.Command.generate);
    registerCommand("domain-generators.ngDomainLayer", generator_name_1.GeneratorName.ngDomainLayer, command_1.Command.generate);
    registerCommand("domain-generators.ngUtilLayer", generator_name_1.GeneratorName.ngUtilLayer, command_1.Command.generate);
    registerCommand("domain-generators.domainTest", generator_name_1.GeneratorName.domainTest, command_1.Command.generate);
    registerCommand("domain-generators.ngRemoveLibrary", generator_name_1.GeneratorName.ngRemoveLibrary, command_1.Command.generate);
    registerCommand("domain-generators.mockFile", generator_name_1.GeneratorName.mockFile, command_1.Command.generate);
    registerCommand("domain-generators.lint", generator_name_1.GeneratorName.lint, command_1.Command.run);
    registerCommand("domain-generators.test", generator_name_1.GeneratorName.test, command_1.Command.run);
    registerCommand("domain-generators.ct", generator_name_1.GeneratorName.ct, command_1.Command.run);
    registerCommand("domain-generators.e2e", generator_name_1.GeneratorName.e2e, command_1.Command.run);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map