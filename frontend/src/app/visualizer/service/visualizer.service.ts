import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = "http://localhost:8080/api/";
const TOKEN = `Bearer ${localStorage.getItem('token')}`;

@Injectable({
  providedIn: 'root'
})

export class VisualizerService {
  constructor(private httpClient: HttpClient) { }

  public getGraph(selected) {
    let url = `${API_URL}graph`;
    if (selected) {
      url += `/${selected}`;
    }
    return this.httpClient.get<any>(url, { headers: {
      Authorization: TOKEN
    }});
  }
}
