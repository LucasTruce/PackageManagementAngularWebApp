import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserService} from '../../../../service/user/user.service';
import {UserDetails, UserDetailsService} from '../../../../service/user-details/user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User = new User('', '', '');
  userDetails: UserDetails = new UserDetails('', '', '', '', '', '', '');
  error: object = {};

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.userService.getUserById(this.id).subscribe(
      response => {
        this.successfulResponseUser(response);
        if(this.user.userDetails != null) {
          this.userDetails = this.user.userDetails;
        }
      }
    );
  }

  createUserDetails() {
    if(this.userDetails.id === '') {
      this.userDetailsService.saveUserDetails(this.userDetails, this.user.login).subscribe(
        response => {
          this.successfulResponseUserDetails(response);
          //this.router.navigate(['/admin/users/', this.user.id, 'userDetails']);
        },
        er => {
          const errors = er.error.errors;

          for (const err of errors) {   //walidacja, przechwytujemy bledy
            const field = err.field;
            const message = err.defaultMessage;
            this.error[field] = message;
          }
        }
      );
    }
    else {
      this.userDetails.id = this.user.userDetails.id;
      this.userDetailsService.update(this.userDetails, this.user.login).subscribe(
        results => {
          this.successfulResponseUserDetails(results);
        },
        er => {
          const errors = er.error.errors;

          for (const err of errors) {   //walidacja, przechwytujemy bledy
            const field = err.field;
            const message = err.defaultMessage;
            this.error[field] = message;
          }
        }
      );
    }
  }

  successfulResponseUser(response) {
    this.user = response;
  }

  successfulResponseUserDetails(response) {
    this.user.userDetails = response;
    this.userDetails = response;
  }

}
