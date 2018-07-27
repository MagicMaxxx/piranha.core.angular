import { Component } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsBasePage } from '../shared/cms-base.page';

@Component({
    selector: 'page',
  templateUrl: './page.component.html'
})

export class PageComponent extends CmsBasePage {


  constructor(cmsService: CmsService) {
    super(cmsService);
  }
}
