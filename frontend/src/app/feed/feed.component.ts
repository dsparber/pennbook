import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FeedService } from './service/feed.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges  {

  @Input() wall:String = null;
  posts:any = [];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getFeed();
  }

  ngOnChanges() {
    this.getFeed();
  }

  insertPost(post) {
    this.posts.splice(0, 0, post);
  }

  getFeed() {
    this.posts = [];
    this.feedService.getFeed(this.wall)
      .subscribe(
        res => this.posts = res.result,
        err => console.error(err),
      );
  }

}
