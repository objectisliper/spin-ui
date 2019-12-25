import { Component, OnInit } from '@angular/core';
import {User} from "~/app/entity/User";
import {from, Observable} from "rxjs";

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  users: Observable<User[]>;

  ngOnInit() {
      this.users = from(User.find())
  }

  createNewInstance() {
      new User().deserialize({name: 'new test 2'}).save().then(() => this.users = from(User.find()));
  }

}
