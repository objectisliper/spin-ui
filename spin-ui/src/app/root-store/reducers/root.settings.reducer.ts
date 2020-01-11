import * as PredictionPageActions from '../actions/root.settings.action';
import {Action, createReducer, on} from '@ngrx/store';

export interface State {
  encodingKey: string;
  profileImage: string;
}


export const initialState: State = {
    encodingKey: null,
    profileImage: undefined,
};


const rootSettingsReducer = createReducer(
  initialState,
  on(PredictionPageActions.setEncodingKey,
    (state, {payload}) => ({...state, ...payload})),
  on(PredictionPageActions.setProfileImage,
    (state, {payload}) => ({...state, profileImage: payload.profileImage.toBase64String("png")})),
);

export function reducer(state: State | undefined, action: Action) {
  return rootSettingsReducer(state, action);
}
