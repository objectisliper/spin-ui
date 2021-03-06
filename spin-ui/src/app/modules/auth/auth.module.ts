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
import {ReactiveFormsModule} from "@angular/forms";
import { UserPhotoComponent } from './pages/user-photo/user-photo.component';
import {ConnectFormDirective} from "~/app/directives/reactive-form-ngrx-connector.directive";
import {SpinUiKitModule} from "~/app/shared/spin-ui-kit/spin-ui-kit.module";
import { LoginComponent } from './pages/login/login.component';
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "~/app/modules/auth/store/side-effects/auth.effects";


@NgModule({
  declarations: [
      RegistrationComponent,
      UserPhotoComponent,
      ConnectFormDirective,
      LoginComponent
  ],
    imports: [
        AuthRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedLayoutsModule,
        NativeScriptMaterialTextFieldModule,
        ReactiveFormsModule,
        CommonModule,
        SpinUiKitModule,
        NativeScriptHttpClientModule,
        EffectsModule.forFeature([]),
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
