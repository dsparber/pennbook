import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './affiliation-feed.component.html',
})
export class AffiliationFeedComponent implements OnInit  {

  name:String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params.name;
    });
  }


}
