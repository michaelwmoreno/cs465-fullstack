import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
    // Other components, directives, or pipes may also be declared here
  ],
  imports: [
    BrowserModule
    // Other modules may also be imported here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }