import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiBaseUrl;
  profileData = new BehaviorSubject(this.getProfileData());
  constructor(private http: HttpClient) {}

  public getAllUsers(postData: any): Observable<any> {
    return this.http.post(`${this.url}user/listUsers`, postData);
  }
  public signUp(postData: any): Observable<any> {
    return this.http.post(`${this.url}user/signUp`, postData);
  }

  public signIn(postData: any): Observable<any> {
    return this.http.post(`${this.url}user/signIn`, postData);
  }

  public updateProfile(postData: any): Observable<any> {
    return this.http.post(`${this.url}user/editProfile`, postData);
  }

  public getProfileData(): any {
    const userData: any = localStorage.getItem('machineTestUser');
    return userData ? JSON.parse(userData) : null;
  }
}
