import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasicAuthHttpInterceptorService} from './service/authentication/basic-auth-http-interceptor.service';
import { LogoutComponent } from './component/logout/logout.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangeLoginComponent } from './component/profile/change-login/change-login.component';
import { CreatePackageComponent } from './component/create-package/create-package.component';
import { CreateSenderReceiverComponent } from './component/create-package/create-sender-receiver/create-sender-receiver.component';
import { CreateProductComponent } from './component/create-package/create-product/create-product.component';
import { PackagesInfoComponent } from './component/profile/packages-info/packages-info.component';
import { AdminComponent } from './component/admin/admin.component';
import { NavigationComponent } from './component/profile/navigation/navigation.component';
import { AdminChangeLoginComponent } from './component/admin/admin-change-login/admin-change-login.component';
import { AdminUsersComponent } from './component/admin/admin-users/admin-users.component';
import { AdminWarehousesComponent } from './component/admin/admin-warehouses/admin-warehouses.component';
import { AddWarehouseComponent } from './component/admin/admin-warehouses/add-warehouse/add-warehouse.component';
import { AdminCarsComponent } from './component/admin/admin-cars/admin-cars.component';
import { AddCarComponent } from './component/admin/admin-cars/add-car/add-car.component';
import { AddUserComponent } from './component/admin/admin-users/add-user/add-user.component';
import { UserDetailsComponent } from './component/admin/admin-users/user-details/user-details.component';
import { UserEditComponent } from './component/admin/admin-users/user-edit/user-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    RegistrationComponent,
    ProfileComponent,
    ChangeLoginComponent,
    CreatePackageComponent,
    CreateSenderReceiverComponent,
    CreateProductComponent,
    PackagesInfoComponent,
    AdminComponent,
    NavigationComponent,
    AdminChangeLoginComponent,
    AdminUsersComponent,
    AdminWarehousesComponent,
    AddWarehouseComponent,
    AdminCarsComponent,
    AddCarComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
