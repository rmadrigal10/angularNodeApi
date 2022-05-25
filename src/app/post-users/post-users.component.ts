import {
  Component,
  OnInit
} from '@angular/core';
import {
  UsersService
} from '../services/users.service';
import {
  CreateUserDTO,
  User
} from '../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-post-users',
  templateUrl: './post-users.component.html',
  styleUrls: ['./post-users.component.scss']
})
export class PostUsersComponent implements OnInit {

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
    this.id = this.aRouter.snapshot.paramMap.get('id') !;
  }

  ngOnInit(): void {
    this.setUser();
  }

  createUser() {
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

  setUser() {
    if (this.id !== null) {
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

}
