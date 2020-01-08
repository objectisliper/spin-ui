import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import {RegistrationComponent} from "~/app/modules/auth/pages/registration/registration.component";
import {AddNewComponent} from "~/app/modules/add-test/pages/add-new/add-new.component";


const routes: Routes = [
    {
        path: '',
        component: AddNewComponent
    },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class AddTestRoutingModule { }
