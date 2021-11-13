import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import jwt_decode, { JwtPayload } from "jwt-decode";
import {Router} from '@angular/router';

@Injectable()
export class HttpClientService {

  constructor(private router: Router, private http: HttpClient) {
  }

  private createAuthorizationHeader(headers: HttpHeaders, publicService?: boolean | undefined) {
    const lang = localStorage.getItem('lang');
    const accessToken: string = localStorage.getItem('accessToken') || '';

    if (lang) {
      headers = headers.append('Accept-Language', lang);
    } else {
      headers = headers.append('Accept-Language', 'az');
    }

    headers.append('Accept', 'application/json');

    if (accessToken && !publicService) {
      // if (new Date(jwt_decode(accessToken).exp * 1000) > new Date()) {
      //   headers = headers.append(environment.authKey, accessToken);
      // } else {
        const token: any = localStorage.getItem('accessToken');
        headers = headers.append(environment.authKey, token.toString());
      // }
    }

    return headers;
  }

  public get(url: string, params?: HttpParams, nsp?: string | string[] | undefined) {
    let headers = new HttpHeaders();
    const publicService = !!(url.indexOf('/auth/') > -1 || nsp);
    headers = this.createAuthorizationHeader(headers, publicService);
    headers = headers.append('Content-Type', 'application/json');
    if (nsp) {
      headers = headers.append('crmtoken', nsp);
    }
    return this.http.get(url, {
      headers,
      params,
    });
  }

  public getHTML(url: string, params?: HttpParams, nspToken?: string) {
    let headers = new HttpHeaders();
    const lang = localStorage.getItem('lang');
    // if (lang) {
    //   headers = headers.append('Accept-Language', lang);
    // } else {
    headers = headers.append('Accept-Language', 'en');
    // }
    headers = headers.append('Accept', 'text/html');
    if (nspToken){
      headers = headers.append('crm-token', nspToken);
    }
    // headers = headers.append('Content-Type', 'application/json');
    return this.http.get(url, {
      headers,
      params,
      responseType: 'text',
    });
  }

  public getEmptyResponse(url: string, params?: HttpParams) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(url, {
      headers,
      params,
      responseType: 'text',
    });
  }

  public getEncoded(url: string, params?: HttpParams) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(url, {headers, params});
  }

  public post(url: string, data?: { refreshToken: string | null; } | undefined, params?: HttpParams | undefined) {
    let headers = new HttpHeaders();
    const publicService = url.indexOf('/auth/') > -1;
    headers = this.createAuthorizationHeader(headers);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(url, data, {
      headers,
      params,
    });
  }

  public postWithResponseType(url: string, data?: any, responseType?: any) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    // headers = headers.append('Content-Type', 'application/json');
    return this.http.post(url, data, {
      headers,
      responseType,
    });
  }

  public postWithContentType(url: string, data: any) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers,
    });
  }

  public put(url: string, data?: any) {
    let headers = new HttpHeaders();
    const publicService = url.indexOf('/auth/') > -1;
    headers = this.createAuthorizationHeader(headers, publicService);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(url, data, {
      headers,
    });
  }

  public delete(url: string, data?: any, params?: HttpParams) {
    let headers = new HttpHeaders();
    const publicService = url.indexOf('/auth/') > -1;
    headers = this.createAuthorizationHeader(headers, publicService);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.request('delete', url, {
      headers,
      body: data,
    });
  }

  public postUrlEncoded(url: string, body: any) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    headers = headers.append('Content-Type', 'text/plain');
    return this.http.post(url, body, {
      headers,
    });
  }


  public setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }

  public getParam(name: string) {
    return localStorage.getItem(name);
  }

  public getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  public clear() {
    localStorage.clear();
  }

  checkToken() {
    const body = {
      refreshToken: localStorage.getItem('refreshToken'),
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(environment.URLS.REFRESHTOKEN, body, {
      headers,
    }).pipe(
      catchError((err) => {
        if (err.error) {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          console.log('http');
          this.router.navigate(['/auth/login']);
        }
        return throwError(err);
      }),
    ).subscribe(
      (result: any) => {
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('accessToken', result.accesstoken);
        return localStorage.getItem('accessToken');
      });
  }
}
