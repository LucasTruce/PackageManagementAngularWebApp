import { Component, OnInit } from '@angular/core';
import {Password, PasswordService} from '../../../service/password/password.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  password: Password;
  constructor(private passwordService: PasswordService) { }

  ngOnInit() {
  }

  updatePassword() {

  }

}
