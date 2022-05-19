import { Component } from '@angular/core';
import { CreateUserDTO, User, UpdateUserDTO } from 'src/models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApi';

  userChosen: User = {
    id: '',
    nombre: '',
    apellido: '',
    direccion: '',
    email: ''
  }

  constructor(
    private userService: UsersService
  ){}

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(users => {
      console.log(users);
    });
  }

  getUserById(id: string){
    this.userService.getUserById(id)
    .subscribe(users => {
      console.log(users)
    })
  }

  createUser(){
    const user: CreateUserDTO = {
      nombre: '',
      apellido: '',
      direccion: '',
      email: ''
    }
    this.userService.createUser(user)
    .subscribe(data => {
      console.log(data);
    });
  }

  updateUser(){
    const changes: UpdateUserDTO = {
      nombre: ''
    }
    const id = this.userChosen.id;
    this.userService.updateUser(id, changes)
    .subscribe
  }

}
