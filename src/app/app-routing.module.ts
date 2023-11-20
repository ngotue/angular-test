import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpComponent } from './components/up/up.component';
import { DownComponent } from './components/down/down.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  { path: 'up', component: UpComponent },
  { path: 'down', component: DownComponent },
  { path: 'reset', component: ResetComponent },
  { path: '', redirectTo: '/up', pathMatch: 'full' },
  { path: '**', redirectTo: '/up' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
