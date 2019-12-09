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
  currPost: any = {};



  constructor(private feedService: FeedService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getFeed();
  }

  open(content, post) {
    this.currPost = post;
    this.modalService.open(content).result.then((result) => {;
    }, (reason) => {
    });
  }

  postComment(comment) {
    console.log(comment);
    let parent = this.currPost;
    let data = {
      wall : parent.wall,
      content: comment.form.value.content,
      creator: localStorage.getItem('username'),
      parent: parent.postId,
      pictureId: "null",
      type: 'post',
    }

    this.feedService.post(data).subscribe(
      res => {
        if (res.success) {
          parent.children.push(data);
        }
      },
      err => {
        alert("Connection timout");
      }
    )
  }

  postLike(post) {
    let data = {
      postId: post.postId,
      username: localStorage.getItem('username'),
      type: 'like',
    }
    this.feedService.like(data).subscribe(
      res => {
        if (res.success) {
          post.reactions.push(data);
        }
      },
      err => {
        alert("connection timout");
      }
    )

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
