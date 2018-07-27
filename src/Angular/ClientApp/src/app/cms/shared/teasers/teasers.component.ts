import { Component, Input } from '@angular/core';

@Component({
  selector: 'teasers',
  templateUrl: './teasers.component.html'
})

export class TeasersComponent {

  private _model: any;

  @Input()
  set model(val: any) {
    this._model = val;
    this.setTeaserSize();
  };

  get model(): any {
    return this._model;
  }

 // hasTeasers: boolean;

  teasers: any;

  constructor() { }

  private setTeaserSize() {
    this.teasers = [];
    if (this.model && this.model.length > 0) {
      let pos = 0;
      let size = 0;

      while (pos < this.model.length) {
        let rest = this.model.length - pos;
        let cols = 0;

        if (rest == 1) {
          size = 8;
          cols = 1;
        } else if (rest <= 4 && rest % 3 != 0 && rest % 2 == 0) {
          size = 6;
          cols = 2;
        } else {
          size = 4;
          cols = 3;
        }
        for (let n = 0; n < cols; n++) {
          var teaser = this.model[pos + n];
          teaser.size = size;
          this.teasers.push(teaser);
        }
        pos += cols;
      }
    }
  }
}
