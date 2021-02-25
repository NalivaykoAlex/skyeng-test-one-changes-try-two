import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabComponent } from "./tab/tab.component";
import { TabTitleComponent } from "./tab-title/tab-title.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TabContentDirective } from "./directives/tab-content.directive";

const components = [
  TabComponent,
  TabTitleComponent,
  TabsComponent,
  TabContentDirective
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule]
})
export class TabsModule {}
