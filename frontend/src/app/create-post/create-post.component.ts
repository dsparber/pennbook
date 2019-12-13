import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api/api.service';
import {CommonService} from '../common/common.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePost  {

  @Input() wall:String;
  @Input() currPosts:any;
  @Output() onPost:any = new EventEmitter();

  content:String = "";
  file:any = null;
  profilePicture:boolean = false;

  constructor(private api: ApiService, private commonService: CommonService,) { }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  user() {
    return localStorage.getItem('username');
  }

  getWall() {
    return this.wall || this.user();
  }

  ownWall() {
    return this.user() == this.getWall();
  }

  postWithPicture() {
    if (!this.file) {
      this.post(null);
      return;
    }

    const formData = new FormData();
    formData.append("picture", this.file, this.file.name);
    this.api.post('picture/upload', formData).subscribe(
      res => {
        this.post(res.result.pictureId);
      },
      err => console.error(err),
    );
  }

  post(pictureId) {
    let data = {
      wall: this.getWall(),
      creator: this.user(),
      content: this.content,
      type: (this.profilePicture && pictureId) ? 'profilePicture' : 'post',
    }
    if (pictureId) {
      data['pictureId'] = pictureId;
    }
    this.api.post('post', data).subscribe(
      res => {
        this.content = "";
        this.file = null;
        this.profilePicture = false;
        this.onPost.emit(res.result);
      },
      err => console.error(err),
    );
  }
}
