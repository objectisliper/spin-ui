import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as rootSettingsStateReducer from './reducers/root.settings.reducer';


export interface State {
    settings: rootSettingsStateReducer.State
}

export const reducers: ActionReducerMap<State> = {
    settings: rootSettingsStateReducer.reducer,
};

export const selectRootState = (state: State) => state;


export const selectEncodingKey = createSelector(
    selectRootState,
    (state: State) => state.settings.encodingKey);
