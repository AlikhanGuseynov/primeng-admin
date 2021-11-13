import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  check1 = false;
  check2 = false;
  check3 = true;
  check4 = false;
  check5 = false;
  check6 = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
