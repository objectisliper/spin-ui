import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {IfAndroidDirective, IfIosDirective} from "~/app/if-platform.directive";
import {HeaderComponent} from "~/app/shared/layouts/header/header.component";
import {AppModule} from "~/app/app.module";
import {NativeScriptSvgModule} from '@teammaestro/nativescript-svg/angular';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import {CommonModule} from "@angular/common";



@NgModule({
    declarations: [
        HeaderComponent,
        IfAndroidDirective,
        IfIosDirective,
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptSvgModule,
        NativeScriptUISideDrawerModule,
        CommonModule,
    ],
    exports: [
        HeaderComponent,
        IfAndroidDirective,
        IfIosDirective,
        NativeScriptUISideDrawerModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedLayoutsModule { }
