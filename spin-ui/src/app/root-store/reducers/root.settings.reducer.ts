import * as PredictionPageActions from '../actions/root.settings.action';
import {Action, createReducer, on} from '@ngrx/store';

export interface State {
  encodingKey: string;
}


export const initialState: State = {
    encodingKey: null,
};


const rootSettingsReducer = createReducer(
  initialState,
  on(PredictionPageActions.setEncodingKey,
    (state, {payload}) => ({...state, ...payload})),
);

export function reducer(state: State | undefined, action: Action) {
  return rootSettingsReducer(state, action);
}
