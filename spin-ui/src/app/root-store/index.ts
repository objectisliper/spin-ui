import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as rootSettingsStateReducer from './reducers/root.settings.reducer';
import * as rootUserStateReducer from './reducers/root.user.reducer';
import * as rootSharedSettingsStateReducer from './reducers/root.shared-settings.reducer';
import {ImageSource} from "@nativescript/core";


export interface State {
    sharedSettings: rootSharedSettingsStateReducer.State
    settings: rootSettingsStateReducer.State,
    userData: rootUserStateReducer.State
}

export const reducers: ActionReducerMap<State> = {
    sharedSettings: rootSharedSettingsStateReducer.reducer,
    settings: rootSettingsStateReducer.reducer,
    userData: rootUserStateReducer.reducer
};

export const selectRootState = (state: State) => state;

export const selectIsSideDrawerOpen = createSelector(
    selectRootState,
    (state: State) => state.sharedSettings.isSideDrawerOpen);

export const selectProfileImage = createSelector(
    selectRootState,
    (state: State) => !!state.settings.profileImage ?
        ImageSource.fromBase64Sync(state.settings.profileImage) : undefined);

export const isProfileImageSet = createSelector(
    selectRootState,
    (state: State) => !!state.settings.profileImage);

export const selectEncodingKey = createSelector(
    selectRootState,
    (state: State) => state.settings.encodingKey);

export const selectUserRegistrationData = createSelector(
    selectRootState,
    (state: State) => state.userData.userRegistrationData);
