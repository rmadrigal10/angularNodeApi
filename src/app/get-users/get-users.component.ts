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
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  deleteUser(id: string){
      this.userService.deleteUser(id)
      .subscribe(data => {
        console.log('usuario borrado exitosamente');
      })
    }

}
