import { types } from 'mobx-state-tree';

export const NotesTableStore = types.snapshotProcessor(
  types
    .model('NotesTableStore', {
      isCreatingMode: types.boolean,
      mode: types.enumeration('mode', ['table', 'cards']),
    })
    .views((self) => ({
      get isTableMode() {
        return self.mode === 'table';
      },
      get isCardsMode() {
        return self.mode === 'cards';
      },
    }))
    .actions((self) => ({
      switchOnCreatingMode() {
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
    })),
  {
    preProcessor() {
      const storedData = localStorage.getItem('NotesTableStore');
      const restoredData = storedData && JSON.parse(storedData);

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
