import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { SitemapService } from './sitemap.service';
import { Observable } from '../../../node_modules/rxjs';


@Injectable()
export class SitemapResolve implements Resolve<any> {
  constructor(private sitemapService: SitemapService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.sitemapService.load();
  }
}
