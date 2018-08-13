import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {PayoffService} from "../services/payoffService/payoff.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  quoteForm: FormGroup;
  accountConfirmation: boolean;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private payOffService: PayoffService) {}

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

    this.payOffService.retrieveAccountDetails(this.f.lender.value, this.f.identifier.value, this.f.identifierValue.value, this.f.customerConsent.value)
      .subscribe(
        data => {
          this.accountConfirmation = true;
        },
        error => {
          // this.loading = false;
        });

  }

}
