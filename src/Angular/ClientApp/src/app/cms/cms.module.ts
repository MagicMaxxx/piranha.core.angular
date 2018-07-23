import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { CmsComponent } from './cms.component';
import { CmsService } from './cms.service';
import { ErrorComponent } from './error/error.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { BlockComponent } from './shared/block/block.component';
import { TeasersComponent } from './shared/teasers/teasers.component';
import { FirstParagraphPipe } from './shared/utils';
import { SitemapResolve } from './sitemap.resolve';
import { SitemapService } from './sitemap.service';
import { StartComponent } from './start/start.component';
import { WildCardComponent } from './wildcard/wildcard.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: "home", redirectTo: "" },
      {
        path: "", component: CmsComponent, data: { reuse: true },
        children: [
          //  { path: '**', component: WildCardComponent },
         
        ],
        resolve: {
          sitemap: SitemapResolve
        }
      }
      

    ])
  ],
  entryComponents: [
    ArchiveComponent,
    ErrorComponent,
    PageComponent,
    PostComponent,
    TeasersComponent,
    StartComponent,
    WildCardComponent,
    CmsComponent
  ],
  declarations: [
    ArchiveComponent,
    ErrorComponent,
    PageComponent,
    PostComponent,
    TeasersComponent,
    StartComponent,
    WildCardComponent,
    CmsComponent,
    FirstParagraphPipe,
    BlockComponent
  ],
  exports: [
    RouterModule,
    StartComponent,

    FirstParagraphPipe,
    BlockComponent,
    WildCardComponent,
    CmsComponent,
    ArchiveComponent,
    PageComponent,
    PostComponent,
    TeasersComponent,
    ErrorComponent
  ],

})
export class CmsModule {
  static forRoot(apiUrl: string = "api/cms"): ModuleWithProviders {
    CmsService.url = apiUrl;
    return {
      ngModule: CmsModule,
      providers: [
        SitemapResolve,
        SitemapService,
        CmsService,

        {
          provide: RouteReuseStrategy,
          useClass: RouteReusableStrategy
        }
      ]
    };
  }
}
