import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {AuthGuardService} from './service/authentication/auth-guard.service';
import {LogoutComponent} from './component/logout/logout.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ChangeLoginComponent} from './component/profile/change-login/change-login.component';
import {CreatePackageComponent} from './component/create-package/create-package.component';
import {CreateSenderReceiverComponent} from './component/create-package/create-sender-receiver/create-sender-receiver.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'profile/change', component: ChangeLoginComponent, canActivate: [AuthGuardService]},
  { path: 'createPackage', component: CreatePackageComponent, canActivate: [AuthGuardService]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
