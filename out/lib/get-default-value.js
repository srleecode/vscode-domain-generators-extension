"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValue = void 0;
const fs = require("fs");
const getDefaultValue = (optionKey, action, commandTriggerContext, extensionConfiguration) => {
    const commandContextValue = commandTriggerContext[optionKey];
    const extensionContextValue = extensionConfiguration[optionKey];
    return undefined;
};
exports.getDefaultValue = getDefaultValue;
//# sourceMappingURL=get-default-value.js.map