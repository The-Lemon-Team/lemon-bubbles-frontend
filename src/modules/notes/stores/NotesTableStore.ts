import { types } from 'mobx-state-tree';

export const NotesTableStore = types
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
  }));
