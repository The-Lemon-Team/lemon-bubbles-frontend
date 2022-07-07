import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';

interface MdEditorProps {
  value: string;
  onChange: (text?: string) => void;
}

export const MdEditor: React.FC<MdEditorProps> = ({ value, onChange }) => {
  return (
    <MentionsInput
      value={value}
      onChange={({ target }) => onChange(target.value)}
    >
      <Mention
        trigger="#"
        data={[
          {
            id: 'id-1',
            display: '#first',
          },
        ]}
        // displayTransform={(renderItem) => {
        //   return <h2>{renderItem.display}</h2>;
        // }}
        renderSuggestion={(renderItem) => {
          return <h1>{renderItem.display}</h1>;
        }}
      />
    </MentionsInput>
  );
  // return (
  //   <MDEditor
  //     height={200}
  //     onChange={onChange}
  //     value={value}
  //     renderTextarea={({
  //       onChange,
  //       className,
  //       autoCapitalize,
  //       autoCorrect,
  //       spellCheck,
  //       style,
  //     }) => {

  //       // return (
  //       //   <TextareaAutosize
  //       //     value={value}
  //       //     placeholder="Описание"
  //       //     className={className}
  //       //     autoCapitalize={autoCapitalize}
  //       //     autoCorrect={autoCorrect}
  //       //     spellCheck={spellCheck}
  //       //     style={{
  //       //       ...style,
  //       //       width: '100%',
  //       //       height: '100%',
  //       //     }}
  //       //     onChange={(e) => {
  //       //       onChange &&
  //       //         onChange(
  //       //           e as React.FormEvent<HTMLDivElement> &
  //       //             React.ChangeEvent<HTMLTextAreaElement>,
  //       //         );
  //       //     }}
  //       //   />
  //       // );
  //     }}
  //     hideToolbar
  //     preview="edit"
  //   />
  // );
};
