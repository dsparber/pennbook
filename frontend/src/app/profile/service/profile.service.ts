import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/';
const TOKEN = `Bearer ${localStorage.getItem('token')}`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  public getWall(username) {
    console.log(TOKEN);
    return this.httpClient.get<any>(`${API_URL}wall/${username}`, {headers: {
      Authorization: TOKEN
    }});
  }

  public addInterest(interest) {
    return this.httpClient.post<any>(`${API_URL}interest/add`, interest, {headers: {
      Authorization: TOKEN
    }})
  }

  public removeInterest(interest) {
    return this.httpClient.post<any>(`${API_URL}interest/remove`, interest, {headers: {
      Authorization: TOKEN
    }})
  }

  public addAffiliation(affiliation) {
    return this.httpClient.post<any>(`${API_URL}affiliation/add`, affiliation, {headers: {
      Authorization: TOKEN
    }})
  }

  public removeAffiliation(affiliation) {
    return this.httpClient.post<any>(`${API_URL}affiliation/remove`, affiliation, {headers: {
      Authorization: TOKEN
    }})
  }

  public updateProfile(profile) {
    return this.httpClient.post<any>(`${API_URL}profile/update`, profile, {headers: {
      Authorization: TOKEN
    }})
  }


}
