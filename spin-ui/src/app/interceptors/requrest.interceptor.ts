import {Inject, Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {Observable} from "rxjs";
import {isJwtExpired, selectJWTToken} from "~/app/root-store";
import {first, withLatestFrom} from "rxjs/internal/operators";
import {flatMap} from "rxjs/operators";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private _store: Store<indexReducer.State>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._store.select(isJwtExpired).pipe(
            first(),
            withLatestFrom(this._store.select(selectJWTToken)),
            flatMap(([isExpired, token]) => {
                var newReq = req.clone({
                    headers: req.headers.set('Content-Type', 'application/json; charset=UTF-8')
                });
                console.log('interceptor work', token);
                if (!isExpired && !!token) {
                    newReq = newReq.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + token)
                    });
                }
                return next.handle(newReq);
            })
        )
    }
}
