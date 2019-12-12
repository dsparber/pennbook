import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

<<<<<<< HEAD
  public getWall(username) {
    console.log(TOKEN);
    return this.httpClient.get<any>(`${API_URL}wall/${username}`, {headers: {
      Authorization: TOKEN
    }});
=======
  public getWall(user) {
    return this.apiService.get(`wall/${user}`);
>>>>>>> d4632fe27f5fd7bd2ae0fe56052c6622033b85c3
  }

  public addInterest(interest) {
    return this.apiService.post(`interest/add`, interest);
  }

  public removeInterest(interest) {
    return this.apiService.post(`interest/remove`, interest);
  }

  public addAffiliation(affiliation) {
    return this.apiService.post(`affiliation/add`, affiliation);
  }

  public removeAffiliation(affiliation) {
    return this.apiService.post(`affiliation/remove`, affiliation);
  }

  public updateProfile(profile) {
    return this.apiService.post(`profile/update`, profile);
  }
}
