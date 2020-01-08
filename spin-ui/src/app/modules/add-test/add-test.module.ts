import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AddTestRoutingModule } from './add-test-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AddNewComponent } from './pages/add-new/add-new.component';
import {SharedLayoutsModule} from "~/app/shared/layouts/shared-layouts.module";


@NgModule({
  declarations: [AddNewComponent],
    imports: [
        AddTestRoutingModule,
        NativeScriptCommonModule,
        SharedLayoutsModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AddTestModule { }
