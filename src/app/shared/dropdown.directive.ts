import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {


  // if isOpen is true then add the class  open to the element the directive is placed on

  @HostBinding('class.open') isOpen = false;


  // if the element the directive is placed on is clicked then toggle the value of isOpen 

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;

  // }


  // if the document is clicked and the element the directive is placed on is not clicked then set isOpen to false
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

}
