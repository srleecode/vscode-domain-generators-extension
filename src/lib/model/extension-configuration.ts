export interface ExtensionConfiguration
  extends DomainLibraryConfiguration,
    ComponentConfiguration {
  collection: string;
}

export interface DomainLibraryConfiguration {
  buildable: boolean;
  strict: boolean;
  enableIvy: boolean;
  publishable: boolean;
}

export interface ComponentConfiguration {
  unitTestType: "noTest" | "testBed" | "noTestBed";
  style: "scss" | "less" | "css";
}
