import {Component, OnInit} from '@angular/core';
import {UtilService} from '../../../services/util.service';

// declare var $;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {


  constructor(private util: UtilService) {
  }

  ngOnInit() {
  }

  goTo(url: string) {
    this.util.goTo(url);
  }

}
