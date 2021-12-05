import { Option as CliOption } from "@angular/cli/models/interface";
import { ItemTooltips } from "./item-tooltips.model";

export interface Option extends CliOption {
  items?: string[];
  tooltip?: string;
  itemTooltips?: ItemTooltips;
}
