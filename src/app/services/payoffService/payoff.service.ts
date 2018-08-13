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
        if (res['customerInfo'] && res['vehicleInfo']) {
          let accountInfo = new AccountInfo();
          accountInfo = res;
          return accountInfo;
        } else {
          return null;
        }
      }));
  }
}
