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

  constructor(public signInService: SignInService, public router: Router) { }

  ngOnInit() {

  }

  registerUser(form) {
    let user = form.value;
    console.log(user);
    this.signInService.signup(user).subscribe(res => {
      if (!res.success) {
        alert("Something went wrong: " + res.error)
      } else {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/feed');
      }
    },
    err => {
      alert("Error: connection failed");
      console.log(err);
    });

  }

  login(form) {
    let user = form.value;

    this.signInService.login(user).subscribe(res => {
      if (!res.success) {
        alert("Something went wrong: " + res.error)
      } else {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/feed');
      }
    },
    err => {
      alert("Error: connection failed");
      console.log(err);
    });
  }

}
