import * as RootUserActions from '../actions/root.user.action';
import * as SharedSettingsActions from '../actions/root.shared-settings.action';
import {Action, createReducer, on} from '@ngrx/store';
import {UserRegistrationModel} from "~/app/models/user-registration.model";
import * as jwtDecode from "jwt-decode";

export interface State {
    userRegistrationData: UserRegistrationModel;
    email: string;
    name: string;
}


export const initialState: State = {
    userRegistrationData: new UserRegistrationModel().deserialize({}),
    email: '',
    name: '',
};


const rootUserReducer = createReducer(
    initialState,
    on(RootUserActions.setUserRegistrationData,
        (state, {payload}) => ({...state,
            userRegistrationData: new UserRegistrationModel().deserialize(payload.userRegistrationData)})),
    on(SharedSettingsActions.setJWTToken,
        (state, {payload}) => ({...state,
            email: jwtDecode(payload.jwtToken).email, name: jwtDecode(payload.jwtToken).name})),
);

export function reducer(state: State | undefined, action: Action) {
    return rootUserReducer(state, action);
}
