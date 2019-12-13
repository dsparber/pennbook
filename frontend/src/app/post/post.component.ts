import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api/api.service';
import * as moment from 'moment';
import { faHeart, faThumbsUp, faThumbsDown, faSmileBeam, faSadTear} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class Post implements OnInit {

  @Input() post:any;
  comment:String = null;
  
  allReactions:any = [
    { icon: faThumbsUp, color: '#02b002', type: 'like' },
    { icon: faThumbsDown, color: '#f02100', type: 'dislike' },
    { icon: faHeart, color: '#ff0095', type: 'heart' },
    { icon: faSmileBeam, color: '#ffa203', type: 'happy' },
  ]


  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getReaction() {
    for (let reaction of this.post.reactions) {
      if (reaction.username == this.user()) {
        return reaction;
      }
    }
    return null;
  }

  removeReaction() {
    this.post.reactions = this.post.reactions.filter(r => r.username != this.user());
  }

  timeString(datetime) {
    return moment(datetime).fromNow();
  }

  react(type) {
    let reaction = {
      postId: this.post.postId,
      username: this.user(),
      type: type,
    };
    let oldReaction = this.getReaction();
    this.removeReaction();

    // Add
    if (oldReaction ==  null || reaction.type != oldReaction.type) {
      this.api.post('reaction/add', reaction).subscribe(
        res => this.post.reactions.push(reaction),
        err => console.error(err),
      );
    }
    // Remove
    else {
      this.api.post('reaction/remove', reaction).subscribe(
        res => {},
        err => console.error(err),
      );
    }
  }

  countReactions(type) {
    return this.post.reactions.filter(r => r.type == type).length;
  }

  user() {
    return localStorage.getItem('username');
  }

  addComment() {
    if (!this.comment) {
      return;
    }
    this.api.post('post', {
      parent: this.post.postId,
      content: this.comment,
      creator: this.user(),
      wall: this.post.wall.username,
    }).subscribe(
      res => {
        this.comment = null;
        this.post.children.push(res.result);
      },
      err => console.error(err),
    );
  }
}
