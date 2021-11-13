import {Component, OnInit} from '@angular/core';
import {PRODUCT_LIST} from "../../../mock/product.mock";

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards = [1, 2, 3,]

  products: Product[] = [];

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.products = PRODUCT_LIST;

  }


}
