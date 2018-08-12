import { Component,OnInit } from '@angular/core';
import { GuardService } from './guard/guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'payoffPortalUi';
  isLoggedIn;
  constructor(private guard:GuardService){

  }
  ngOnInit(){
    this.guard.isLoggedIn.subscribe((res) => {
      (res) ? this.isLoggedIn = true : this.isLoggedIn = false;
    })
  }
}
