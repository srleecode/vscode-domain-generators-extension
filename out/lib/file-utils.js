"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFile = exports.getFullPath = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const getFullPath = (rootPath, schemaPath) => (0, path_1.join)(rootPath, schemaPath);
exports.getFullPath = getFullPath;
const isFile = (path) => {
    try {
        if (!(0, fs_1.statSync)(path).isFile()) {
            return false;
        }
    }
    catch (err) {
        return false;
    }
    return true;
};
exports.isFile = isFile;
//# sourceMappingURL=file-utils.js.map