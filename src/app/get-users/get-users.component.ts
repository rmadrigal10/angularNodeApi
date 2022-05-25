import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from 'src/models/user.model';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss']
})
export class GetUsersComponent implements OnInit {

  faPen = faPen;
  faXmark = faXmark;

  users: User[] = [];

  columnas: string[] = ['id', 'nombre', 'apellido', 'direccion', 'email', 'actions'];

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  deleteUser(user: User){
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id)
    .subscribe();
  }



}
