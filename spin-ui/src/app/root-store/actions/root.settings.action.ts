import {createAction, props, union} from '@ngrx/store';

export const setEncodingKey = createAction(
  'SET_ENCODING_KEY',
  props<{ payload: {encodingKey: string} }>()
);

const all = union({
  setEncodingKey,
});

export type RootSettingsUnion = typeof all;
