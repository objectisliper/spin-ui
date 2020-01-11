import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";
import { NativeScriptModule } from "@nativescript/angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {EffectsModule} from "@ngrx/effects";
import {META_REDUCERS, MetaReducer, StoreModule} from "@ngrx/store";
import {reducers} from "~/app/root-store";
import {
    ROOT_CONFIG_TOKEN,
    ROOT_LOCAL_STORAGE_KEY,
    ROOT_STORAGE_KEYS,
    RootLocalStorageKey
} from "~/app/root-store/app.tokens";
import {StorageService} from "~/app/shared/services/storage.service";
import {storageMetaReducer} from "~/app/root-store/meta-redusers/store-metareducer";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthEffects} from "~/app/modules/auth/store/side-effects/auth.effects";
import {httpInterceptorProviders} from "~/app/interceptors";

export function getRootStoreConfig(saveKeys: string[],
                                    localStorageKey: string,
                                    storageService: StorageService,
): any {
    return storageMetaReducer(saveKeys, localStorageKey, storageService);
}


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(reducers),
        NativeScriptUISideDrawerModule,
        RouterModule,
        CommonModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        httpInterceptorProviders,
        {provide: ROOT_LOCAL_STORAGE_KEY, useValue: RootLocalStorageKey},
        {provide: ROOT_STORAGE_KEYS, useValue: ['settings']},
        {
            provide: META_REDUCERS,
            deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, StorageService],
            multi: true,
            useFactory: (storageKey, localStorageKey, service) => getRootStoreConfig(storageKey, localStorageKey, service)
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
