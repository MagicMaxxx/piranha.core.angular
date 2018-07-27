import { Component } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsBasePage } from '../shared/cms-base.page';

@Component({
    selector: 'post',
  templateUrl: './post.component.html'
})

export class PostComponent extends CmsBasePage {


  constructor(cmsService: CmsService) {
    super(cmsService);
  }
}
