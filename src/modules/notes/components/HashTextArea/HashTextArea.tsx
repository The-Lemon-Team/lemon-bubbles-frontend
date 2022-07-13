import React, { useCallback } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import { Hashtag } from '../../../../components/Hashtag';

import styles from './HashTextArea.module.scss';

import { IHashTag } from '../../../../interfaces';

export interface HashTextAreaProps {
  hashtags?: IHashTag[];
  value: string;
  onChange: (text?: string) => void;
}

export const HashTextArea: React.FC<HashTextAreaProps> = ({
  value,
  onChange,
  hashtags = [],
}) => {
  return (
    <MentionsInput
      singleLine={false}
      placeholder="Текст"
      className={styles.textArea}
      value={value}
      style={{
        control: {
          fontSize: 14,
          fontWeight: 'normal',
          minHeight: '200px',
        },
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
          control: {
            fontFamily: 'monospace',
            minHeight: 200,
          },
          highlighter: {
            padding: '7px 11px',
            border: '1px solid transparent',
          },
          input: {
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
        style={{
          backgroundColor: '#d1c4e9',
          color: 'red !important',
        }}
        trigger="#"
        markup="#{{__display__}}"
        displayTransform={(id: string, display: string) => `#${display}`}
        data={hashtags.map(({ id, text }) => ({ id, display: text }))}
        renderSuggestion={(renderItem, search, highlightedDisplay) => {
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
