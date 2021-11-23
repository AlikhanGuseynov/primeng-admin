export class Register {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  mobileNumber: string;
  password: string;
  usernameType: string;

  patterns: any = {
    username: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^[üÜöÖğĞəƏıIİşŞçÇa-zA-Zа-яА-Я\-0-9]+$/,
    surname: /^[üÜöÖğĞəƏıIİşŞçÇa-zA-Zа-яА-Я\-0-9]+$/,
    password: /^(?=.*\d)(\S{8,30})$/,
    mobileNumber: /^\+{0,1}\d{9,12}$/,
  };

  constructor() {
    this.username = '';
    this.firstname = '';
    this.lastname = '';
    this.mobileNumber = '';
    this.email = '';
    this.password = '';
    this.usernameType = 'EMAIL';
  }

}
