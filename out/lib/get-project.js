"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = void 0;
const getProject = (commandTriggerContext) => {
    const { application, childDomain, topLevelDomain, library, cypressFolder, } = commandTriggerContext;
    if (cypressFolder) {
        const cypressPrefix = cypressFolder === "cypress" ? "e2e" : cypressFolder;
        return childDomain
            ? `${cypressPrefix}-${application}-${topLevelDomain}-${childDomain}`
            : `${cypressPrefix}-${application}-${topLevelDomain}`;
    }
    return childDomain
        ? `${application}-${topLevelDomain}-${childDomain}-${library}`
        : `${application}-${topLevelDomain}-${library}`;
};
exports.getProject = getProject;
//# sourceMappingURL=get-project.js.map