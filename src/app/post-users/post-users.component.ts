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
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  lastValueFrom
} from 'rxjs';

@Component({
  selector: 'app-post-users',
  templateUrl: './post-users.component.html',
  styleUrls: ['./post-users.component.scss']
})
export class PostUsersComponent implements OnInit {

  form!: FormGroup;
  users: User[] = [];

  data: {
    id: string,
    nombre: string,
    apellido: string,
    direccion: string,
    email: string
  };
  usrData!: any;

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private buildForm: FormBuilder) {
    this.data = {
      id: this.route.snapshot.paramMap.get('id')!,
      nombre: this.route.snapshot.paramMap.get('nombre') !,
      apellido: this.route.snapshot.paramMap.get('apellido') !,
      direccion: this.route.snapshot.paramMap.get('direccion') !,
      email: this.route.snapshot.paramMap.get('email') !
    }
    if (this.data) {
      this.form = this.buildForm.group({
        nombre: [this.data.nombre, [Validators.required, Validators.minLength(2)]],
        apellido: [this.data.apellido, [Validators.required, Validators.minLength(2)]],
        direccion: [this.data.direccion, [Validators.required, Validators.minLength(5)]],
        email: [this.data.email, [Validators.required, Validators.email]]
      });
    } else {
      this.form = this.buildForm.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required, Validators.minLength(2)]],
        direccion: ['', [Validators.required, Validators.minLength(20)]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  }



  ngOnInit(): void {


    console.log('entro');




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
        console.log('esta es la userdata', res);
      })
    this.form.reset();
  }

  


}
