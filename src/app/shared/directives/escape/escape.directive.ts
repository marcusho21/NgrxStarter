import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[escape]',
  standalone: true,
})
export class EscapeDirective {
  #host = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('document:keydown.escape')
  onEscape() {
    this.#host.nativeElement.dispatchEvent(new CustomEvent('escape'));
  }
}
