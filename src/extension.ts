import { ExtensionContext, extensions, commands, Uri } from "vscode";
import { getCommandTriggerContext } from "./lib/get-command-trigger-context";
import { CliTaskProvider } from "./lib/nx-console/cli-task-provider";
import { revealWebViewPanel } from "./lib/nx-console/webview";
import { GeneratorName } from "./lib/model/generator-name";
import { Command } from "./lib/model/command";
import { showError } from "./lib/error-utils";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const taskProvider = new CliTaskProvider();
  const nxConsole = extensions.getExtension("nrwl.angular-console");
  if (nxConsole === undefined) {
    showError(
      "The Nx console extension should be installed for the @srleecode/domain to work"
    );
  } else if (nxConsole?.isActive === false) {
    nxConsole.activate();
  }

  const registerCommand = (
    name: string,
    action: GeneratorName,
    type: Command
  ) => {
    const command = commands.registerCommand(name, (e: Uri) => {
      if (!!nxConsole) {
        revealWebViewPanel(
          context,
          nxConsole?.extensionPath,
          taskProvider,
          action,
          type,
          getCommandTriggerContext(e)
        );
      }
    });
    context.subscriptions.push(command);
  };

  registerCommand(
    "domain-generators.appGroupingFolder",
    GeneratorName.appGroupingFolder,
    Command.generate
  );
  registerCommand(
    "domain-generators.domainGroupingFolder",
    GeneratorName.domainGroupingFolder,
    Command.generate
  );
  registerCommand(
    "domain-generators.moveGroupingFolder",
    GeneratorName.moveGroupingFolder,
    Command.generate
  );
  registerCommand(
    "domain-generators.removeGroupingFolder",
    GeneratorName.removeGroupingFolder,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngApplicationLayer",
    GeneratorName.ngApplicationLayer,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngComponent",
    GeneratorName.ngComponent,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngDataAccessLayer",
    GeneratorName.ngDataAccessLayer,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngDirective",
    GeneratorName.ngDirective,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngDomainLayer",
    GeneratorName.ngDomainLayer,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngUtilLayer",
    GeneratorName.ngUtilLayer,
    Command.generate
  );
  registerCommand(
    "domain-generators.domainTest",
    GeneratorName.domainTest,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngRemoveLibrary",
    GeneratorName.ngRemoveLibrary,
    Command.generate
  );
  registerCommand(
    "domain-generators.mockFile",
    GeneratorName.mockFile,
    Command.generate
  );
  registerCommand("domain-generators.lint", GeneratorName.lint, Command.run);
  registerCommand("domain-generators.test", GeneratorName.test, Command.run);
  registerCommand("domain-generators.ct", GeneratorName.ct, Command.run);
  registerCommand("domain-generators.e2e", GeneratorName.e2e, Command.run);
}

// this method is called when your extension is deactivated
export function deactivate() {}
