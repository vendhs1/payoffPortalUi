import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService} from "../guard/guard.service";
import {AuthenticationService} from "../services/authentication/authentication.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private guard:GuardService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.guard.checkLoginCredential(false);
    this.router.navigate(['/login']);
  }

}
