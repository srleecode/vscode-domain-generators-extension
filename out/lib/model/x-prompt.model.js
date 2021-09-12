"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOptionItemLabelValue = exports.isLongFormXPrompt = void 0;
const isLongFormXPrompt = (xPrompt) => xPrompt.message !== undefined;
exports.isLongFormXPrompt = isLongFormXPrompt;
const isOptionItemLabelValue = (item) => item.value !== undefined ||
    item.label !== undefined;
exports.isOptionItemLabelValue = isOptionItemLabelValue;
//# sourceMappingURL=x-prompt.model.js.map