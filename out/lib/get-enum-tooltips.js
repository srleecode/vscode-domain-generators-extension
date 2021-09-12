"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumTooltips = void 0;
const x_prompt_model_1 = require("./model/x-prompt.model");
const getEnumTooltips = (xPrompt) => {
    const enumTooltips = {};
    if (!!xPrompt && (0, x_prompt_model_1.isLongFormXPrompt)(xPrompt)) {
        (xPrompt.items || []).forEach((item) => {
            if ((0, x_prompt_model_1.isOptionItemLabelValue)(item) && !!item.label) {
                enumTooltips[item.value] = item.label;
            }
        });
    }
    return enumTooltips;
};
exports.getEnumTooltips = getEnumTooltips;
//# sourceMappingURL=get-enum-tooltips.js.map