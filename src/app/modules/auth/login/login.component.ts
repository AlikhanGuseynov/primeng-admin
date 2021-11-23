import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../../services/util.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../services/rest.service";
import {Login} from "../../../models/login";
import {AuthService} from "../../../services/auth.service";
import {catchError} from "rxjs/internal/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  regErrorMessage = '';
  recaptcha = '';
  dirtyUsername = false;
  errorUsername = false;
  loginModel: Login = new Login();
  // @ViewChild('captchaRef', {static: false}) captchaRef: any;
  returnUrl = '';

  constructor(
    private restService: RestService,
    private utilService: UtilService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getLang();
    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     if (params.returnUrl && params.returnUrl !== '') {
    //       this.returnUrl = params.returnUrl;
    //     }
    //   });
    // // this.getLang();
    // if (localStorage.getItem('accessToken')) {
    //   window.location.href = window.location.origin + '/#' + (this.returnUrl ? this.returnUrl : '/dashboard');
    // }
    this.checkLogin();
  }

  checkLogin() {
    this.authService.setLoginStatus(false);
  }

  checkUsername() {
    const email = new FormGroup({
      username: new FormControl(this.loginModel.username, Validators.pattern(this.loginModel.patterns.username)),
    });
    this.dirtyUsername = !email.valid;
  }

  login() {
    this.restService.login(this.loginModel).pipe(
      catchError((err) => {
        if (err.error) {
          this.regErrorMessage = err.error.developerMessage;
          // this.captchaRef.reset();
        }
        return throwError(err);
      })
    ).subscribe(
      (result: any) => {
        this.utilService.goTo('dashboard');
        this.authService.setLoginStatus(true);
      });
    // this.captchaRef.execute();
  }

  clearError() {
    this.regErrorMessage = '';
    this.dirtyUsername = false;
    this.errorUsername = false;
  }

  goTo(url: string) {
    this.utilService.goTo(url);
  }


  // public submit(captchaany: string): void {
  //   this.recaptcha = captchaany;
  //   const body = {
  //     username: this.loginModel.username,
  //     password: this.loginModel.password,
  //     subdomain: window.location.host.split('.')[1] ? window.location.host.split('.')[0] : null,
  //   };
  //   this.rest.login(body, this.recaptcha).pipe(
  //     catchError((err) => {
  //       if (err.error) {
  //         this.regErrorMessage = err.error.developerMessage;
  //         // this.captchaRef.reset();
  //       }
  //       return throwError(err);
  //     }),
  //   ).subscribe(
  //     (data: any) => {
  //       localStorage.setItem('accessToken', data.accesstoken);
  //       localStorage.setItem('refreshToken', data.refreshToken);
  //       setTimeout(() => {
  //         $('.loader').show();
  //         window.location.href = window.location.origin + '/#' + (this.returnUrl ? this.returnUrl : '/dashboard') + '?pr=l';
  //         // window.location.href = window.location.href.split('#')[0] + '#/dashboard?pr=l';
  //       }, 1000);
  //     });
  // }

  togglePassword(input: any) {
    console.log('Clicked');
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  getLang() {
    this.http.get('../assets/i18n/az.json').subscribe((res: any) => {
      let jsonBody: any = [];
      Object.keys(res).forEach(key => {
        Object.keys(res[key]).forEach(subKey => {
          const body = {
            description: '',
            textKey: key + '.' + subKey,
            textAz: res[key][subKey],
            textEn: key + '.' + subKey,
            textRu: key + '.' + subKey,
            langProduct: {
              id: 2,
              name: "client_side",
              description: "Client Side"
            }
          };
          jsonBody.push(body);
        });
      });
      this.http.get('../assets/i18n/en.json').subscribe((res2: any) => {
        jsonBody = this.changeBody(jsonBody, res2, 'en');
        this.http.get('../assets/i18n/ru.json').subscribe((res3: any) => {
          jsonBody = this.changeBody(jsonBody, res3, 'ru');
          jsonBody.map((body: any) => {
            // console.log(body, 'finally');
            this.postText(body);
            // this.editText(body);
          });
        });
      });

    });
  }

  changeBody(data: any, res: any, lang: string) {
    Object.keys(res).forEach(key => {
      Object.keys(res[key]).forEach(subKey => {
        data = data.map((body: any) => {
          const currentKey = key + '.' + subKey;
          if (body.textKey === currentKey) {
            if (lang === 'en') {
              // body.enText = res[key][subKey] + '_' + lang;
              body.textEn = res[key][subKey];
            } else {
              // body.ruText = res[key][subKey] + '_' + lang;
              body.textRu = res[key][subKey];
            }
          }
          return body;
        });
      });
    });
    return data;
  }
  postText(body: any) {
    this.restService.postText(body).pipe(
      catchError((err) => {
        if (err.error) {
        }
        return throwError(err);
      }),
    ).subscribe(
      (data: any) => {
      });
  }

  editText(body: any) {
    this.restService.editText(body).pipe(
      catchError((err) => {
        if (err.error) {
        }
        return throwError(err);
      }),
    ).subscribe(
      (data: any) => {
      });
  }
}
