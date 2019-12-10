import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
    user:String;
    room:String;
    message:String;
    messageArray:Array<{user:String,message:String}> = [];

    constructor(private _chatService: ChatService){}

    //join is the method in html
    join() {
      this._chatService.joinChat({user:this.user, room:this.room});
    }

    sendMessage() {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.message});
    }

    ngOnInit() {
    }

}
