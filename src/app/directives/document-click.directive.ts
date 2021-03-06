import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDocumentclick]',
})
export class DocumentclickDirective {

  constructor(private el: ElementRef) {
  }

  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(targetElement);
    }
  }

}
