import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardService {

  isLoggedIn=new Subject()

  constructor() { }

  checkLoginCredential(isUserLoggedIn){
    if(isUserLoggedIn){
      this.isLoggedIn.next(true)
    }
    else{
      this.isLoggedIn.next(false)
    }
  }
}
