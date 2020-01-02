import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as rootSettingsStateReducer from './reducers/root.settings.reducer';
import * as rootUserStateReducer from './reducers/root.user.reducer';


export interface State {
    settings: rootSettingsStateReducer.State,
    userData: rootUserStateReducer.State
}

export const reducers: ActionReducerMap<State> = {
    settings: rootSettingsStateReducer.reducer,
    userData: rootUserStateReducer.reducer
};

export const selectRootState = (state: State) => state;


export const selectEncodingKey = createSelector(
    selectRootState,
    (state: State) => state.settings.encodingKey);

export const selectUserRegistrationData = createSelector(
    selectRootState,
    (state: State) => state.userData.userRegistrationData);
