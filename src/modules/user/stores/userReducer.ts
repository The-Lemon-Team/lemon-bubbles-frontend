import { combineReducers } from '@reduxjs/toolkit';

import { userCreatingSlice } from './userCreatingSlice';
import { userModelSlice } from './userModelSlice';

export const userReducer = combineReducers({
  creating: userCreatingSlice.reducer,
  model: userModelSlice.reducer,
});
