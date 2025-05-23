import { createSlice } from '@reduxjs/toolkit';

import { INotesStore } from '../../common/interfaces';

const initialState: INotesStore = {
  editId: undefined,
  deleteId: undefined,
  created: false,
  createMode: false,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: (create) => ({
    setCreatingMode: (state) => {
      state.editId = undefined;
      state.createMode = true;
    },
    setCreated: create.reducer<boolean>((state, action) => {
      state.createMode = action.payload;
    }),
    resetCreatingMode: (state) => {
      state.createMode = false;
    },
    toggleCreatingMode: (state) => {
      state.deleteId = undefined;
      state.editId = undefined;
      state.createMode = !state.createMode;
    },
    setEditId: create.reducer<string>((state, action) => {
      state.createMode = false;
      state.editId = action.payload;
    }),
    resetEditId: (state) => {
      state.createMode = false;
      state.editId = undefined;
    },

    setDelitingId: (state, action) => {
      state.deleteId = action.payload;
    },
    resetDelitingId: (state) => {
      state.deleteId = undefined;
    },
  }),
});

export const {
  setCreated,
  setCreatingMode,
  resetCreatingMode,
  toggleCreatingMode,
  setEditId,
  resetDelitingId,
  setDelitingId,
  resetEditId,
} = notesSlice.actions;
