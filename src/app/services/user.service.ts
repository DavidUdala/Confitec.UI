import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API  = "https://localhost:7232/api/User"

  constructor(private http:HttpClient) { }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(this.API + "/getAll")
  }
}
