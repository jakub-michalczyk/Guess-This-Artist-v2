import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessScreenComponent } from './components/guess-screen/guess-screen.component';
import { GuessScreenResolver } from './components/guess-screen/guess-screen.resolver';
import { StartScreenComponent } from './components/start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  {
    path: 'guess',
    component: GuessScreenComponent,
    resolve: {
      data: GuessScreenResolver,
    },
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
