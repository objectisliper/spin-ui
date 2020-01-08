import {createAction, props, union} from '@ngrx/store';

export const registerUser = createAction(
    '[AUTH] REGISTER_USER'
);

const all = union({
    registerUser,
});

export type AuthUnion = typeof all;
