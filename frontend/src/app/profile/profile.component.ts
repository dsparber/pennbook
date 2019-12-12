import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import {FeedService} from './../feed/service/feed.service';
import {ProfileService} from './service/profile.service'
import {CommonService} from './../common/common.service'
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user:String = null;

  model : any = {};
  myPage = true;
  friends = true;
  profile:any = {};
  posts:any = [];
  interest:any = [];
  afil:any = [];
  afilCopy:any = [];
  copyInterest:any = [];
  interestString:string = '';
  affiliations:any = [];
  currPost:any = {};
  comment:boolean = true;
  editBio: boolean = true;
  editInterests: boolean = true;
  editProfile:boolean = true;
  editAffil:boolean = true;
  afilString: any;


<<<<<<< HEAD
  constructor(private modalService: NgbModal, private feedService: FeedService, private profileService: ProfileService, private commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       let id = params.id;
       console.log(id);
       this.loadProfile(id);
    });
=======
  constructor(
    private modalService: NgbModal, 
    private feedService: FeedService, 
    private profileService: ProfileService, 
    private commonService: CommonService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {      
    this.route.params.subscribe(params => {
      this.user = params.user;
      this.profile = {};
      this.posts = [];
      this.loadProfile();
    });

>>>>>>> d4632fe27f5fd7bd2ae0fe56052c6622033b85c3
  }

  open(content, toggle, post) {
    if (toggle == 'comment') {
      this.comment= true;
      this.editBio = false;
      this.editInterests = false;
      this.editProfile = false;
      this.editAffil = false;
    } else if (toggle == 'bio') {
      this.comment= false;
      this.editBio = true;
      this.editInterests = false;
      this.editProfile = false;
      this.editAffil = false;
    } else if (toggle == 'interests') {
      this.comment= false;
      this.editBio = false;
      this.editInterests = true;
      this.editProfile = false;
      this.editAffil = false;
    } else if (toggle == 'profile') {
      this.comment= false;
      this.editBio = false;
      this.editInterests = false;
      this.editProfile = true;
      this.editAffil = false;
    } else if (toggle == 'affil') {
      this.comment= false;
      this.editBio = false;
      this.editInterests = false;
      this.editProfile = false;
      this.editAffil = true;
    }
    this.currPost = post;
    this.modalService.open(content).result.then((result) => {;
    }, (reason) => {
    });
  }

  upadteProfile(profile) {
    console.log(profile);
    this.modalService.dismissAll();
  }



<<<<<<< HEAD
  loadProfile(username) {
    this.profileService.getWall(username).subscribe(
=======
  loadProfile() {
    this.profileService.getWall(this.user).subscribe(
>>>>>>> d4632fe27f5fd7bd2ae0fe56052c6622033b85c3
      res => {
        console.log(res);
        if (!res.error) {
          this.profile = res.result.profile;
          let postsArray = res.result.posts;

          for (let i = 0; i < postsArray.length; i++) {
            postsArray[i].createdAt = this.commonService.time_ago(postsArray[i].createdAt);
            if (postsArray[i].parent == null) {
              this.posts.push(postsArray[i]);
              postsArray[i].children.sort((a,b) => {
                let date1 = new Date(a.createdAt);
                let date2 = new Date(b.createdAt);
                return (date1.getTime() - date2.getTime()) ;
              });
            }

            if (postsArray[i].children) {
              for (let k = 0; k < postsArray[i].children.length; k++) {
                postsArray[i].children[k].createdAt =
                this.commonService.time_ago(postsArray[i].children[k].createdAt);
              }
            }


            let username = localStorage.getItem('username');
            for (let j = 0; j < postsArray[i].reactions.length; j++) {
              if (postsArray[i].reactions[j].username == username) {
                console.log("here");
                postsArray[i].likedByUser = true;
                break;
              }
            }
          }
          this.affiliations = res.result.affiliations;

          for (let i = 0; i < res.result.profile.affiliations.length; i++) {
            this.afil.push(res.result.profile.affiliations[i].name);
          }
          this.afilCopy = this.commonService.copy(this.afil, []);
          this.buildAffilationString();

          for (let i = 0; i < res.result.profile.interests.length; i++) {
            this.interest.push(res.result.profile.interests[i].name);
          }
          this.copyInterest = this.commonService.copy(this.interest, []);
          this.buildInterestString();
        }
      },
      err => {
        alert("connection timout");
      }
    )
  }




  postLike(post) {
    // let data = {
    //   postId: post.postId,
    //   username: localStorage.getItem('username'),
    //   type: 'like',
    // }
    // this.feedService.like(data).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.success) {
    //       post.reactions.push(data);
    //       post.likedByUser = true;
    //     }
    //   },
    //   err => {
    //     alert("connection timout");
    //   }
    // )

    this.commonService.postLike(post);
  }

  postComment(comment) {
    // let parent = this.currPost;
    // let data = {
    //   wall : parent.wall,
    //   content: comment.form.value.content,
    //   creator: localStorage.getItem('username'),
    //   parent: parent.postId,
    //   pictureId: "null",
    //   type: 'post',
    // }
    // this.modalService.dismissAll();
    //
    // this.feedService.post(data).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.success) {
    //       parent.children.push(data);
    //     }
    //   },
    //   err => {
    //     alert("Connection timout");
    //   }
    // )
    this.commonService.postComment(comment, this.currPost);
    this.modalService.dismissAll();
  }

  updateBio(bio) {
    console.log(bio);
    let data = {
      firstName : this.profile.firstName,
      lastName : this.profile.lastName,
      email: this.profile.email,
      birthday: this.profile.birthday,
      about : bio.form.value.content
    }
    this.modalService.dismissAll();
    this.profileService.updateProfile(data).subscribe(
      res => {
        if (!res.error) {
          this.profile.about = data.about;
        } else {
          alert("something went wrong");
        }
      },
      err => {
        alert("something went wrong");
      }
    )
  }

  updateInterests(affiliations) {
    console.log(affiliations);
    let obj = affiliations.model;
    let arr = []
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].value == null) {
        arr.push(obj[i]);
      } else {
        arr.push(obj[i].value);
      }
    }

    this.modalService.dismissAll();
    for (let i = 0; i < arr.length; i++) {
      let activity = arr[i];
      if (!this.interest.includes(activity)){
        this.profileService.addInterest(
          {
            name: activity,
            type: 'activity'
          }
        ).subscribe(
          res => {
            console.log(res);
            if (!res.error) {
              this.copyInterest.push(activity);
              this.buildInterestString();
            } else {
              alert("sommething went wrong")
            }
          },
          err => {
            alert("something went wrong");
          }
        )
      }
    }

    console.log(this.interest);
    console.log(arr);
    for (let i = 0; i < this.copyInterest.length; i++) {
      if (!arr.includes(this.copyInterest[i])) {
        console.log("REMOVOING");
        this.profileService.removeInterest({
          name: this.copyInterest[i]
        }).subscribe(
          res => {
            if (!res.error) {
              this.copyInterest = this.commonService.remove(this.copyInterest, this.copyInterest[i]);
              this.buildInterestString();
            }
          }
        );
      }
    }
  }

  updateAffiliations(affilations){
    console.log(affilations);
    let obj = affilations.form.value.affiliations;
    let arr = []
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].value == null) {
        arr.push(obj[i]);
      } else {
        arr.push(obj[i].value);
      }
    }

    this.modalService.dismissAll();
    for (let i = 0; i < arr.length; i++) {
      let activity = arr[i];
      if (!this.afil.includes(activity)){
        this.profileService.addAffiliation(
          {
            name: activity,
            type: 'affiliation'
          }
        ).subscribe(
          res => {
            console.log(res);
            if (!res.error) {
              this.afilCopy.push(activity);
              this.buildAffilationString();
            } else {
              alert("sommething went wrong")
            }
          },
          err => {
            alert("something went wrong");
          }
        )
      }
    }

    for (let i = 0; i < this.afilCopy.length; i++) {
      if (!arr.includes(this.afilCopy[i])) {
        console.log("REMOVOING");
        this.profileService.removeAffiliation({
          name: this.afilCopy[i]
        }).subscribe(
          res => {
            if (!res.error) {
              this.afilCopy = this.commonService.remove(this.afilCopy, this.afilCopy[i]);
              this.buildAffilationString();
            }
          }
        );
      }
    }
  }

  buildAffilationString() {
    this.afilString = '';
    let arr = []
    for (let i = 0; i < this.afil.length; i++) {
      if (this.afil[i].value == null) {
        arr.push(this.afil[i]);
      } else {
        arr.push(this.afil[i].value);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        this.afilString = this.afilString + arr[i];
      } else {
        this.afilString = this.afilString+ arr[i] + ', ';
      }
    }
  }

  buildInterestString() {
    this.interestString = '';
    let arr = []
    console.log(this.interest);
    for (let i = 0; i < this.interest.length; i++) {
      if (this.interest[i].value == null) {
        arr.push(this.interest[i]);
      } else {
        arr.push(this.interest[i].value);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        this.interestString = this.interestString + arr[i];
      } else {
        this.interestString = this.interestString+ arr[i] + ', ';
      }
    }
  }



}
