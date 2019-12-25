import {Component, OnInit} from "@angular/core";
import "reflect-metadata";
import {User} from "~/app/entity/User";
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {selectEncodingKey} from "~/app/root-store";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(private _store: Store<indexReducer.State>) {
    }

    ngOnInit(): void {
    }
}
