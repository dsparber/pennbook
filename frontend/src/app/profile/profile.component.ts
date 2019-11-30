import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
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
  myPage = false;
  profile:any = {
    firstName: 'Stefan',
    lastName: 'Papazov',
    university: 'Penn',
    job: "Facebook",
    location: "Philadelphia",
    interests: ["swimming", "running"],

  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {;
    }, (reason) => {
    });
  }

  editProfile(profile) {
    console.log(profile);
  }

}
