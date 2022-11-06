import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API  = "https://localhost:7232/api/User"

  constructor(private http:HttpClient) { }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(this.API + "/getAll")
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(this.API + "/create", user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
