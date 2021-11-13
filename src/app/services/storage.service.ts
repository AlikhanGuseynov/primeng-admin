import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private data: any;
  private index: number | undefined;  // multibilling payment index

  constructor() { }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setIndex(index: number | undefined) {
    this.index = index;
  }

  getIndex() {
    return this.index;
  }
}
