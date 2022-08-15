import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsSelectComponent } from './components/settings/settings-select/settings-select.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    SettingsComponent,
    SettingsSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
