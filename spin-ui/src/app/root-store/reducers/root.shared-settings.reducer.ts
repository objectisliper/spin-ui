import * as SharedSettingsActions from '../actions/root.shared-settings.action';
import {Action, createReducer, on} from '@ngrx/store';

export interface State {
    isSideDrawerOpen: boolean;
    jwtToken: string;
}


export const initialState: State = {
    isSideDrawerOpen: false,
    jwtToken: undefined
};


const rootSharedSettingsReducer = createReducer(
    initialState,
    on(SharedSettingsActions.setIsSideDrawerOpen,
        (state, {payload}) => ({...state, ...payload})),
    on(SharedSettingsActions.toggleSideDrawerOpen,
        (state) => ({...state, isSideDrawerOpen: !state.isSideDrawerOpen})),
    on(SharedSettingsActions.setJWTToken,
        (state, {payload}) => ({...state, ...payload, isSideDrawerOpen: (() => {console.log('fucked work'); return false})()})),
);

export function reducer(state: State | undefined, action: Action) {
    return rootSharedSettingsReducer(state, action);
}
