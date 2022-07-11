import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import styles from './HashTextArea.module.scss';

interface HashTextAreaProps {
  value: string;
  onChange: (text?: string) => void;
}

export const HashTextArea: React.FC<HashTextAreaProps> = ({
  value,
  onChange,
}) => {
  return (
    <MentionsInput
      singleLine={false}
      placeholder="Текст"
      className={styles.textArea}
      value={value}
      style={{
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
        trigger="#"
        data={[
          {
            id: 'id-1',
            display: '#first',
          },
          {
            id: 'id-2',
            display: '#MASK',
          },
        ]}
        renderSuggestion={(renderItem) => {
          return <p>{renderItem.display}</p>;
        }}
      />
    </MentionsInput>
  );
};
