import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';

const HOST = 'localhost:8080';

@Injectable()
export class SocketService {

    public socket = io(HOST);

    constructor() { }

    sendUsername() {
        let user =  localStorage.getItem('username');
        if (user) {
            this.socket.emit('user', user);
        }
    }
}
