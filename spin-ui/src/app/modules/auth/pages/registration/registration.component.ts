import { Component, OnInit } from '@angular/core';
import {User} from "~/app/entity/User";
import {from, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as indexReducer from '../../../../root-store';
import {selectEncodingKey} from "~/app/root-store";
import {setEncodingKey} from "~/app/root-store/actions/root.settings.action";

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _store: Store<indexReducer.State>) { }

  users: Observable<User[]>;

  ngOnInit() {
      this.users = from(User.find());
      this._store.select(selectEncodingKey).subscribe(test => console.log('test_some', test));
      this._store.dispatch(setEncodingKey({payload: {encodingKey: 'test2'}}))
  }

  createNewInstance() {
      new User().deserialize({name: 'new test 2'}).save().then(() => this.users = from(User.find()));
  }

}
