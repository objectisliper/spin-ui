import {InjectionToken} from '@angular/core';
import {StoreConfig} from "@ngrx/store";
import * as fromReducer from './reducers/root.settings.reducer';
import * as fromActions from './actions/root.settings.action';

export const RootLocalStorageKey = '__root_storage__';
// token for the state keys.
export const ROOT_STORAGE_KEYS = new InjectionToken<string[]>('StoreKeys');
// token for the localStorage key.
export const ROOT_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('appStorage');

export const ROOT_CONFIG_TOKEN =
    new InjectionToken<StoreConfig<fromReducer.State, fromActions.RootSettingsUnion>>('RootSettingsConfigToken');
