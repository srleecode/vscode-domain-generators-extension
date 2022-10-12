import { ItemTooltips } from "./item-tooltips.model";

export interface Option {
  name: string;
  originalName?: string;
  positional?: number;
  alias?: string;
  hidden?: boolean;
  deprecated?: boolean | string;
  items?: string[];
  enum?: string[];
  default?: any;
  required?: boolean;
  tooltip?: string;
  itemTooltips?: ItemTooltips;
}
