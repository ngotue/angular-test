import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpComponent } from './components/up/up.component';
import { DownComponent } from './components/down/down.component';
import { ResetComponent } from './components/reset/reset.component';
import { BackgroundChangerDirective } from './directives/background-changer.directive';
import { HeaderComponent } from './components/header/header.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    UpComponent,
    DownComponent,
    ResetComponent,
    BackgroundChangerDirective,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
