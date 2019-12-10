import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()

export class ChatService {

    private socket = io('http://localhost:8080/api');

    joinChat(data) {
        this.socket.emit('join', data);
    }

    public sendMessage(message) {
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
