import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { TabsModule } from "./shared/modules/tabs/tabs.module";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";

@NgModule({
  imports: [BrowserModule, FormsModule, TabsModule],
  declarations: [AppComponent, HelloComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
