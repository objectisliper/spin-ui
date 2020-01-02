import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import {RegistrationComponent} from "~/app/modules/auth/pages/registration/registration.component";
import {UserPhotoComponent} from "~/app/modules/auth/pages/user-photo/user-photo.component";


const routes: Routes = [
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'user-photo',
        component: UserPhotoComponent
    }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule { }
