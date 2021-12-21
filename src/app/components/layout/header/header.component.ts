import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {UtilService} from "../../../services/util.service";
import {AuthService} from "../../../services/auth.service";

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


  constructor(private utilService: UtilService, private authService: AuthService) {

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
                {
                  label: 'Logout', command: event => {
                    this.authService.setLoginStatus(false);
                    this.utilService.goTo('auth/login');
                  }
                },
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
