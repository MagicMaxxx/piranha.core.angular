import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../cms.service';
import { CmsBasePage } from '../shared/cms-base.page';

@Component({
  selector: 'archive',
  templateUrl: './archive.component.html'
})

export class ArchiveComponent extends CmsBasePage{
  

  constructor(cmsService: CmsService, private route: ActivatedRoute) {
    super(cmsService);
  }
}


//private sub: any;
  //ngOnInit() {
  //  this.sub = this.route.params.subscribe(params => {
  //   // this.id = +params['id']; // (+) converts string 'id' to a number

  //    // In a real app: dispatch action to load the details here.
  //  });
  //}
