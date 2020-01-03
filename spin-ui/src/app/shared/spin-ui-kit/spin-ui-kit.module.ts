import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SUIBasicButtonComponent } from './buttons/suibasic-button/suibasic-button.component';



@NgModule({
    declarations: [SUIBasicButtonComponent],
    imports: [
    NativeScriptCommonModule
    ],
    exports: [
        SUIBasicButtonComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SpinUiKitModule { }
