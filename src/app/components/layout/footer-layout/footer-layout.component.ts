import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest.service';
import * as moment from 'moment';
import {UtilService} from '../../../services/util.service';

// declare var $;


@Component({
  selector: 'app-footer-layout',
  templateUrl: './footer-layout.component.html',
  styleUrls: ['./footer-layout.component.scss'],
})
export class FooterLayoutComponent implements OnInit {
  year = '';
  @Input() signed: boolean | undefined;


  constructor(private rest: RestService, private changeDetectorRef: ChangeDetectorRef,
              public util: UtilService) {
  }

  ngOnInit() {
    this.year = moment().format('YYYY');
  }
}
