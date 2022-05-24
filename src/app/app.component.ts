import { Component, ElementRef } from '@angular/core';
import { CreateUserDTO, User, UpdateUserDTO } from 'src/models/user.model';
import { UsersService } from './services/users.service';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApi';

  faPen = faPen;
  faXmark = faXmark;

  form!: FormGroup;

  usrIndex!: User;

  users: User[] = [];

  columnas: string[] = ['id', 'nombre', 'apellido', 'direccion', 'email', 'actions'];

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ){ this.buildForm()
    }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // get nombre(){
  //   return this.form.get('nombre');
  // }
  // get apellido(){
  //   return this.form.get('apellido');
  // }
  // get direccion(){
  //   return this.form.get('direccion');
  // }
  // get email(){
  //   return this.form.get('email');
  // }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  // getUserById(id: string){
  //   this.userService.getUserById(id)
  //   .subscribe(users => {
  //     console.log(users)
  //   })
  // }

  // createUser(){
  //  const data = this.form.value;
  //  this.userService.createUser(data)
  //  .subscribe(data => {
  //    this.users.push(data);
  //    this.getAllUsers();
  //  });
  // }
  
  createUser(){
    const user: CreateUserDTO = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      direccion: this.form.get('direccion')?.value,
      email: this.form.get('email')?.value
    }
    this.userService.createUser(user)
    .subscribe(res => {
      console.log(user);
    })
    this.form.reset();
    this.getAllUsers();
  }

  deleteUser(user: User){
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id)
    .subscribe();
  }

  // submitData(id: string, user: User){
  //   const body = {
  //     nombre: user.nombre,
  //     apellido: user.apellido,
  //     direccion: user.direccion,
  //     email: user.apellido
  //   }

  //   this.userService.updateUser(id,body)
  //   .subscribe(respose => {
  //     console.log(respose);
  //   });

  // }

}
