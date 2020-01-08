import {createAction, props, union} from '@ngrx/store';

export const setIsSideDrawerOpen = createAction(
    '[ROOT] SET_SIDE_DRAWER_OPEN',
    props<{ payload: {isSideDrawerOpen: boolean} }>()
);

export const toggleSideDrawerOpen = createAction(
    '[ROOT] TOGGLE_SIDE_DRAWER_OPEN'
);

export const setJWTToken = createAction(
    '[ROOT] SET_JWT_TOKEN',
    props<{payload: {jwtToken: string}}>()
);

const all = union({
    setIsSideDrawerOpen,
    toggleSideDrawerOpen,
    setJWTToken,
});

export type RootSettingsUnion = typeof all;
