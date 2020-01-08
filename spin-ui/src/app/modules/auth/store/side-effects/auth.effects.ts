import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, concatMap, map, mergeMap, withLatestFrom} from "rxjs/internal/operators";
import {EMPTY, of} from "rxjs";
import * as indexReducer from "~/app/root-store";
import {AuthUnion, registerUser} from "~/app/modules/auth/store/actions/auth.actions";
import {AuthApiService} from "~/app/modules/auth/services/api-services/auth.service";
import {selectUserRegistrationData} from "~/app/root-store";
import {setJWTToken} from "~/app/root-store/actions/root.shared-settings.action";
import {BaseService} from "~/app/shared/services/base.service";

@Injectable()
export class AuthEffects {

    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(registerUser),
        concatMap(action => of(action).pipe(
            withLatestFrom(this._store.pipe(select(selectUserRegistrationData))),
        )),
        mergeMap(([action, userData]) => this.authApiService.registerUser(
            {email: userData.email, password: userData.password}
            ).pipe(
            map(response => {
                return setJWTToken({payload: {jwtToken: response}});
            }),
            catchError((error) => {
                console.log('sideEffect', error);
                BaseService.showAlertSomethingWentWrong();
                return EMPTY;
            })
        ))
    ));

    constructor(private actions$: Actions<AuthUnion>,
                private authApiService: AuthApiService,
                private _store: Store<indexReducer.State> ) {
    }

}
