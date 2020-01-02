import * as SharedSettingsActions from '../actions/root.shared-settings.action';
import {Action, createReducer, on} from '@ngrx/store';

export interface State {
    isSideDrawerOpen: boolean;
}


export const initialState: State = {
    isSideDrawerOpen: false,
};


const rootSharedSettingsReducer = createReducer(
    initialState,
    on(SharedSettingsActions.setIsSideDrawerOpen,
        (state, {payload}) => ({...state, ...payload})),
    on(SharedSettingsActions.toggleSideDrawerOpen,
        (state) => ({...state, isSideDrawerOpen: !state.isSideDrawerOpen})),
);

export function reducer(state: State | undefined, action: Action) {
    return rootSharedSettingsReducer(state, action);
}
