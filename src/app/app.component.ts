import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApi';

  constructor(
    private userService: UsersService
  ){}

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(users => {
      console.log(users);
    });
  }

}