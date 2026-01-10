import { Directive, ElementRef, inject } from '@angular/core';
import { COLOR } from './color.token';

@Directive({
  selector: '[test]',
  standalone: true,
})
export class TestDirective {
  elRef = inject(ElementRef);
  color = inject(COLOR);

  nodeName = this.elRef.nativeElement.nodeName;

  constructor() {
    // console.log(this.elRef.nativeElement);
    console.log(this.color);
    this.elRef.nativeElement.style.border = `10px solid ${this.color[0]};`;
  }
}
