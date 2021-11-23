import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  constructor(private httpClientService: HttpClientService) {
  }

  login(body: any, recaptcha: string | number | boolean) {
    let query = new HttpParams();
    if (recaptcha) {
      query = query.set('recaptcha', recaptcha);
    }
    return this.httpClientService.post(environment.URLS.LOGIN, body, query);
  }

  logout() {
    return this.httpClientService.post(environment.URLS.LOGOUT);
  }


  register(body: any, recaptcha?: string | number | boolean) {
    let query = new HttpParams();
    if (recaptcha) {
      query = query.set('recaptcha', recaptcha);
    }
    return this.httpClientService.post(environment.URLS.REGISTER, body, query);
  }

  getProfileInfo() {
    return this.httpClientService.get(environment.URLS.PROFILEINFO);
  }

  refreshToken(body: { refreshToken: string | null; }) {
    return this.httpClientService.post(environment.URLS.REFRESHTOKEN, body);
  }

  postText(body: any) {
    return this.httpClientService.post(environment.URLS.LOCALIZATION_SET, body);
  }

  editText(body: any) {
    return this.httpClientService.put(environment.URLS.LOCALIZATION_UPDATE.replace(':key', body.displayName), body);
  }

  // updateGoal(idGoal, body) {
  //   return this.httpClientService.put(environment.URLS.RUDGOALSLIST.replace(':idGoal', idGoal), body);
  // }
  //
  // deleteGoal(idGoal) {
  //   return this.httpClientService.delete(environment.URLS.RUDGOALSLIST.replace(':idGoal', idGoal));
  // }


  // getFile(path: RequestInfo, fileName: string) {
  //   const accessToken = localStorage.getItem('accessToken');
  //   let lang: string | null = 'az';
  //   if (localStorage.getItem('lang')) {
  //     lang = localStorage.getItem('lang');
  //   }
  //   fetch(path, {
  //     headers: {
  //       Authorization: (accessToken && accessToken.toString()),
  //       'Accept-Language': lang,
  //     },
  //   }).then(response => response.blob()).then(data => {
  //     if (data.size > 0) {
  //       (window as any).toastr.info('File is downloading...');
  //       const newBlob = new Blob([data]);
  //       const file = window.URL.createObjectURL(newBlob);
  //       const a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.style.display = 'none';
  //       a.href = file;
  //       a.download = fileName;
  //       a.click();
  //     }
  //   }).catch(error => {
  //     console.log(error + 'File downloading problem');
  //     (window as any).toastr.error('File downloading problem');
  //   });
  // }
}
