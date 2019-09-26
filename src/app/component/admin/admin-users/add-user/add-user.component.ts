import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {WarehouseService} from '../../../../service/warehouse/warehouse.service';
import {Router} from '@angular/router';
import {CodeService} from '../../../../service/code/code.service';
import {User, UserService} from '../../../../service/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User('','', '');

  constructor(private authService: AuthenticationService, private userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.registerUser(this.user).subscribe(
      response => {
        this.successfulResponseUser(response);
        this.router.navigate(['/admin/users']);
      }
    );
  }

  successfulResponseUser(response) {
    this.user = response;
  }



}
