import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-users',
  templateUrl: './post-users.component.html',
  styleUrls: ['./post-users.component.scss']
})
export class PostUsersComponent implements OnInit {

  form: FormGroup;
  users: User[] = [];

  constructor(private userService: UsersService,
    private buildForm: FormBuilder) {
      this.form = this.buildForm.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required, Validators.minLength(2)]],
        direccion: ['', [Validators.required, Validators.minLength(20)]],
        email: ['', [Validators.required, Validators.email]]
      });
   }

  ngOnInit(): void {
  }

  createUser(){
    const user: CreateUserDTO = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      direccion: this.form.get('direccion')?.value,
      email: this.form.get('email')?.value
    }
    this.userService.createUser(user)
    .subscribe(res => {
      console.log(res);
    })
    this.form.reset();
  }

}
