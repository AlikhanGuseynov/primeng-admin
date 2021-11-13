import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from './components/layout/header/header.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./modules/shared/shared.module";
import {FooterLayoutComponent} from "./components/layout/footer-layout/footer-layout.component";
import {IndexLayoutComponent} from "./components/layout/index-layout/index-layout.component";
import {LeftSidebarComponent} from "./components/layout/left-sidebar/left-sidebar.component";
import {environment} from "../environments/environment";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SocialAuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from "angularx-social-login";
import {Observable, Observer, throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {NgxPaginationModule} from "ngx-pagination";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {QrCodeModule} from "ng-qrcode";
import {ChartsModule, ThemeService} from "ng2-charts";
import {TrustPipe} from "./pipes/trust.pipe";
import {HttpClientService} from "./services/http-client.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {StorageService} from "./services/storage.service";
import {UtilService} from "./services/util.service";
import {RestService} from "./services/rest.service";
import {TabazHttpInterceptor} from "./interceptors/http.interceptor";
import {GlobalErrorHandler} from "./services/error.service";
import {AuthService} from "./services/auth.service";

export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateHttpLoader(http, environment.URLS.LOCALIZATION_PREFIX, '.json');
}

export class CustomTranslateHttpLoader implements TranslateLoader {
  private http;
  prefix: string | undefined;
  suffix: string | undefined;

  constructor(http: HttpClient, prefix?: string, suffix?: string) {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }

  getTranslation(lang: string): Observable<any> {
    const apiAddress = this.prefix + lang + this.suffix;
    return new Observable((observer: Observer<any>) => {
      this.http.get(apiAddress)
        .pipe(catchError(err => {
          if (err.error) {
            this.http.get('../assets/i18n/' + lang + '.json').subscribe((res: any) => {
              observer.next(res);
              observer.complete();
            });
          }
          return throwError(err);
        }))
        .subscribe(
          res => {
            observer.next(res);
            observer.complete();
          });
    });
  }
}

const language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'az';


@NgModule({
  declarations: [
    AppComponent,
    FooterLayoutComponent,
    IndexLayoutComponent,
    LeftSidebarComponent,
    HeaderComponent,
    SafeHtmlPipe,
    TrustPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    // RecaptchaModule.forRoot(),
    InfiniteScrollModule,
    NgxPaginationModule,
    ChartsModule,
    SocialLoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
    QrCodeModule,
  ],
  exports: [
    TrustPipe,
  ],
  providers: [StorageService, UtilService, RestService, HttpClientService, AuthGuardService, ThemeService, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TabazHttpInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: RECAPTCHA_LANGUAGE, useValue: language},
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: environment.gnocaptcha} as RecaptchaSettings,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('887397772055280'),
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
