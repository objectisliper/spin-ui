import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
  declarations: [],
  imports: [
    UserRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
