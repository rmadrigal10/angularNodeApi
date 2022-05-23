import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, CreateUserDTO, UpdateUserDTO } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http.get<User[]>(`${this.api}/users`);
  }

  getUserById(id: string){
    return this.http.get<User>(`${this.api}/users/${id}`);
  }

  createUser(dto: CreateUserDTO){
    return this.http.post<User>(`${this.api}/users`, dto); 
  }

  updateUser(id: string, dto: UpdateUserDTO){
    return this.http.put<User>(`${this.api}/users/${id}`, dto);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`${this.api}/users/${id}`);
  }

}
