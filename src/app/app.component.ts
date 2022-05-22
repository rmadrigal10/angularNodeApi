import { Component, ElementRef } from '@angular/core';
import { CreateUserDTO, User, UpdateUserDTO } from 'src/models/user.model';
import { UsersService } from './services/users.service';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApi';

  form!: FormGroup;

  users: User[] = [];

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ){ this.buildForm(); }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

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

  // createUser(){
  //   const user: CreateUserDTO = {
  //     nombre: '',
  //     apellido: '',
  //     direccion: '',
  //     email: ''
  //   } as User;
  //   this.userService.createUser(user)
  //   .subscribe(user => {
  //     this.users.push(user)
  //   });
  // }

  createUser(){
   const data = this.form.value;
   this.userService.createUser(data)
   .subscribe(data => {
     this.users.push(data);
   });
  }

  get nombre(){
    return this.form.get('nombre');
  }
  get apellido(){
    return this.form.get('apellido');
  }
  get direccion(){
    return this.form.get('direccion');
  }
  get email(){
    return this.form.get('email');
  }

  // updateUser(){
  //   const changes: UpdateUserDTO = {
  //     nombre: ''
  //   };
  //   const id = this.userChosen.id;
  //   this.userService.updateUser(id, changes)
  //   .subscribe(data => {
  //     const userIndex = this.users.findIndex(item => item.id === this.userChosen.id);
  //     this.users[userIndex] = data;
  //     this.userChosen = data;
  //   })
  // }

  // delete(user: User): void {
  //   this.users = this.users.filter(h => h !== user);
  //   this.userService
  //     .deleteUser(user.id);
  // }

  // onSubmit(){
  //   this.createUser.set(this.form.value);
  // }

}
