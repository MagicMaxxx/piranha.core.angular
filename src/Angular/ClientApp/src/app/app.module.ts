import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '../../node_modules/@angular/router';
import { AppComponent } from './app.component';
import { CmsModule } from './cms/cms.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
     //add any non CMS routes here.
    //Remove below route to remove lazy loading of Cms Setup
      { path: "PiranhaCmsSetup", loadChildren: "./cms-setup/cms-setup.module#CmsSetupModule" }
    ]),
    CmsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
