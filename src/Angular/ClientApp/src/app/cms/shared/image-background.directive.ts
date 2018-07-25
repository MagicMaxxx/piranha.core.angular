import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[imgBackground]'
})
export class ImgBackgroundDirective {

  private _img: any;

  @Input('imgBackground')
  set img(val: any) {
    this._img = val;
    this.setImgBackground();
  };

  get img(): any {
    return this._img;
  }

  constructor(private el: ElementRef) {
    
  }

  private setImgBackground() {
    if (this.img.HasValue) {
      this.el.nativeElement.style.backgroundImage = 'url(' + this.img.Url + ')';
    }
  }
}
