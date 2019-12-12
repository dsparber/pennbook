import { Component, OnInit } from '@angular/core';
import { SignInService } from './service/sign-in.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model : any = {};
  sign : any = {};
  constructor(public signInService: SignInService, public router: Router) { }

  ngOnInit() {

  }

  registerUser(form) {
    let user = form.value;
    let data = {
      username: user.email,
      password: user.password,
      profile: {
        fullName: user.firstName,
        email: user.email,
        birthday: user.birthday
      }
    }

    console.log(data);
    this.signInService.signup(data).subscribe(res => {
      if (!res.success) {
        alert("Something went wrong: " + JSON.stringify(res.error))
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', data.username);
        this.router.navigateByUrl(`/profile/${data.username}`);
      }
    },
    err => {
      alert("Error: connection failed");
      console.log(err);
    });

  }

  login(form) {
    let user = form.value;
    console.log(form);
    let data = {
      username: user.username,
      password: user.password
    }

    this.signInService.login(user).subscribe(res => {
      if (!res.success) {
        alert("Something went wrong: " + JSON.stringify(res.error));
      } else {
        if (res.token) {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', data.username);
          this.router.navigateByUrl(`/profile/${data.username}`);
        } else {
          console.log(res.token);
          alert("Invalid username or password " + JSON.stringify(res.error));
        }
      }
    },
    err => {
      alert("Error: connection failed");
      console.log(err);
    });
  }

}
