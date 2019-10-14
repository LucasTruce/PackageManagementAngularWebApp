import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {User, UserService} from '../../../../service/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  user: User = new User('', '', '');
  roles: object[] = [{id: 1, name: 'ROLE_USER'}, {id: 2, name: 'ROLE_WORKER'}, {id: 3, name: 'ROLE_ADMIN'}];

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.userService.getUserById(this.id).subscribe(
      results => {
        this.successfulResponseUser(results);

      }
    );
  }

  customCompareCategory(o1: any, o2: any) {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }

  updateUser() {

  }

  successfulResponseUser(response) {
    this.user = response;
  }

}
