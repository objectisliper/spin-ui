import * as RootUserActions from '../actions/root.user.action';
import {Action, createReducer, on} from '@ngrx/store';
import {UserRegistrationModel} from "~/app/models/user-registration.model";

export interface State {
    userRegistrationData: UserRegistrationModel;
}


export const initialState: State = {
    userRegistrationData: new UserRegistrationModel().deserialize({}),
};


const rootUserReducer = createReducer(
    initialState,
    on(RootUserActions.setUserRegistrationData,
        (state, {payload}) => ({...state,
            userRegistrationData: new UserRegistrationModel().deserialize(payload.userRegistrationData)})),
);

export function reducer(state: State | undefined, action: Action) {
    return rootUserReducer(state, action);
}
