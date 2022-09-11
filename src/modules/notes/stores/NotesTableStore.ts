import { types, Instance } from 'mobx-state-tree';
import { INote } from '../../../interfaces';
import { NoteStore } from './NoteStore';

export const NotesTableStore = types.snapshotProcessor(
  types
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
    })),
  {
    preProcessor() {
      const storedData = localStorage.getItem('NotesTableStore');
      const { selectedToEdit, ...restoredData } =
        storedData && JSON.parse(storedData);

      return !restoredData
        ? { isCreatingMode: false, mode: 'table' }
        : restoredData;
    },
    postProcessor(snapshot) {
      localStorage.setItem('NotesTableStore', JSON.stringify(snapshot));

      return snapshot;
    },
  },
);
