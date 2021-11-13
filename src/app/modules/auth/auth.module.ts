import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SharedModule} from "../shared/shared.module";
import {RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {environment} from "../../../environments/environment";
const language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'az';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    RecaptchaModule
  ],
  providers: [
    {provide: RECAPTCHA_LANGUAGE, useValue: language},
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: environment.gnocaptcha} as RecaptchaSettings
    },
  ]
})
export class AuthModule {
}
