import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../sign-in/service/sign-in.service';
import { SocketService } from '../sockets/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  model : any = {};
  sign : any = {};


  constructor(private router: Router, private signInService: SignInService, private socketService: SocketService) { }

  logout() {
    this.router.navigate(['/signin']);
    console.log('logout');

    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  loggedIn() {
    return localStorage.getItem('token') != null;
  }

  login(form) {
    let user = form.value;
    form.reset();
    this.signInService.login(user).subscribe(res => {
      if (!res.success) {
        alert("Something went wrong: " + JSON.stringify(res.error));
      } else {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', user.username);
          this.socketService.sendUsername();
          this.router.navigateByUrl('/feed');
        } else {
          alert("Invalid username or password " + JSON.stringify(res.error));
        }
      }
    },
    err => {
      alert("Error: connection failed");
      console.log(err);
    });
  }

  ngOnInit() {
  }
}
