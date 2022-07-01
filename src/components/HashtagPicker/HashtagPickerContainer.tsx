import React from 'react';

import { CreatingModeProvider } from './CreatingMode';
import { HashtagPicker } from './HashtagPicker';

import { IHashTag } from '../../interfaces';

const hashTagExamples: IHashTag[] = [
  {
    id: 'h-1',
    created: new Date().toString(),
    text: 'Юнг',
    color: '#9c27b0',
  },
  {
    id: 'h-2',
    created: new Date().toString(),
    text: 'Адлер',
    color: '#ef5350',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
  {
    id: 'h-3',
    created: new Date().toString(),
    text: 'Фрейд',
    color: '#ff9800',
  },
  {
    id: 'h-4',
    created: new Date().toString(),
    text: 'Нойман',
    color: '#2e7d32',
  },
];

interface HashtagPickerContainerProps {
  onChange?: (hashTags: IHashTag[]) => void;
  selected?: IHashTag[];
}

export const HashtagPickerContainer: React.FC<HashtagPickerContainerProps> = (
  props,
) => {
  return (
    <CreatingModeProvider>
      <HashtagPicker hashTags={hashTagExamples} {...props} />
    </CreatingModeProvider>
  );
};
