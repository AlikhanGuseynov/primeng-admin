import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {RestService} from '../services/rest.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';

declare var $: any;

@Injectable()
export class TabazHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private rest: RestService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // if (this.loaderExceptions(request.url)) {
    //   $('.loader').show();
    // }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // $('.loader').hide();
        }
        return event;
      }),
      catchError((error: any) => {
        // $('.loader').hide();
        // const isHaveParameter = location.href.indexOf('welcome') > -1 || location.href.indexOf('userParam') > -1
        //   || location.href.indexOf('invitationCode') > -1 || location.href.includes('auth');
        // if ((error.status === 403 || error.status === 401) && !isHaveParameter) {
        //   localStorage.removeItem('refreshToken');
        //   localStorage.removeItem('accessToken');
        //   const lang = (location.href.split('lang=') && location.href.split('lang=') [1]) || localStorage.getItem('lang') || 'az';
        //   this.router.navigate(['/auth/login'], {queryParams: {lang}});
        // }
        // $('.loader').hide();
        return throwError(error);
      }),
    );
  }

  loaderExceptions(url: any) {
    return false;
    // if (url.indexOf('/lead/leads') < 0 && url.indexOf('/lead/chats') < 0 && url.indexOf('/mails/seen/') < 0
    //   && url.indexOf('/mails/folders/') < 0 && url.indexOf('/mails/user-configs/list') < 0
    //   && url.indexOf('/lead/contacts/phone') < 0 && url.indexOf('/files') < 0 && url.indexOf('/tenant/users') < 0
    //   && url.indexOf('/lead/pipelines/list-stages/') < 0 && url.indexOf('/facebook-service/send-file') < 0
    //   && url.indexOf('/chat-service/chats/lead/') < 0) {
    //   return true;
    // }
  }
}
