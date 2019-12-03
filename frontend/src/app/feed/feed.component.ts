import { Component, OnInit } from '@angular/core';
import {FeedService} from './service/feed.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts:any = [];
  model : any = {};



  constructor(private feedService: FeedService, private modalService: NgbModal) { }

  ngOnInit() {
    // this.feedService.getFeed().subscribe(res => {
    //   this.posts = res;
    // },
    // err => {
    //   alert("Something went wrong: check connection and try again");
    // });

    this.getFeed();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {;
    }, (reason) => {
    });
  }

  postComment(comment) {
    console.log(comment);
  }

  postLike(post) {
    post.likes = post.likes + 1;
  }

  getFeed() {
    this.feedService.getFeed()
    .subscribe(res => {
      console.log(res);
      this.posts = res.result;
    },
   err => {
     console.log(err);
   });
  }

}
