import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service'
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: String = null;
  profile: any = {};
  isFriend: boolean = true;

  constructor(
    private api: ApiService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) { }


  myPage() {
    return this.user == localStorage.getItem('username')
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = params.user;
      this.profile = {};
      this.loadProfile();
      this.loadIsFriend();
    });

  }

  addFriend() {
    this.profileService.addFriend({ friend: this.user }).subscribe(
      res => this.isFriend = true,
      err => console.error(err),
    );
  }

  loadProfile() {
    this.api.get(`profile/${this.user}`).subscribe(
      res => this.profile = res.result,
      err => console.error(err)
    );
  }

  updateAbout(value) {
    this.profile.about = value;
    this.updateProfile({about: value});
  }

  updateProfile(data) {
    data['username'] = this.user;
    this.api.post('profile/update', data).subscribe(
      res => {},
      err => console.error(err)
    )
  }

  loadIsFriend() {
    this.api.get(`friend/${this.user}`).subscribe(
      res => this.isFriend = res.result,
      err => console.error(err)
    );
  }

  toString(list) {
    return (list || []).map(a => a.name).join(', ') || "---";
  }
}
