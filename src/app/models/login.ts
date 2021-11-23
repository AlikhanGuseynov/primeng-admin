export class Login {
  username: string;
  password: string;
  rememberMe: boolean;

  patterns = {
    username: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*\d)(\S{8,30})$/,
  };

  constructor() {
    this.username = '';
    this.password = '';
    this.rememberMe = true;
  }

}
