import React, { useCallback, useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { EditorState, ContentState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import classNames from 'classnames';
import createMentionPlugin, { defaultTheme } from '@draft-js-plugins/mention';
import { EntryComponentProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry';
import getCurrentContrastText from 'font-color-contrast';

import { LineTag } from '../../../common/components';

import styles from './HashTextArea.module.scss';
import hashTagStyles from './HashTagStyles.module.scss';
import mentionsStyles from './Mentions.module.scss';

import '@draft-js-plugins/mention/lib/plugin.css';

import { IHashTag } from '../../../../interfaces';

export interface HashTextAreaProps {
  hashtags?: IHashTag[];
  value: string;

  onSearch: (query: string) => void;
  onChange: (text?: string) => void;
}

const mentionPlugin = createMentionPlugin({
  theme: {
    ...defaultTheme,
    ...mentionsStyles,
  },
  mentionComponent: ({ children, mention }) => {
    return (
      <span
        style={{
          background: mention.color,
          color: getCurrentContrastText(mention.color),
        }}
      >
        {children}
      </span>
    );
  },
  mentionPrefix: '#',
  mentionTrigger: ['#'],
});
const hashtagPlugin = createHashtagPlugin({ theme: hashTagStyles });
const plugins = [mentionPlugin, hashtagPlugin];

const Entry = ({
  theme,
  mention,
  selectMention,
  isFocused,
  searchValue,
  ...props
}: EntryComponentProps) => {
  return (
    <div {...props}>
      <LineTag color={mention?.color} text={mention?.name} />
    </div>
  );
};

const LENGHT_TO_SEARCH = 1;

export const HashTextArea: React.FC<HashTextAreaProps> = ({
  value,
  hashtags = [],

  onSearch,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const editorRef = useRef<Editor>(null);
  const [editorValue, setEditorValue] = React.useState(
    value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty(),
  );
  const mentions = hashtags.map(({ text, ...hashTag }) => ({
    name: text,
    ...hashTag,
  }));
  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const handleValueChange = useCallback(
    (newValue: EditorState) => {
      const text = newValue.getCurrentContent().getPlainText();

      setEditorValue(newValue);
      onChange(text);
    },
    [onChange],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    debounce((e: { trigger: string; value: string }) => {
      if (e.value.length > LENGHT_TO_SEARCH) {
        onSearch(e.value);
      }
    }, 500),
    [onSearch],
  );

  useEffect(() => {
    if (editorValue.getCurrentContent().getPlainText() !== value) {
      const editorState = EditorState.push(
        editorValue,
        (value
          ? EditorState.createWithContent(ContentState.createFromText(value))
          : EditorState.createEmpty()
        ).getCurrentContent(),
        'insert-characters',
      );
      setEditorValue(editorState);
    }
  }, [editorValue, value]);

  return (
    <div className={classNames('rs-input', styles.inputWrapper, styles.editor)}>
      <Editor
        ref={editorRef}
        plugins={plugins}
        onChange={handleValueChange}
        editorState={editorValue}
      />
      <mentionPlugin.MentionSuggestions
        open={open}
        onSearchChange={handleSearchChange}
        suggestions={mentions}
        onOpenChange={onOpenChange}
        entryComponent={Entry}
      />
    </div>
  );
};
