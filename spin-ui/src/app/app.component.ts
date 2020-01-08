import {Component, OnInit} from "@angular/core";
import "reflect-metadata";
import {User} from "~/app/entity/User";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {registerElement} from 'nativescript-angular';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import {setIsSideDrawerOpen, toggleSideDrawerOpen} from "~/app/root-store/actions/root.shared-settings.action";
import { RouterExtensions } from '@nativescript/angular/router';
import {isJwtExpired} from "~/app/root-store";


@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

    isJwtExpired = this._store.select(isJwtExpired);

    constructor(private _store: Store<indexReducer.State>, private _router: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    onCloseDrawerTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    setIsSideDrawerOpenState(value: boolean): void {
        this._store.dispatch(setIsSideDrawerOpen({payload: {isSideDrawerOpen: value}}));
    }

    navigateTo(path: string): void {
        this._router.navigate([path]);
        this._store.dispatch(setIsSideDrawerOpen({payload: {isSideDrawerOpen: false}}));
        this.onCloseDrawerTap();
    }
}
