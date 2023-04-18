import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://api.taskmanager.lt';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/login`, {
      username,
      password
    }, 
    { 
      observe: 'response' 
    });
  }

    signup(username: string, password: string, confirmpassword: string) {
      return this.http.post(`${this.ROOT_URL}/register`, {
        username,
        password,
        confirmpassword
      }, 
      { 
        observe: 'response' 
      });
  }
}
