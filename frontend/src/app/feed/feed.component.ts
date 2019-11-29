import { Component, OnInit } from '@angular/core';
import {FeedService} from './service/feed.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts:any = [{
                content: "ds;flks ;dfkjas; ldkfj as;dlkfjl;sa dkjf;lak sjf;alk sfj;alk jf;l asjf;akjf;l aksdjf;laksd jf;laskdjf;laksdj; flasdjf;l ajsd;flajsd;lfk j;lfja;lskfja ;sldkfj;a lsdkjf;lsdkfj;lsdjf;l",
                createdAt: "2019-11-23T19:36:58.566Z",
                postId: "96e29994-d0b5-4530-9cb6-9e0d11768b6b",
                creator: "Stefan Papazov",
                wall: "daniel",
                type: "post",
                likes: 28,
           }
         ];
  model : any = {};



  constructor(private feedService: FeedService, private modalService: NgbModal) { }

  ngOnInit() {
    // this.feedService.getFeed().subscribe(res => {
    //   this.posts = res;
    // },
    // err => {
    //   alert("Something went wrong: check connection and try again");
    // });
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

}
