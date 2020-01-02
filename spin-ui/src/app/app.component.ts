import {Component, OnInit} from "@angular/core";
import "reflect-metadata";
import {User} from "~/app/entity/User";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {registerElement} from 'nativescript-angular';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

    constructor(private _store: Store<indexReducer.State>) {
    }

    ngOnInit(): void {
    }

    onCloseDrawerTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
