import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from './cms.service';

@Component({
  selector: 'cms',
  templateUrl: './cms.component.html'
})

export class CmsComponent implements OnDestroy {
  isExpanded = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  sitemap: any;
  subSitemap: any;
  model: any;
  isLoading: boolean = true;
  currentPage: string;
  currentPageParent: string;
  constructor(private route: ActivatedRoute, private cmsService: CmsService) {
    this.route.data
      .subscribe(data => {
        if (data.sitemap != null) {
          this.sitemap = data.sitemap;
          console.log(data);
        }
        console.log(data);
      });

    this.cmsService.loadingChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.isLoading = value;
      });

    this.cmsService.sitemapChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.sitemap = value;
        console.log(value);
      });

    this.cmsService.modelChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.model = value[0];
        console.log(this.model);
        this.currentPage = value[1];
        this.subSitemap = value[2];
        let parent = `/${this.currentPage.split("/")[1]}`;
        this.currentPageParent = this.currentPage != parent ? parent : "";
      });

    //this.cmsService.int();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
