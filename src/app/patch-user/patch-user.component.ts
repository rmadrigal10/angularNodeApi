import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from 'src/models/user.model';
import { UpdateUserDTO } from 'src/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patch-user',
  templateUrl: './patch-user.component.html',
  styleUrls: ['./patch-user.component.scss']
})
export class PatchUserComponent implements OnInit {

  form: FormGroup;
  users: User[] = [];
  id: string;

  constructor(private userService: UsersService,
    private aRouter: ActivatedRoute,
    private buildForm: FormBuilder) {
      this.form = this.buildForm.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required, Validators.minLength(2)]],
        direccion: ['', [Validators.required, Validators.minLength(20)]],
        email: ['', [Validators.required, Validators.email]]
      });
      this.id = this.aRouter.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
  }

  putUser(){
    this.userService.getUserById(this.id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        direccion: data.direccion,
        email: data.email
      })
    })
  }

}
