import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../cms.service';

export class CmsBasePage implements OnInit, OnDestroy{

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  protected sitemap: any;
  protected subSitemap: any;
  protected model: any;
  protected isLoading: boolean = true;
  protected currentPage: string;
  protected currentPageParent: string;
  constructor(protected cmsService: CmsService) { }

  ngOnInit(): void {

    this.cmsService.loadingChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.isLoading = value;
      });

    this.cmsService.modelChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.model = value;        
      });

    this.cmsService.sitemapChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.sitemap = value;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
