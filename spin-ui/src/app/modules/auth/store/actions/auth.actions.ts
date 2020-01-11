import {createAction, props, union} from '@ngrx/store';

export const registerUser = createAction(
    '[AUTH] REGISTER_USER'
);

export const loginUser = createAction(
    '[AUTH] LOGIN_USER',
    props<{payload: {email: string, password: string}}>()
);

const all = union({
    registerUser,
});

export type AuthUnion = typeof all;
