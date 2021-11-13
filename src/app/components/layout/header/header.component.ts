import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";

export interface Language {
  name: string,
  value: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cities: Language[] = [];

  selectedCity: any;
  menuItems: MegaMenuItem[] = [];


  constructor() {

    this.cities = [
      {name: 'AZ', value: 'az'},
      {name: 'RU', value: 'ru'},
      {name: 'EN', value: 'en'},
    ]

    this.menuItems = [
      {
        label: 'Name Surname',
        items: [
          [
            {
              items: [
                {label: 'Company profile', routerLink: '/dashboard'},
                {label: 'Settings', routerLink: '/settings'},
                {label: 'Logout'},
              ]
            }
          ],
        ]
      },
    ]

  }

  ngOnInit(): void {
  }

  save() {

  }

  asd(e: any) {
    console.log(1)
    console.log(e)
  }
}
