import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FeedService } from './service/feed.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges  {

  @Input() wall:String = null;
  postIds:any = [];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getFeed();
  }

  ngOnChanges() {
    this.getFeed();
  }

  insertPost(post) {
    this.postIds.splice(0, 0, post.postId);
  }

  onScroll(event) {
    console.log(event);
  }

  getFeed() {
    this.feedService.getFeed(this.wall)
      .subscribe(
        res => {
          this.postIds = res.result.map(p => p.postId);
          setTimeout(() => this.getFeed(), 10 * 1000);
        },
        err => console.error(err),
      );
  }

}
