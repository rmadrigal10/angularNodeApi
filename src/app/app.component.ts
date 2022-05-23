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

  columnas: string[] = ['id', 'nombre', 'apellido', 'direccion', 'email'];

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

  createUser(){
   const data = this.form.value;
   this.userService.createUser(data)
   .subscribe(data => {
     this.users.push(data);
     this.getAllUsers();
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

  deleteUser(user: User){
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id)
    .subscribe();
  }

  resetForm(){
    const formReset = this.form.value;
    this.nombre?.setValue(''),
    this.apellido?.setValue(''),
    this.direccion?.setValue(''),
    this.email?.setValue('')
    return formReset.value;
  }

}
