import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import { Hashtag } from '../../../../components/Hashtag';

import styles from './HashTextArea.module.scss';

import { IHashTag } from '../../../../interfaces';

interface HashTextAreaProps {
  hashtags?: IHashTag[];
  value: string;
  onChange: (text?: string) => void;
}

const hashtagExamples = [
  {
    id: 'h-1',
    created: new Date().toString(),
    text: 'Пожрал',
    color: '#1976d2',
  },
  {
    id: 'h-3233',
    created: new Date().toString(),
    text: 'Пожрал',
    color: '#42a5f5',
  },
  {
    id: 'h-4112',
    created: new Date().toString(),
    text: 'посрал',
    color: '#fcc690',
  },
];

export const HashTextArea: React.FC<HashTextAreaProps> = ({
  value,
  onChange,
  hashtags = hashtagExamples,
}) => {
  return (
    <MentionsInput
      singleLine={false}
      placeholder="Текст"
      className={styles.textArea}
      value={value}
      style={{
        suggestions: {
          list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
          },
          item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
              backgroundColor: '#cee4e5',
            },
          },
        },
        '&multiLine': {
          input: {
            backgroundColor: '#fff',
            border: '1px solid #e5e5ea',
            transition: 'border-color .3s ease-in-out',
            borderRadius: 9,
            outline: 0,
            padding: '7px 11px',
            minHeight: '200px',
          },
        },
      }}
      rows={10}
      onChange={({ target }) => onChange(target.value)}
    >
      <Mention
        style={{ backgroundColor: '#d1c4e9' }}
        trigger="#"
        displayTransform={(id: string, display: string) => `#${display}`}
        data={[
          {
            id: 'h-3233',
            display: 'Пожрал',
          },
          {
            id: 'h-4112',
            display: 'посрал',
          },
        ]}
        renderSuggestion={(renderItem) => {
          const currentHashtag = hashtags.find(
            (hashtag) => hashtag.id === renderItem.id,
          );

          return (
            <Hashtag
              color={currentHashtag?.color}
              text={currentHashtag?.text}
            />
          );
        }}
      />
    </MentionsInput>
  );
};
