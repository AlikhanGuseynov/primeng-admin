import {Component, OnInit} from '@angular/core';
import {Login} from "../../../models/login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupModel: Login = new Login();
  repeatPassword = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  signup() {

  }

  clearError() {

  }
}
