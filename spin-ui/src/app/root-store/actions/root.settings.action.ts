import {createAction, props, union} from '@ngrx/store';
import {ImageAsset, ImageSource} from "@nativescript/core";

export const setEncodingKey = createAction(
  'SET_ENCODING_KEY',
  props<{ payload: {encodingKey: string} }>()
);

export const setProfileImage = createAction(
  'SET_PROFILE_IMAGE',
  props<{ payload: {profileImage: ImageSource} }>()
);

const all = union({
  setEncodingKey,
});

export type RootSettingsUnion = typeof all;
