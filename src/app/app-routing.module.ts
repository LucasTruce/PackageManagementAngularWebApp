import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {UserListComponent} from './component/user-list/user-list.component';
import {AuthGuardService} from './service/authentication/auth-guard.service';


const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
