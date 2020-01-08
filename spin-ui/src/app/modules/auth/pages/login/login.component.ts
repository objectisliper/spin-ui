import { Component, OnInit } from '@angular/core';
import * as indexReducer from '../../../../root-store';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setUserRegistrationData} from "~/app/root-store/actions/root.user.action";
import { RouterExtensions } from '@nativescript/angular/router';
import {selectUserRegistrationData} from "~/app/root-store";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hidePassword: boolean = true;

    isSubmitted: boolean = false;

    form$ = this._store.select(selectUserRegistrationData);

    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/), Validators.minLength(8)]),
    });

    constructor(private _store: Store<indexReducer.State>, private _router: RouterExtensions) {
    }

    get isSubmitDisabled(): boolean {
        return this.registrationForm.invalid
    }

    get passwordError(): string | null {
        if (this.registrationForm.get('password').value.length > 0) {
            if (this.registrationForm.get('password').hasError('minlength')) {
                return 'Password must be eight characters or longer'
            }
            if (this.registrationForm.get('password').hasError('pattern')) {
                return 'Password must contain at least 1 lowercase and uppercase alphabetical character ' +
                    'and at least 1 numeric character'
            }
        }

        return null;
    }

    ngOnInit() {
    }

    togglePassword(): void {
        this.hidePassword = !this.hidePassword;
        console.log(this.registrationForm.invalid)
    }

    submitForm(): void {
        this.isSubmitted = true;
        if (this.registrationForm.valid) {
            this._store.dispatch(setUserRegistrationData(
                {payload: {userRegistrationData: this.registrationForm.value}}
            ));
            this._router.navigate(['auth', 'user-photo'])
        }
    }
}
