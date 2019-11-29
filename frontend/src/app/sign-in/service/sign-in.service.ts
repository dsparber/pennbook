import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SignIn} from './../signin'

const API_URL = "http://localhost:8080/api/";

@Injectable({
  providedIn: 'root'
})

export class SignInService {


  constructor(private httpClient: HttpClient) { }

  public login(user) {
    return this.httpClient.post<SignIn>(API_URL + "login", user);
  }

  public signup(user) {
    return this.httpClient.post<SignIn>(API_URL + "signup", user);
  }
}
