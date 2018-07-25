import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../cms.service';
import { fadeInAnimation } from '../shared/fade-in.animation';

@Component({
  selector: 'archive',
  templateUrl: './archive.component.html',
  animations: [fadeInAnimation],
  //host: { '[@fadeInAnimation]': "" }
})

export class ArchiveComponent implements OnInit, OnDestroy{

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  model: any;
  isLoading: boolean = true;
  private sub: any;
  constructor(private cmsService: CmsService, private route: ActivatedRoute) {

    this.cmsService.loadingChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.isLoading = value;
      });

    this.cmsService.modelChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.model = value[0];        
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
