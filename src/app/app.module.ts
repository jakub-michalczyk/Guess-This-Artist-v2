import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { GuessScreenComponent } from './components/guess-screen/guess-screen.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { SettingsSelectComponent } from './components/settings/settings-select/settings-select.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { ScoreComponent } from './components/score/score.component';
import { LostScreenComponent } from './components/lost-screen/lost-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    SettingsComponent,
    SettingsSelectComponent,
    GuessScreenComponent,
    LoadingScreenComponent,
    CountdownComponent,
    ScoreComponent,
    LostScreenComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
