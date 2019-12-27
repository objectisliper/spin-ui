import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { NativeScriptCommonModule } from '@nativescript/angular/common';
import { RegistrationComponent } from './pages/registration/registration.component';
import {CommonModule} from "@angular/common";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {HeaderComponent} from "~/app/shared/layouts/header/header.component";
import {SharedLayoutsModule} from "~/app/shared/layouts/shared-layouts.module";
import {NativeScriptFormsModule} from "@nativescript/angular/forms";
import { NativeScriptMaterialTextFieldModule } from 'nativescript-material-textfield/angular';


@NgModule({
  declarations: [
      RegistrationComponent
  ],
    imports: [
        AuthRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedLayoutsModule,
        NativeScriptMaterialTextFieldModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
