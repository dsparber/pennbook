import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Posts} from './../posts'

const API_URL = 'http://localhost:8080/api/';
const TOKEN = `Bearer ${localStorage.getItem('token')}`;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) {

  }

  
  public getFeed() {
    return this.httpClient.get<Posts>(API_URL + 'wall', {headers: {
      Authorization: TOKEN
    }});
  }

  public like(reaction) {
    return this.httpClient.post<any>(API_URL + 'reaction', reaction, {headers: {
      Authorization: TOKEN
    }});
  }

  public post(post) {
    return this.httpClient.post<any>(API_URL + 'post', post, {headers: {
      Authorization: TOKEN
    }});
  }

}
