import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanLoad, Route, UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {isJwtExpired, selectProfileImage} from "~/app/root-store";
import {map, withLatestFrom} from "rxjs/internal/operators";
import {selectUserRegistrationData} from "~/app/root-store";
import { RouterExtensions } from '@nativescript/angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private _store: Store<indexReducer.State>, private _router: RouterExtensions) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._store.select(isJwtExpired).pipe(
            withLatestFrom(this._store.select(selectProfileImage).pipe(map(photo => !!photo))),
            map(([isJwtExpired, isPhotoExist]) => {
                if (!isJwtExpired) {
                    return true;
                } else {
                    this._router.navigate(['auth', isPhotoExist ? 'login' : 'registration'],
                        {clearHistory: true}
                        );
                    return false;
                }
            })
        );
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._store.select(isJwtExpired).pipe(
            withLatestFrom(this._store.select(selectProfileImage).pipe(map(photo => !!photo))),
            map(([isJwtExpired, isPhotoExist]) => {
                if (!isJwtExpired) {
                    return true;
                } else {
                    this._router.navigate(['auth', isPhotoExist ? 'login' : 'registration'],
                        {clearHistory: true}
                    );
                    return false;
                }
            })
        );
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._store.select(isJwtExpired).pipe(
            withLatestFrom(this._store.select(selectProfileImage).pipe(map(photo => !!photo))),
            map(([isJwtExpired, isPhotoExist]) => {
                if (!isJwtExpired) {
                    console.log('guard is true');
                    return true;
                } else {
                    this._router.navigate(['auth', isPhotoExist ? 'login' : 'registration'],
                        {clearHistory: true}
                    );
                    return false;
                }
            })
        );
    }

}
