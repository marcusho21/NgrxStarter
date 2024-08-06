import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'input[focusOnEdit]',
  standalone: true,
})
export class FocusOnEditDirective {
  focusOnEdit = input(false);
  #host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  constructor() {
    effect(() => {
      if (this.focusOnEdit()) {
        this.#host.nativeElement.focus();
      }
    });
  }
}
