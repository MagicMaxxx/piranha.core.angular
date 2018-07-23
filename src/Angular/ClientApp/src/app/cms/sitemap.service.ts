import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { ArchiveComponent } from './archive/archive.component';
import { CmsService } from './cms.service';
import { ErrorComponent } from './error/error.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { StartComponent } from './start/start.component';

@Injectable()
export class SitemapService {

  private sitemap: any;
  private errors: any;

  constructor(private router: Router, private cmsService: CmsService) { }

  load(): Observable<any> {
    return new Observable<any>(observ => {
      if (this.sitemap) {
        observ.next(this.sitemap);
        observ.complete();
      } else {
        this.cmsService.getSiteMap()
          .subscribe((result) => {
            if (result.length > 0) {
              this.sitemap = result;
              this.onSuccessfulGetSiteMap(result);
              observ.next(result);
            } else {
              this.router.navigate(["/setup"]);
            }

            observ.complete();
           
          },
            (errors: any) => {
              this.onUnsuccessful(errors);
              observ.complete();
            }
          );
      }
    })
  }

  private onSuccessfulGetSiteMap(result): void {
    let routes = this.router.config
    let parent = routes.find(route => {
      return route.path === ""
    });

    let siteRoutes = [];
    for (let route of result) {
      let link = route.Permalink.substring(1);

      if (route.PageTypeName === "Start page") {
        siteRoutes.push({ path: link, component: StartComponent });
      } else if (route.PageTypeName === "Blog Archive") {
        siteRoutes.push({ path: link, component: ArchiveComponent });
        for (let post of route.Items) {
          siteRoutes.push({ path: post.Permalink.substring(1), component: PostComponent });
        }
      } if (route.PageTypeName === "Standard page") {
        siteRoutes.push({ path: link, component: PageComponent });
      }
    }
    siteRoutes.push({ path: "**", component: ErrorComponent });

    parent.children = siteRoutes;

    this.router.resetConfig(routes);

    this.cmsService.onSuccessfulGetSiteMap(result);
    this.router.navigate([this.router.url])
  }

  private onUnsuccessful(result: any) {
    //this.errors = errors;
  }
}
