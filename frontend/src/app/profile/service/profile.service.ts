import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

  public getWall() {
    return this.apiService.get(`wall/${localStorage.getItem('username')}`);
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
