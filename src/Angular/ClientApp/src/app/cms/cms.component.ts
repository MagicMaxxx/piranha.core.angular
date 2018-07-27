import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from './cms.service';
import { CmsBasePage } from './shared/cms-base.page';

@Component({
  selector: 'cms',
  templateUrl: './cms.component.html'
})

export class CmsComponent extends CmsBasePage {

  private isExpanded = false;

  constructor(private route: ActivatedRoute, cmsService: CmsService) {
    super(cmsService);
   
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.route.data
      .subscribe(data => {
        if (data.sitemap != null) {
          this.sitemap = data.sitemap;
        }
      }); 
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
