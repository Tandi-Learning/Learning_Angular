import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { Customer } from '../customers/customer';

const emailMatchValidator = (c: AbstractControl) => {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');

  if (email?.pristine || confirmEmail?.pristine || email?.value === confirmEmail?.value)
    return null;

  return { 'match': true };
}

const rangeValidator = (min:number, max: number): ValidatorFn => {
  return (c: AbstractControl): {[k: string]: boolean} | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max))
      return { range: true }

    return null;
  }
}

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer.reactive.component.html',
  styleUrls: ['./customer.reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) {
    // this.customerForm =  new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   emailGroup: new FormGroup({
    //     email: new FormControl(),
    //     confirmEmail: new FormControl(),
    //   }),
    //   sendCatalog: new FormControl(true),
    //   notification: new FormControl('email'),
    //   rating: new FormControl([null, rangeValidator(4, 20)]),
    //   addressesXYZ: new FormGroup({
    //     addressType: new FormControl('home'),
    //     street1: new FormControl(''),
    //     street2: new FormControl(''),
    //     city: new FormControl(''),
    //     state: new FormControl(''),
    //     zip: new FormControl('')
    //   })
    // });

    this.customerForm = this.fb.group({
      firstName: ['' , [Validators.required, Validators.minLength(2)]],
      lastName: 'n/a',
      emailGroup: this.fb.group({
        email: '',
        confirmEmail: '',
      }, { validator: emailMatchValidator }),
      phone: '',
      notification: 'email',
      sendCatalog: true,
      rating: [null, rangeValidator(4, 20)],
      addresses: this.fb.array([this.buildAddressGroup()])
    });
  }

  get addresses(): FormArray {
    return this.customerForm.get("addresses") as FormArray;
    // return <FormArray>this.customerForm.get("addresses");
  }

  ngOnInit() {
    this.customerForm.get('notification')?.valueChanges.subscribe(value => {
      this.setNotification(value);
    })
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string) {
    var phoneInput = this.customerForm.get('phone');
    if (notifyVia === 'text')
      phoneInput?.setValidators(Validators.required);
    else
      phoneInput?.clearValidators();

    phoneInput?.updateValueAndValidity();

  }

  buildAddressGroup() {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    })

    // return new FormGroup({
    //   addressType: new FormControl('home'),
    //   street1: new FormControl(''),
    //   street2: new FormControl(''),
    //   city: new FormControl(''),
    //   state: new FormControl(''),
    //   zip: new FormControl('')
    // })
  }

  addAddress(): void {
    this.addresses.push(this.buildAddressGroup());
  }
}
