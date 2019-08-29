import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      response => this.handleSuccessfulResponse(response)
     );
  }

  handleSuccessfulResponse(response)
  {
    this.users = response;
  }

}
