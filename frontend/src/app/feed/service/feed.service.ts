import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Posts} from './../posts'

const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) {

  }

  public getFeed() {
    return this.httpClient.get<Posts>(API_URL + 'wall', {headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }});
  }

}
