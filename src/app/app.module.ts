import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule} from '@angular/forms';
import {BasicAuthHttpInterceptorService} from './service/authentication/basic-auth-http-interceptor.service';
import { LogoutComponent } from './component/logout/logout.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangeLoginComponent } from './component/profile/change-login/change-login.component';
import { CreatePackageComponent } from './component/create-package/create-package.component';
import { CreateSenderReceiverComponent } from './component/create-package/create-sender-receiver/create-sender-receiver.component';

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
    CreateSenderReceiverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
