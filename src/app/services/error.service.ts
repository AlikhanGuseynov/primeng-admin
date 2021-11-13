import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {

    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    console.log('====================================================');
    console.log(error);
    if (chunkFailedMessage.test(error.message)) {
      // window.location.reload();
    }
    let log = '';
    if (error instanceof HttpErrorResponse) {
      log = `Error Message: ${error.error.errorMessage}\nHttp Message: ${error.message}`;
    } else if (error instanceof TypeError) {
      log = `Error: TypeError\nError Message: ${error.message}`;
    } else {
      log = `Error Message: ${error.message ? error.message : error}`;
    }
    // log += `\nPage: ${window.location.href}`
    //   + (this.currentUser ? `\nUser: ${this.currentUser.name} ${this.currentUser.surname} ${this.currentUser.username}` : ``);
    // this.logService.setLogData(log);
    console.log('====================================================');
    console.log(log);
  }
}
