import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {
    if (localStorage.getItem('login')) {
      const status = localStorage.getItem('login') === 'true'
      this.setLoginStatus(status)
    }
  }

  getLogin(): Observable<boolean> {
    return this.login$.asObservable();
  }

  setLoginStatus(status: boolean) {
    localStorage.setItem('login', status + '')
    this.login$.next(status)
  }

}
