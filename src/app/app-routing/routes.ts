import { Routes } from '@angular/router';
import { GetUsersComponent } from '../get-users/get-users.component';
import { PostUsersComponent } from '../post-users/post-users.component';

export const routes: Routes = [
    {path: 'users', component: GetUsersComponent},
    {path: 'post/:id', component: PostUsersComponent},
    {path: '', redirectTo: '/users', pathMatch: 'full'}
  ]