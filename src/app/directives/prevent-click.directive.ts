import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventClick]'
})
export class PreventClickDirective {
  @HostListener('click', ['$event']) onClick($event: Event) {
    $event.stopPropagation()
  }
  constructor() { }

}
