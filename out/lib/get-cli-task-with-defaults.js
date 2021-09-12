"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliTaskWithDefaults = void 0;
const getCliTaskWithDefaults = (message, schema) => {
    const existingFlagNames = getExistingFlags(message);
    const newFlags = schema.options
        .filter((option) => {
        if (existingFlagNames.has(option.name)) {
            return false;
        }
        if (Array.isArray(option.default)) {
            return option.default.length;
        }
        if (typeof option.default === "boolean") {
            return false;
        }
        return option.default;
    })
        .map((option) => `--${option.name}=${getOptionDefaultString(option.default)}`);
    return Object.assign(Object.assign({}, message), { flags: [...newFlags, ...message.flags] });
};
exports.getCliTaskWithDefaults = getCliTaskWithDefaults;
const getExistingFlags = (message) => {
    const existingFlags = new Set();
    message.flags.forEach((flag) => {
        const equalsIndex = flag.indexOf("=");
        const flagName = equalsIndex === -1 ? flag.slice(2) : flag.slice(2, equalsIndex);
        existingFlags.add(flagName);
    });
    return existingFlags;
};
const getOptionDefaultString = (optionDefault) => {
    if (Array.isArray(optionDefault)) {
        return optionDefault.join(",");
    }
    return optionDefault;
};
//# sourceMappingURL=get-cli-task-with-defaults.js.map