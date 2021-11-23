import {Component, OnInit} from '@angular/core';
import {Login} from "../../../models/login";
import {Register} from "../../../models/register";
import {RestService} from "../../../services/rest.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {UtilService} from "../../../services/util.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupModel: Register = new Register();
  confirmPassword = '';
  regErrorMessage = '';

  constructor(private restService: RestService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
  }

  clearError() {

  }

  signup() {
    this.signupModel.patterns = undefined;
    this.restService.register(this.signupModel).pipe(
      catchError((err) => {
        if (err.error) {
          this.regErrorMessage = err.error.developerMessage;
          // this.captchaRef.reset();
        }
        return throwError(err);
      })
    ).subscribe(
      (result: any) => {
        this.utilService.goTo('auth/login');
      });
  }
}
