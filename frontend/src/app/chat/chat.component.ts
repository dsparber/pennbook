import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
    message:String = null;
    chat:any = null;
    chats:any = [];

    constructor(private _chatService: ChatService,  private route: ActivatedRoute, private router: Router){
      //displays data received from server to client
      this._chatService.newUserJoined()
        .subscribe(data=> this.chat.messages.push(data));

      this._chatService.userLeftChat()
      .subscribe(data=>this.chat.messages.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=>this.chat.messages.push(data));
    }


    //join is the method in html
    join() {
      this._chatService.joinChat({user:this.chat.user, room:this.chat.chatId});
    }

    leave(){
      this._chatService.leaveChat({user:this.chat.user, room:this.chat.chatId});
  }

    sendMessage() {
        this._chatService.sendMessage({user:this.chat.user, room:this.chat.chatId, message:this.message});
        this.message = "";
    }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (this.chat) {
          this._chatService.leaveChat(this.chat.chatId);
        }
        let chatId = params.id;
        let friend = params.friend;
        if (chatId || friend) {
          this._chatService.loadMessages(chatId, friend).subscribe(
            res => {
              this.chat = res.result;
              this.join();
              this.router.navigate(['/chat'], { queryParams: { id: this.chat.chatId } });
            },
            err => console.log(err),
          );
        } else {
          this.chat = null;
        }
      });
      
      this._chatService.loadChats().subscribe(
        res => {
          console.log(res);
          this.chats = res.result;
        },
        err => console.log(err),
      );
    }

}
