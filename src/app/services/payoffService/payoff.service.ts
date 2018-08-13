import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs/index";
import {AccountInfo} from "../../models/accountInfo";


@Injectable()
export class PayoffService {

  constructor(private http: HttpClient) {}

  retrieveAccountDetails(lender: string, identifier: string, identifierValue: string, customerConsent: boolean): Observable<AccountInfo> {

    let requestUrl = '/account?lender='+lender+'&identifier='+identifier+'&identifierValue='+identifierValue+'&customerConsent='+customerConsent;

    return this.http.get(requestUrl)
      .pipe(map((res: Response) => {
        if (res['account']) {
          let accountInfo = new AccountInfo();
          accountInfo = res['account'];
          return accountInfo;
        } else {
          return null;
        }
      }));
  }

  getPayoffQuote(lender: string, identifier: string, identifierValue: string, customerConsent: boolean): Observable<AccountInfo> {

    let requestUrl = '/payoffQuote?lender='+lender+'&identifier='+identifier+'&identifierValue='+identifierValue+'&customerConsent='+customerConsent;

    return this.http.get(requestUrl)
      .pipe(map((res: Response) => {
        if (res['quote']) {
          let accountInfo = new AccountInfo();
          accountInfo = res['quote'];
          return accountInfo;
        } else {
          return null;
        }
      }));
  }
}
