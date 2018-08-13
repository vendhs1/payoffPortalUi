import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          let user = filteredUsers[0];
          let body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
          };

          return of(new HttpResponse({ status: 200, body: body }));
        } else {

          let body = {
            id: 123,
            username: "sakthiyaV",
            firstName: "sakthiya ",
            lastName: "palaniswamy",
            token: 'fake-jwt-token'
          };

          return of(new HttpResponse({ status: 200, body: body }));

          //
          // // else return 400 bad request
          // return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }

      if (request.url.startsWith('/account?lender') && request.method === 'GET') {

        let body = {
          "account":
            {
              "customerInfo":
                {
                  "firstName": "Sharon",
                  "lastName": "Long",
                  "address":
                    {
                      "addressLine1": "8850 Whitney Drive",
                      "addressLine2": "",
                      "city": "Lewis Center",
                      "state": "OH",
                      "zipcode": "43035"
                    }
                },
              "vehicleInfo":
                {
                  "vin": "WP0AA2A73BL011889",
                  "year": "2016",
                  "make": "Honda",
                  "model": "Accord",
                  "trim": "",
                  "lienHolder": "Huntington Bank",
                  "accountNumber": "021000021"
                }
            }
        };

        return of(new HttpResponse({ status: 200, body: body }));
      }

      if (request.url.startsWith('/payoffQuote?lender') && request.method === 'GET') {

        let body = {
          "quote":
            {
              "customerInfo":
                {
                  "firstName": "Sharon",
                  "lastName": "Long",
                  "address":
                    {
                      "addressLine1": "8850 Whitney Drive",
                      "addressLine2": "",
                      "city": "Lewis Center",
                      "state": "OH",
                      "zipcode": "43035"
                    }
                },
              "vehicleInfo":
                {
                  "vin": "WP0AA2A73BL011889",
                  "year": "2016",
                  "make": "Honda",
                  "model": "Accord",
                  "trim": "",
                  "lienHolder": "Huntington Bank",
                  "accountNumber": "021000021"
                },
              "paymentInfo":
                {
                  "product": "Retail",
                  "netPayoffAmt": "$ 23,723.48",
                  "goodUntilDate": "08/07/2018",
                  "monthlyPayment": "$ 606.07",
                  "dollarDayRate": "$ 5.165"
                }
            }
        };

        return of(new HttpResponse({ status: 200, body: body }));
      }



      // pass through any requests not handled above
      return next.handle(request);

    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
