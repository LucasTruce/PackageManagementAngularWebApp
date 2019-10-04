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
import {PackagesInfoComponent} from './component/profile/packages-info/packages-info.component';
import {AdminComponent} from './component/admin/admin.component';
import {AdminChangeLoginComponent} from './component/admin/admin-change-login/admin-change-login.component';
import {AdminUsersComponent} from './component/admin/admin-users/admin-users.component';
import {AdminWarehousesComponent} from './component/admin/admin-warehouses/admin-warehouses.component';
import {AddWarehouseComponent} from './component/admin/admin-warehouses/add-warehouse/add-warehouse.component';
import {AdminCarsComponent} from './component/admin/admin-cars/admin-cars.component';
import {AddCarComponent} from './component/admin/admin-cars/add-car/add-car.component';
import {AddUserComponent} from './component/admin/admin-users/add-user/add-user.component';
import {UserDetailsComponent} from './component/admin/admin-users/user-details/user-details.component';
import {UserEditComponent} from './component/admin/admin-users/user-edit/user-edit.component';
import {LocationPackageComponent} from './component/location-package/location-package.component';
import {EditWarehouseComponent} from './component/admin/admin-warehouses/edit-warehouse/edit-warehouse.component';
import {EditCarComponent} from './component/admin/admin-cars/edit-car/edit-car.component';
import {PackageDetailsComponent} from './component/profile/packages-info/package-details/package-details.component';
import {EditPackageComponent} from './component/profile/packages-info/edit-package/edit-package.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegistrationComponent},

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'profile/change', component: ChangeLoginComponent, canActivate: [AuthGuardService]},
  { path: 'profile/packages-info', component: PackagesInfoComponent, canActivate: [AuthGuardService]},
  { path: 'profile/packages-info/:id', component: PackageDetailsComponent, canActivate: [AuthGuardService]},
  { path: 'profile/packages-info/:id/editPackage', component: EditPackageComponent, canActivate: [AuthGuardService]},

  { path: 'createPackage', component: CreatePackageComponent, canActivate: [AuthGuardService]},
  { path: 'locationPackage', component: LocationPackageComponent},

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  { path: 'admin/change', component: AdminChangeLoginComponent, canActivate: [AuthGuardService]},

  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthGuardService]},
  { path: 'admin/users/addUser', component: AddUserComponent, canActivate:[AuthGuardService]},
  { path: 'admin/users/:id/userDetails', component: UserDetailsComponent, canActivate: [AuthGuardService]},
  { path: 'admin/users/:id', component: UserEditComponent, canActivate: [AuthGuardService]},

  { path: 'admin/warehouses', component: AdminWarehousesComponent, canActivate: [AuthGuardService]},
  { path: 'admin/warehouses/addWarehouse', component: AddWarehouseComponent, canActivate: [AuthGuardService]},
  { path: 'admin/warehouses/:id', component: EditWarehouseComponent, canActivate: [AuthGuardService]},


  { path: 'admin/cars', component: AdminCarsComponent, canActivate: [AuthGuardService]},
  { path: 'admin/cars/addCar', component: AddCarComponent, canActivate: [AuthGuardService]},
  { path: 'admin/cars/:id', component: EditCarComponent, canActivate: [AuthGuardService]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
