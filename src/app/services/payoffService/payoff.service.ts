import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class PayoffService {

  constructor(private http: HttpClient) { }

  login(lender: string, identifier: string, identifierValue: string, customerConsent: boolean) {

    return this.http.get()<any>(`/quote/searchAccount?lender`, { username: username, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

}
