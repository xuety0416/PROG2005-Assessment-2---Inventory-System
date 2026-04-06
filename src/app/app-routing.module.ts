import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Inventory } from './components/inventory/inventory';
import { Search } from './components/search/search';
import { PrivacySecurity } from './components/privacy-security/privacy-security';
import { Help } from './components/help/help';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'manage', component: Inventory }, 
  { path: 'search', component: Search },
  { path: 'privacy', component: PrivacySecurity },
  { path: 'help', component: Help },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }