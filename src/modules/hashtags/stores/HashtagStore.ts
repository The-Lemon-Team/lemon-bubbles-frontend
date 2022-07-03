import { types } from 'mobx-state-tree';
import { formatISO } from 'date-fns';

import { IHashTag } from '../../../interfaces';
import { colorGenerator } from '../utils/colorGenerator';

interface HashtagStoreActions {
  changeColor: (color: string) => void;
}

export const HashtagStore = types
  .model({
    id: types.identifier,
    color: types.string,
    created: types.string,
    text: types.string,
  })
  .actions((self: Partial<IHashTag>) => {
    const changeColor = (color: string) => (self.color = color);
    const setNewData = (date: string | Date) =>
      (self.created = formatISO(new Date(date)));
    const setText = (text: string) => (self.text = text);

    return { changeColor, setNewData, setText };
  });
