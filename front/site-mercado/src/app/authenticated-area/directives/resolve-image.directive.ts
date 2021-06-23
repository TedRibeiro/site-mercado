import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

@Directive({
  selector: '[appResolveImage]'
})
export class ResolveImageDirective implements AfterViewInit {

  element!: HTMLImageElement;

  constructor(el: ElementRef) {
    this.element = el.nativeElement as HTMLImageElement;
  }

  ngAfterViewInit(): void {
    const relativePath = this.element.src.replace(location.origin, '');
    if (!!relativePath) {
      this.element.src = `${BASE_URL}${relativePath}`;
    } else {
      this.element.src = `${BASE_URL}/Uploads/Images/product.png`;
    }
  }
}
