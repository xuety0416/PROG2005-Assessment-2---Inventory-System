import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { App } from './app';
import { Home } from './components/home/home';
import { Inventory } from './components/inventory/inventory';
import { Search } from './components/search/search';
import { PrivacySecurity } from './components/privacy-security/privacy-security';
import { Help } from './components/help/help';

@NgModule({
  declarations: [
    App,
    Home,
    Inventory,
    Search,
    PrivacySecurity,
    Help
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }