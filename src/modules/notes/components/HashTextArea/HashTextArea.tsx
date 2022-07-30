import React, { useCallback } from 'react';
import { EditorState, ContentState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import classNames from 'classnames';
import createMentionPlugin, { defaultTheme } from '@draft-js-plugins/mention';
import { EntryComponentProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry';

import { Hashtag } from '../../../../components/Hashtag';

import styles from './HashTextArea.module.scss';
import hashTagStyles from './HashTagStyles.module.scss';
import mentionsStyles from './Mentions.module.scss';

import '@draft-js-plugins/mention/lib/plugin.css';

import { IHashTag } from '../../../../interfaces';

export interface HashTextAreaProps {
  hashtags?: IHashTag[];
  value: string;
  onChange: (text?: string) => void;
}

const mentionPlugin = createMentionPlugin({
  theme: {
    ...defaultTheme,
    ...mentionsStyles,
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
      <Hashtag color={mention?.color} text={mention?.name} />
    </div>
  );
};

export const HashTextArea: React.FC<HashTextAreaProps> = ({
  value,
  onChange,
  hashtags = [],
}) => {
  const [open, setOpen] = React.useState(false);
  const [editorValue, setEditorValue] = React.useState(
    value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty(),
  );
  const mentions = hashtags.map(({ text, ...hashTag }) => ({
    name: text,
    ...hashTag,
  }));
  const [suggestions] = React.useState(mentions);
  const onOpenChange = React.useCallback((_open: boolean) => {
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

  return (
    <div className={classNames('rs-input', styles.inputWrapper, styles.editor)}>
      <Editor
        plugins={plugins}
        onChange={handleValueChange}
        editorState={editorValue}
      />
      <mentionPlugin.MentionSuggestions
        open={open}
        onSearchChange={() => void 0}
        suggestions={suggestions}
        onOpenChange={onOpenChange}
        entryComponent={Entry}
      />
    </div>
  );
};
