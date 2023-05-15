import { ExtensionContext, extensions, commands, Uri } from "vscode";
import { getCommandTriggerContext } from "./lib/get-command-trigger-context";
import { GeneratorName } from "./lib/model/generator-name";
import { Command } from "./lib/model/command";
import { showError } from "./lib/error-utils";
import { getBarrelCommand } from "./lib/get-barrel-command";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
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
    if (type === Command.generate) {
      const command = commands.registerCommand(name, (e: Uri) => {
        commands.executeCommand("nx.generate.ui.fileexplorer", e);
      });
      context.subscriptions.push(command);
    } else {
      const command = commands.registerCommand(name, (e: Uri) => {
        const commandTriggerContext = getCommandTriggerContext(e);
        const project = commandTriggerContext.dasherizedGroupingFolderPath;
        const target = action;
        commands.executeCommand("nx.run", project, target);
      });

      context.subscriptions.push(command);
    }
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
    "domain-generators.ngComponentGlobalStyles",
    GeneratorName.ngComponentGlobalStyles,
    Command.generate
  );
  registerCommand(
    "domain-generators.ngInfrastructureLayer",
    GeneratorName.ngInfrastructureLayer,
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

  context.subscriptions.push(getBarrelCommand());
}

// this method is called when your extension is deactivated
export function deactivate() {}
