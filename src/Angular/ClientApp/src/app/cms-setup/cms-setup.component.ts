import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cms-setup',
    templateUrl: './cms-setup.component.html',
    styleUrls: ['./cms-setup.component.scss']
})

export class CmsSetupComponent {

  constructor(private router: Router, private http: HttpClient) {

  }

  seed() {
    return this.http.get("api/setup/seed")
      .subscribe((result) => {
        console.log("seeded");
        this.router.navigate(["/"]);
      },
      (errors: any) => { });      
  }
}
