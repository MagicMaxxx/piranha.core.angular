import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsSetupComponent } from './cms-setup.component';


@NgModule({
  imports: [
    RouterModule.forChild([{ path: "PiranhaCmsSetup", component: CmsSetupComponent }])
  ], 
  declarations: [CmsSetupComponent],
  exports: [RouterModule],

})
export class CmsSetupModule {}
