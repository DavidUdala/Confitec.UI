import { UserListDto } from './../interface/userListDto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../interface/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = "https://localhost:7232/api/User"

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserListDto[]> {
    return this.http.get<UserListDto[]>(`${this.API}/getAll`);
  }

  getById(id : number) : Observable<User>{
    return this.http.get<User>(`${this.API}/getById/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/create`, user, {
    });
  }

  update(user: UserDto): Observable<User>{
    return this.http.put<User>(`${this.API}/update`, user)
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API}/delete/${id}`)
  }
}
