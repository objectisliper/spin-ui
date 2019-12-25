import { Component } from "@angular/core";
import "reflect-metadata";
import {User} from "~/app/entity/User";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor() {
    }
}
