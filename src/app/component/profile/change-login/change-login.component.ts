import { Component, OnInit } from '@angular/core';
import {User} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  updatePassword() {

  }

}
