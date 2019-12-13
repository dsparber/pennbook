import { Component, OnInit } from '@angular/core';
import { FeedService } from './service/feed.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts:any = [];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getFeed();
  }

  insertPost(post) {
    this.posts.splice(0, 0, post);
  }

  getFeed() {
    this.feedService.getFeed()
      .subscribe(
        res => this.posts = res.result,
        err => console.error(err),
      );
  }

}
