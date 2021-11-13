import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from './storage.service';
import {HttpClientService} from './http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

declare var $: any;

@Injectable()
export class UtilService {

  sub: any;

  constructor(private translateService: TranslateService, private storage: StorageService, private router: Router,
              private storageService: StorageService, private httpClientService: HttpClientService,
              private route: ActivatedRoute) {
  }


  goTo(path: string, data?: any, index?: number, id?: string) {
    this.storageService.setData(data);
    this.storageService.setIndex(index);
    if (id) {
      this.router.navigate(['/' + path, id]);
    } else {
      this.router.navigate(['/' + path]);
    }

  }

  translate() {
    this.translateService.setDefaultLang('az');
    this.sub = this.route.queryParams.subscribe(params => {
      if (params['lang']) {
        localStorage.setItem('lang', params['lang']);
        const lang = localStorage.getItem('lang');
        if (typeof lang === "string") {
          this.translateService.use(lang);
        }
        this.sub.unsubscribe();
      }
    });
    if (localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      if (typeof lang === "string") {
        this.translateService.use(lang);
      }
    }
  }

  goToWithId(path: string, id: string) {
    if (path.indexOf('search') === -1) {
      $('#globalSearch').val('');
    }
    this.router.navigate(['/' + path, id]);
  }

  dateFormatterDetailed(date: number) {
    return date ? moment.unix(date).format('DD.MM.YYYY HH:mm:ss') : '';
  }

  dateFormatterShort(date: number) {
    return date ? moment.unix(date).format('DD.MM.YYYY') : '';
  }

  formatDate(dateTime: string) {
    let date = '';
    if (dateTime) {
      const aryDate = dateTime.split(' ');
      date = aryDate[0];
      const time = aryDate[1];
      date = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4);
    }
    return date;
  }

  formatDateForAPI(date: string) {
    return date.substring(6, 10) + '/' + date.substring(3, 5) + '/' + date.substring(0, 2);
  }

  logout() {
    this.httpClientService.clear();
    this.router.navigate(['/auth/login']);
  }

  checkValueByPattern(value: any, pattern: string | RegExp) {
    const email = new FormGroup({
      username: new FormControl(value, Validators.pattern(pattern)),
    });
    return email.valid;
  }

  getFirstSymbol(s: string) {
    return s ? s.substring(0, 1) : '';
  }

  onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }

  formattedPhoneNumber(phoneNumber: string) {
    let phone = phoneNumber ? phoneNumber.replace(/[^0-9]+/g, '').replace('994', '') : '';
    if (phone && +phone.substring(0, 1) === 0) {
      phone = phone.substring(1, phone.length);
    }
    phone = phone ? ('994' + phone) : '';
    return phone;
  }

  splitPhoneNumber(phoneNumber: string) {
    let phone = phoneNumber ? phoneNumber.replace(/[^0-9]+/g, '').replace('994', '') : '';
    if (phone && +phone.substring(0, 1) === 0) {
      phone = phone.substring(1, phone.length);
    }
    return phone;
  }

  secondFormat(secs: string) {
    const secNum = parseInt(secs, 10);
    let hours = Math.floor(secNum / 3600).toString();
    let minutes = Math.floor((secNum - +hours * 3600) / 60).toString();
    let seconds = (secNum - +hours * 3600 - +minutes * 60).toString();

    if (+hours < 10) {
      hours = +hours === 0 ? '' : `0${hours}`;
    }
    if (+minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (+seconds < 10) {
      seconds = `0${seconds}`;
    }
    return hours === '' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
  }

  minuteFormat(secs: string) {
    const secNum = parseInt(secs, 10);
    let days = Math.floor(secNum / (3600 * 24)).toString();
    let hours = Math.floor((secNum - +days * 24 * 3600) / 3600).toString();
    let minutes = Math.floor((secNum - +days * 24 * 3600 - +hours * 3600) / 60).toString();
    days = +days > 0 ? (+days === 1 ? `${days} day` : `${days} days`) : '';
    hours = +hours > 0 ? (+hours === 1 ? `${hours} hour` : `${hours} hours`) : '';
    minutes = +minutes > 0 ? (+minutes === 1 ? `${minutes} minute` : `${minutes} minutes`) : '';
    return `${days} ${hours} ${minutes}`;
  }

  // getHeaderKey(data: {}, selectedIndex: number) {
  //   let newKey = '';
  //   Object.keys(data).forEach((key:string, index: number) => {
  //     if (index === selectedIndex) {
  //       newKey = key;
  //       return false;
  //     }
  //   });
  //   return newKey;
  // }

  dateValidator(fromDate: moment.MomentInput, toDate: moment.MomentInput, time?: any) {
    const momentStartDate = moment(fromDate, time ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY', true);
    const momentEndDate = moment(toDate, time ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY', true);
    if (!momentStartDate.isValid() || !momentEndDate.isValid()) {
      (window as any).toastr.error('Enter date valid format!(DD-MM-YYYY)');
    }
    return !(!momentStartDate.isValid() || !momentEndDate.isValid());
  }

  timeValidator(fromTime: moment.MomentInput, toTime: moment.MomentInput) {
    const momentStartTime = moment(fromTime, 'HH:mm', true);
    const momentEndTime = moment(toTime, 'HH:mm', true);
    if (!momentStartTime.isValid() || !momentEndTime.isValid()) {
      (window as any).toastr.error('Enter time valid format!(HH:ii)');
    }
    return !(!momentStartTime.isValid() || !momentEndTime.isValid());
  }

  reusedContacts() {
    $('#check_phone_number')[0].style.display = 'none';
  }


  outsideCLick() {
    // document.querySelectorAll('button.grey.btn-outline-secondary').forEach((el: HTMLElement) => el.click());
  }

  selectCustomThreeDots(text: string, range?: any) {
    return (text && text.length > (range ? range : 15)) ? text.substring(0, 12) + '...' : text;
  }

}
