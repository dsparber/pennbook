import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../../sockets/socket.service';
import { ApiService } from 'src/app/api/api.service';

@Injectable()
export class ChatService {

    private socket:io;

    constructor(private api: ApiService, private socketService: SocketService) { 
        this.socket = socketService.socket;
    }


    loadMessages(chatId, friend) {
        let data =  {
            chatId: chatId,
            friend: friend,
        };
        return this.api.post(`chat`, data);
    }

    removeChat(chatId) {
        let data =  {
            chatId: chatId,
        };
        return this.api.post(`chat/leave`, data);
    }

    loadChats() {
        return this.api.get(`chat/all`);
    }

    //Sends Join data to server
    joinChat(data) {
        this.socket.emit('join', data);
    }

    //Sends Leave Data to server
    leaveChat(data){
        this.socket.emit('leave',data);
    }

    //Sends Message to server
    public sendMessage(message) {
        this.socket.emit('message', message);
    }

    //Receives Message from server
    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    //Receives New User data from server
    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    //Receives User Left Room data from server 
    userLeftChat(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}
