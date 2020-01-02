import {createAction, props, union} from '@ngrx/store';

export const setIsSideDrawerOpen = createAction(
    '[ROOT] SET_SIDE_DRAWER_OPEN',
    props<{ payload: {isSideDrawerOpen: boolean} }>()
);

export const toggleSideDrawerOpen = createAction(
    '[ROOT] TOGGLE_SIDE_DRAWER_OPEN'
);

const all = union({
    setIsSideDrawerOpen,
    toggleSideDrawerOpen,
});

export type RootSettingsUnion = typeof all;
