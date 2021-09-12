import { ItemTooltips } from "./item-tooltips.model";
import { LongFormXPrompt } from "./x-prompt.model";

export interface SchemaJson {
  properties: any;
  description: string;
  cli: "nx" | "ng";
  required: string[];
  title: string;
  type: string;
  tooltip: LongFormXPrompt;
  itemTooltips: ItemTooltips;
}
