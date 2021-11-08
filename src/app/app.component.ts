import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin: boolean = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.getLogin().subscribe(item => {
      this.isLogin = item;
    })
  }

}
