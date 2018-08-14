import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import {PayoffService} from "../services/payoffService/payoff.service";
import {AccountInfo} from "../models/accountInfo";

@Component({
  selector: 'app-payoff-quote',
  templateUrl: './payoff-quote.component.html',
  styleUrls: ['./payoff-quote.component.css']
})
export class PayoffQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  accountConfirmation: boolean;
  submitted = false;
  accountInfo: AccountInfo;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private payOffService: PayoffService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.quoteForm = this.formBuilder.group({
      lender: ['', Validators.required],
      identifier: ['', Validators.required],
      identifierValue: ['', Validators.required],
      customerConsent: [null, Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.quoteForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.quoteForm.invalid) {
      return;
    }
    this.spinner.show();
    this.payOffService.retrieveAccountDetails(this.f.lender.value, this.f.identifier.value, this.f.identifierValue.value, this.f.customerConsent.value)
      .subscribe(
        data => {
          this.accountInfo = new AccountInfo();
          this.accountInfo = data;
          this.accountConfirmation = true;
          this.spinner.hide();
        },
        error => {
          // this.loading = false;
        });

  }

  getPayOffQuote() {
    this.spinner.show();
    this.payOffService.getPayoffQuote(this.f.lender.value, this.f.identifier.value, this.f.identifierValue.value, this.f.customerConsent.value)
      .subscribe(
        data => {
          this.accountInfo = new AccountInfo();
          this.accountConfirmation = false;
          this.accountInfo = data;
          this.spinner.hide();
        },
        error => {
          // this.loading = false;
        });

  }

}
