import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  #host = inject<ElementRef<HTMLElement>>(ElementRef);
  clickOutside = output<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const isOutside = event
      .composedPath()
      .every((el) => el !== this.#host.nativeElement);

    if (isOutside) {
      this.#host.nativeElement.dispatchEvent(new CustomEvent('clickOutside'));
    }
  }
}
