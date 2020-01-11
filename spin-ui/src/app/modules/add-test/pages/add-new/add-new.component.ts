import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as indexReducer from "~/app/root-store";
import {Observable} from "rxjs";
import {selectUserEmail, selectUserName} from "~/app/root-store";

@Component({
  selector: 'ns-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

    name: Observable<string> = this._store.select(selectUserName);
    email: Observable<string> = this._store.select(selectUserEmail);

    constructor(private _store: Store<indexReducer.State>) {

    }

    ngOnInit() {
    }

}
