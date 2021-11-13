import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  @Input() signed: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
