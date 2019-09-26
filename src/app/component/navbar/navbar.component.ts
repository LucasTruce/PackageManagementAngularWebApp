import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Role} from '../../service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles: Array<Role> = new Array<Role>();
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {}

}
