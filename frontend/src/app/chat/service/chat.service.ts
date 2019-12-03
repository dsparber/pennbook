import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()

export class ChatService{

    private socket = io('http://localhost:4200');

    joinChat(data)
    {
        this.socket.emit('join',data);
    }

    newUserAdded()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user added', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leftGroup(data){
        this.socket.emit('leftGroup',data);
    }

    userLeft(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left group', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}
