import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {RestService} from './rest.service';
import jwt_decode from "jwt-decode";


@Injectable()
export class AuthGuardService implements CanActivate {

  token: string | null = '';
  lang = (location.href.split('lang=') && location.href.split('lang=') [1]) || localStorage.getItem('lang') || 'az';

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | any {

    this.token = localStorage.getItem('accessToken');
      if (this.token) {
        return true;
      } else {
        const body = {
          refreshToken: localStorage.getItem('refreshToken'),
        };
        this.rest.refreshToken(body).pipe(
          catchError((err) => {
            if (err.error) {
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('accessToken');
              console.log('guard');
              this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
            }
            return throwError(err);
          }),
        ).subscribe(
          (result: any) => {
            localStorage.setItem('refreshToken', result.refreshToken);
            localStorage.setItem('accessToken', result.accesstoken);
            window.location.href = window.location.origin + '/#' + (state.url ? state.url : '/dashboard');
            // this.router.navigate(['/dashboard']);
            return true;
          });
      }
  }

}
