import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../../services/util.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../services/rest.service";
import {Login} from "../../../models/login";

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

  constructor(private rest: RestService, private util: UtilService, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
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
  }

  checkUsername() {
    const email = new FormGroup({
      username: new FormControl(this.loginModel.username, Validators.pattern(this.loginModel.patterns.username)),
    });
    this.dirtyUsername = !email.valid;
  }

  login() {
    this.goTo('dashboard')
    // this.captchaRef.execute();
  }

  clearError() {
    this.regErrorMessage = '';
    this.dirtyUsername = false;
    this.errorUsername = false;
  }

  goTo(url: string) {
    this.util.goTo(url);
  }

  // public submit(captchaResponse: string): void {
  //   this.recaptcha = captchaResponse;
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
}
