"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShellExecutionForConfig = void 0;
const vscode_1 = require("vscode");
const os_1 = require("os");
const child_process_1 = require("child_process");
function getShellExecutionForConfig(config) {
    let execution;
    if ((0, os_1.platform)() === "win32") {
        execution = getWin32ShellExecution(config);
    }
    else {
        execution = getUnixShellExecution(config);
    }
    return execution;
}
exports.getShellExecutionForConfig = getShellExecutionForConfig;
function getWin32ShellExecution(config) {
    return new vscode_1.ShellExecution(config.displayCommand, {
        cwd: config.cwd,
        executable: "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
        shellArgs: [
            `-Sta -NoLogo -NonInteractive -C "& {${config.program.replace(/ /g, "` " // NOTE: In powershell ` is the escape key.
            )} ${config.args.join(" ")}}"`,
        ],
    });
}
let bashPath;
function getUnixShellExecution(config) {
    if (!bashPath) {
        try {
            bashPath = (0, child_process_1.execSync)("which bash").toString().trim() || "/bin/bash";
        }
        catch (_a) {
            bashPath = "/bin/bash"; // Default to where bash is usually installed.
        }
    }
    return new vscode_1.ShellExecution(config.displayCommand, {
        cwd: config.cwd,
        executable: bashPath,
        shellArgs: [
            "-l",
            "-c",
            `${config.program.replace(/ /g, "\\ ")} ${config.args.join(" ")}`,
        ],
    });
}
//# sourceMappingURL=shell-execution.js.map