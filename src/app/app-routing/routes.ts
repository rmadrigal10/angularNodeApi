import { Routes } from '@angular/router';
import { GetUsersComponent } from '../get-users/get-users.component';
import { PostUsersComponent } from '../post-users/post-users.component';
import { PatchUserComponent } from '../patch-user/patch-user.component';

export const routes: Routes = [
    {path: 'users', component: GetUsersComponent},
    {path: 'new', component: PostUsersComponent},
    {path: 'edit', component: PostUsersComponent},
    {path: '', redirectTo: '/users', pathMatch: 'full'}
  ]