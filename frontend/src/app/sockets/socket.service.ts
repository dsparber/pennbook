import { Injectable } from "@angular/core";
import { ApiService } from '../api/api.service';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

    public socket:io;

    constructor(private api: ApiService) {
        this.socket = io(api.host(),  {secure: true});
    }

    sendUsername() {
        let user =  localStorage.getItem('username');
        if (user) {
            this.socket.emit('user', user);
        }
    }
}
