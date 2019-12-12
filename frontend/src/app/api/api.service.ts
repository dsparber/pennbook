import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const HOST = 'ec2-3-84-147-190.compute-1.amazonaws.com'

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    host() {
        return HOST;
    }

    apiUrl() {
        return `http://${this.host()}/api/`;
    }

    token() {
        return `Bearer ${localStorage.getItem('token')}`;
    }

    post(path, data) {
        return this.httpClient.post<any>(`${this.apiUrl()}${path}`, data, {headers: {
            Authorization: this.token(),
        }});
    }

    get(path) {
        return this.httpClient.get<any>(`${this.apiUrl()}${path}`, {headers: {
            Authorization: this.token(),
        }});
    }
}
