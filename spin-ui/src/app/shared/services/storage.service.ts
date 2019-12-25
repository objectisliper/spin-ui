import {Injectable} from '@angular/core';
import {
    getString,
    setString,
    remove,
} from "tns-core-modules/application-settings";

@Injectable({providedIn: 'root'})
export class StorageService {
    constructor() {
    }

    setSavedState(state: any, localStorageKey: string) {
        setString(localStorageKey, JSON.stringify(state));
    }

    getSavedState(localStorageKey: string): any {
        return JSON.parse(getString(localStorageKey, '{}'));
    }

    clearSavedState(localStorageKey: string): void {
        remove(localStorageKey);
    }
}
