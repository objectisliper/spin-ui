import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { RegistrationComponent } from './pages/registration/registration.component';
import {CommonModule} from "@angular/common";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";


@NgModule({
  declarations: [RegistrationComponent],
    imports: [
        AuthRoutingModule,
        NativeScriptCommonModule,
        CommonModule,
        NativeScriptUIListViewModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
