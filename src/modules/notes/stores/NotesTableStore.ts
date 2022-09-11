import { types, Instance } from 'mobx-state-tree';
import { isEmpty } from 'lodash';

import { NoteStore } from './NoteStore';

import { INote } from '../../../interfaces';

interface INotesTableStoreState {
  mode: 'table' | 'cards';
  isCreatingMode: boolean;
}

const NotesTableStoreModel = types
  .model('NotesTableStore', {
    isCreatingMode: types.boolean,
    mode: types.enumeration('mode', ['table', 'cards']),
    selectedToEdit: types.maybe(types.reference(NoteStore)),
  })
  .views((self) => ({
    get isEditingMode() {
      return !!self.selectedToEdit;
    },
    get isTableMode() {
      return self.mode === 'table';
    },
    get isCardsMode() {
      return self.mode === 'cards';
    },
  }))
  .views((self) => ({
    get isEnabled() {
      return self.isCreatingMode || self.isEditingMode;
    },
  }))
  .actions((self) => ({
    switchOnCreatingMode() {
      self.selectedToEdit = undefined;
      self.isCreatingMode = true;
    },
    switchOffCreatingMode() {
      self.isCreatingMode = false;
    },
    toggleCreatingMode() {
      if (self.isCreatingMode) {
        this.switchOffCreatingMode();
      } else {
        this.switchOnCreatingMode();
      }
    },
    setTableMode() {
      self.mode = 'table';
    },
    setCardsMode() {
      self.mode = 'cards';
    },
  }))
  .actions((self) => ({
    setEditMode(note: INote) {
      self.switchOffCreatingMode();
      self.selectedToEdit = note as Instance<typeof NoteStore>;
    },
    resetEditMode() {
      self.switchOnCreatingMode();
      self.selectedToEdit = undefined;
    },
  }));

export const NotesTableStore = types.snapshotProcessor(NotesTableStoreModel, {
  preProcessor(initialValue: INotesTableStoreState) {
    try {
      const restoredData: {
        [Property in keyof INotesTableStoreState]: string;
      } = JSON.parse(localStorage.getItem('NotesTableStore') || '{}');

      return !isEmpty(restoredData)
        ? {
            isCreatingMode: restoredData.isCreatingMode === 'true',
            mode: restoredData.mode as 'table' | 'cards',
          }
        : initialValue;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return initialValue;
    }
  },

  postProcessor(snapshot) {
    localStorage.setItem('NotesTableStore', JSON.stringify(snapshot));

    return snapshot;
  },
});
