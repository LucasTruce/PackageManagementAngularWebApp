import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../service/user/user.service';
import {UserDetails, UserDetailsService} from '../../service/user-details/user-details.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersDetails: UserDetails[];


  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.userDetailsService.getAll().subscribe(
      response => this.handleSuccessfulResponse(response)
     );
  }

  handleSuccessfulResponse(response) {
    this.usersDetails = response;
  }

}
