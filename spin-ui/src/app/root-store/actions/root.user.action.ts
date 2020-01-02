import {createAction, props, union} from '@ngrx/store';
import {UserRegistrationModel} from "~/app/models/user-registration.model";

export const setUserRegistrationData = createAction(
    'SET_USER_REGISTRATION_DATA',
    props<{ payload: {userRegistrationData: UserRegistrationModel} }>()
);

const all = union({
    setUserRegistrationData,
});

export type RootUserUnion = typeof all;
