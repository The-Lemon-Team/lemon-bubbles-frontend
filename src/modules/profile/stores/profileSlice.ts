import { createSlice } from '@reduxjs/toolkit';

import { IProfileStore } from '../../common/interfaces';

const initialState: IProfileStore = {};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: () => ({}),
});
