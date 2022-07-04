import React from 'react';
import { TextareaAutosize } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

interface MdEditorProps {
  value: string;
  onChange: (text?: string) => void;
}

export const MdEditor: React.FC<MdEditorProps> = ({ value, onChange }) => {
  return (
    <MDEditor
      height={200}
      onChange={onChange}
      value={value}
      renderTextarea={({
        onChange,
        className,
        autoCapitalize,
        autoCorrect,
        spellCheck,
        style,
      }) => {
        return (
          <TextareaAutosize
            value={value}
            placeholder="Описание"
            className={className}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            spellCheck={spellCheck}
            style={{
              ...style,
              width: '100%',
              height: '100%',
            }}
            onChange={(e) => {
              onChange &&
                onChange(
                  e as React.FormEvent<HTMLDivElement> &
                    React.ChangeEvent<HTMLTextAreaElement>,
                );
            }}
          />
        );
      }}
      hideToolbar
      preview="edit"
    />
  );
};
