import { Component } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsBasePage } from '../shared/cms-base.page';

@Component({
    selector: 'start',
  templateUrl: './start.component.html'
})

export class StartComponent extends CmsBasePage {


  constructor(cmsService: CmsService) {
    super(cmsService);
  }
}
