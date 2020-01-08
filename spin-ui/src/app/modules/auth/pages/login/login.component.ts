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

    registrationForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/), Validators.minLength(8)]),
    });

    constructor(private _store: Store<indexReducer.State>, private _router: RouterExtensions) {
    }

    get isSubmitDisabled(): boolean {
        return this.registrationForm.invalid
    }

    ngOnInit() {
    }

    togglePassword(): void {
        this.hidePassword = !this.hidePassword;
        console.log(this.registrationForm.invalid)
    }

    goToRegistration(): void {
        this._router.navigate(['auth', 'registration'])
    }

    submitForm(): void {
        this.isSubmitted = true;
        if (this.registrationForm.valid) {
            this._router.navigate(['auth', 'user-photo'])
        }
    }
}
