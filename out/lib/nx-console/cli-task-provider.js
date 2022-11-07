"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliTaskProvider = exports.cliTaskProvider = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const shell_execution_1 = require("./shell-execution");
const fs_2 = require("fs");
const os_1 = require("os");
const path = require("path");
const vscode_2 = require("vscode");
const error_utils_1 = require("../error-utils");
class CliTaskProvider {
    constructor() {
        this.workspaceJsonPath = "";
        exports.cliTaskProvider = this;
        const vscodeWorkspacePath = vscode_2.workspace.workspaceFolders && vscode_2.workspace.workspaceFolders[0].uri.fsPath;
        if (vscodeWorkspacePath) {
            this.scanForWorkspace(vscodeWorkspacePath);
        }
        vscode_1.tasks.onDidEndTaskProcess(() => {
            this.currentDryRun = undefined;
            if (this.deferredDryRun) {
                this.executeTask(this.deferredDryRun);
                this.deferredDryRun = undefined;
            }
        });
    }
    scanForWorkspace(vscodeWorkspacePath) {
        let currentDirectory = vscodeWorkspacePath;
        const { root } = (0, path_1.parse)(vscodeWorkspacePath);
        while (currentDirectory !== root) {
            if ((0, fs_1.existsSync)((0, path_1.join)(currentDirectory, "angular.json"))) {
                return this.setWorkspaceJsonPath((0, path_1.join)(currentDirectory, "angular.json"));
            }
            if ((0, fs_1.existsSync)((0, path_1.join)(currentDirectory, "workspace.json"))) {
                return this.setWorkspaceJsonPath((0, path_1.join)(currentDirectory, "workspace.json"));
            }
            currentDirectory = (0, path_1.dirname)(currentDirectory);
        }
    }
    setWorkspaceJsonPath(workspaceJsonPath) {
        this.workspaceJsonPath = workspaceJsonPath;
    }
    provideTasks() {
        return null;
    }
    resolveTask(task) {
        if (this.workspaceJsonPath &&
            task.definition.command &&
            task.definition.project) {
            const cliTask = this.createTask({
                command: task.definition.command,
                positional: task.definition.project,
                flags: Array.isArray(task.definition.flags)
                    ? task.definition.flags
                    : [],
            });
            // resolveTask requires that the same definition object be used.
            cliTask.definition = task.definition;
            return cliTask;
        }
    }
    createTask(definition) {
        const useNxCli = true;
        const type = useNxCli ? "nx" : "ng";
        const taskDefinition = {
            command: definition.command,
            positional: definition.positional,
            flags: definition.flags,
            type,
        };
        const scope = vscode_1.TaskScope.Workspace;
        const name = `${type} ${taskDefinition.command} ${taskDefinition.positional} ${taskDefinition.flags.join(" ")}`;
        const args = [
            taskDefinition.command,
            taskDefinition.positional,
            ...taskDefinition.flags,
        ];
        const source = "domain-generators";
        const program = useNxCli
            ? this.findClosestNx(this.getWorkspacePath())
            : this.findClosestNg(this.getWorkspacePath());
        const execution = (0, shell_execution_1.getShellExecutionForConfig)({
            displayCommand: name,
            args,
            cwd: this.getWorkspacePath(),
            name,
            program,
        });
        return new vscode_1.Task(taskDefinition, scope, name, source, execution);
    }
    getWorkspacePath() {
        return (0, path_1.join)(this.workspaceJsonPath, "..");
    }
    executeTask(definition) {
        const { validNodeModules: hasNodeModules } = this.verifyNodeModules(this.getWorkspacePath());
        if (!hasNodeModules) {
            return;
        }
        const isDryRun = definition.flags.includes("--dry-run");
        if (isDryRun && this.currentDryRun) {
            this.deferredDryRun = definition;
            return;
        }
        const task = this.createTask(definition);
        return vscode_1.tasks.executeTask(task).then((execution) => {
            if (isDryRun) {
                this.currentDryRun = execution;
            }
        });
    }
    verifyNodeModules(workspacePath) {
        if (!(0, fs_1.existsSync)((0, path_1.join)(workspacePath, "node_modules"))) {
            (0, error_utils_1.showError)(`Could not execute task since node_modules directory is missing. Run npm install at: ${workspacePath}`);
            return { validNodeModules: false };
        }
        return { validNodeModules: true };
    }
    findClosestNg(dir) {
        if (this.directoryExists(path.join(dir, "node_modules"))) {
            if ((0, os_1.platform)() === "win32") {
                if (this.fileExistsSync(path.join(dir, "ng.cmd"))) {
                    return path.join(dir, "ng.cmd");
                }
                else {
                    return path.join(dir, "node_modules", ".bin", "ng.cmd");
                }
            }
            else {
                if (this.fileExistsSync(path.join(dir, "node_modules", ".bin", "ng"))) {
                    return path.join(dir, "node_modules", ".bin", "ng");
                }
                else {
                    return path.join(dir, "node_modules", "@angular", "cli", "bin", "ng");
                }
            }
        }
        else {
            return this.findClosestNg(path.dirname(dir));
        }
    }
    findClosestNx(dir) {
        if (this.directoryExists(path.join(dir, "node_modules"))) {
            if ((0, os_1.platform)() === "win32") {
                if (this.fileExistsSync(path.join(dir, "nx.cmd"))) {
                    return path.join(dir, "nx.cmd");
                }
                else {
                    return path.join(dir, "node_modules", ".bin", "nx.cmd");
                }
            }
            else {
                if (this.fileExistsSync(path.join(dir, "node_modules", ".bin", "nx"))) {
                    return path.join(dir, "node_modules", ".bin", "nx");
                }
                else {
                    return path.join(dir, "node_modules", "@nrwl", "cli", "bin", "nx.js");
                }
            }
        }
        else {
            return this.findClosestNx(path.dirname(dir));
        }
    }
    directoryExists(filePath) {
        try {
            return (0, fs_2.statSync)(filePath).isDirectory();
        }
        catch (err) {
            return false;
        }
    }
    fileExistsSync(filePath) {
        try {
            return (0, fs_2.statSync)(filePath).isFile();
        }
        catch (err) {
            return false;
        }
    }
}
exports.CliTaskProvider = CliTaskProvider;
//# sourceMappingURL=cli-task-provider.js.map