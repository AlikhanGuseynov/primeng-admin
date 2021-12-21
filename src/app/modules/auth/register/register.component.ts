import {Component, OnInit} from '@angular/core';
import {Login} from "../../../models/login";
import {Register} from "../../../models/register";
import {RestService} from "../../../services/rest.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {UtilService} from "../../../services/util.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupModel: Register = new Register();
  confirmPassword = '';
  regErrorMessage = '';
  loginType = {
    email: 'EMAIL',
    mobile: 'MOBILE'
  }

  constructor(private restService: RestService,
              private utilService: UtilService,
              private authService: AuthService,
              ) {
  }

  ngOnInit(): void {
  }

  clearError() {

  }

  signup() {
    // this.signupModel.usernameType = this.signupModel.patterns.username.test(this.signupModel.username)
    //   ? this.loginType.email : this.loginType.mobile;
    // this.signupModel.patterns = undefined;
    // this.restService.register(this.signupModel).pipe(
    //   catchError((err) => {
    //     if (err.error) {
    //       this.regErrorMessage = err.error.developerMessage;
    //       // this.captchaRef.reset();
    //     }
    //     return throwError(err);
    //   })
    // ).subscribe(
    //   (result: any) => {
    //     this.utilService.goTo('dashboard');
    //   });
    this.utilService.goTo('dashboard');
    this.authService.setLoginStatus(true);
  }
}
