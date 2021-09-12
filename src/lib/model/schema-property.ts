import { Option as CliOption } from "@angular/cli/models/interface";
import { ItemTooltips } from "./item-tooltips.model";
import { LongFormXPrompt } from "./x-prompt.model";

export interface Option extends CliOption {
  items?: string[];
  tooltip?: string;
  itemTooltips?: ItemTooltips;
}
