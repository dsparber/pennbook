import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/';
const TOKEN = `Bearer ${localStorage.getItem('token')}`;

@Injectable()
export class ChatService {

    private socket = io('localhost:8080');

    constructor(private httpClient: HttpClient) { }


    loadMessages(chatId, friend) {
        let data =  {
            chatId: chatId,
            friend: friend,
        };
        return this.httpClient.post<any>(`${API_URL}chat`, data, {headers: {
            Authorization: TOKEN,
        }});
    }

    loadChats() {
        return this.httpClient.get<any>(`${API_URL}chat/all`, {headers: {
            Authorization: TOKEN,
        }});
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
        this.socket.emit('message',message);
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
