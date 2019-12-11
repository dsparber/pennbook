import { Component, OnInit } from '@angular/core';
import { SignInService } from './service/sign-in.service';
import { SocketService } from '../sockets/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model : any = {};
  sign : any = {};
  constructor(public signInService: SignInService, public router: Router, private socketService: SocketService) { }

  ngOnInit() {

  }

  registerUser(form) {
    let user = form.value;
    let data = {
      username: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.firstName,
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
        this.socketService.sendUsername();
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
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', data.username);
          this.socketService.sendUsername();
          this.router.navigateByUrl('/feed');
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
