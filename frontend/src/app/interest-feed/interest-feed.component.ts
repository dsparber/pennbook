import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interest-feed',
  templateUrl: './interest-feed.component.html',
})
export class InterestFeedComponent implements OnInit  {

  name:String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('here');
    this.route.params.subscribe(params => {
      console.log(params);
      this.name = params.name;
    });
  }


}
