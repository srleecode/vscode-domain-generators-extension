# domain-generators README

## Features

This extension allows the [domain generators](https://github.com/srleecode/domain) to be more easily used by launching the nx console and adding appropriate default valeus based on the command trigger context. 

## Requirements

Install the [domain generators](https://github.com/srleecode/domain) library before using this extension.

## Extension Settings

This extension contributes the following settings:

* `domainGenerators.style`: default style type for libraries. Options are:  "scss", "less" or "css"
* `domainGenerators.unitTestType`: default unit test type that will be created when creating a component or directive library. Options are: "noTest", "testBed" or "noTestBed"
* `domainGenerators.mountType`: default mount type for the component and directive UI tests. Options are:  "component" or "story"
* `domainGenerators.displayBlock.enabled`: specifies if the add components style will contain `:host { display: block; }`
* `domainGenerators.buildable.enabled`: specifies if the buildable flag is used when creating domain libraries
* `domainGenerators.publishable.enabled`: specifies if the publishable flag is used when creating domain libraries. This is not recommended when enableIvy is true
* `domainGenerators.strict.enabled`: specifies if the strict flag is used when creating domain libraries.
* `domainGenerators.enableIvy.enabled`: specifies if the enableIvy flag is used when creating domain libraries.

## Known Issues