import { Component, OnInit } from '@angular/core';
import { SocketService } from './sockets/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PennBook';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.sendUsername();
  }
}
