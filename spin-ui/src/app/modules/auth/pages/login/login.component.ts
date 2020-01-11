import { Component, OnInit } from '@angular/core';
import * as indexReducer from '../../../../root-store';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setUserRegistrationData} from "~/app/root-store/actions/root.user.action";
import { RouterExtensions } from '@nativescript/angular/router';
import {isJwtExpired, selectUserRegistrationData} from "~/app/root-store";
import {loginUser} from "~/app/modules/auth/store/actions/auth.actions";
import {skipWhile, take} from "rxjs/internal/operators";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hidePassword: boolean = true;

    isSubmitted: boolean = false;

    loading: boolean = false;

    registrationForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
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
            this.loading = true;
            this._store.dispatch(loginUser({payload: this.registrationForm.value}));
            this._store.select(isJwtExpired).pipe(skipWhile(result => result), take(1))
                .subscribe(() => {
                    this.loading = false;
                    this._router.navigate(['add-test'], {clearHistory: true})
            })
        }
    }
}
