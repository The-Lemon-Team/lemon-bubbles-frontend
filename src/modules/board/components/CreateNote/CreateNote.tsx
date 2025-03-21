import { Divider, IconButton, Input } from 'rsuite';
import { Field, FieldProps } from 'formik';
import { Panel } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import ReloadIcon from '@rsuite/icons/Reload';

import { HashtagListContainer } from '../../containers';
import { HashTextArea } from '../HashTextArea';

import styles from './CreateNote.module.scss';

import { IHashTag, INote } from '../../../../interfaces';

export interface CreateNoteProps {
  selectedToEdit?: INote;
  usedTags?: IHashTag[];

  onTextChange: (value?: string) => void;
  onTitleChange: (value?: string) => void;
  onTagsSearch: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const CreateNote = ({
  selectedToEdit,
  usedTags,
  onTextChange,
  onTagsSearch,
  onTitleChange,
  onSubmit,
  onReset,
}: CreateNoteProps) => {
  const isEditMode = !!selectedToEdit;

  return (
    <Panel bordered shaded expanded className={styles.panel}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>
          {isEditMode ? `Редактировать запись` : 'Добавить новую запись'}
        </p>
        <div className={styles.actionPanel}>
          <div className={styles.actionWrapper}>
            <IconButton
              size="sm"
              appearance="primary"
              icon={<CheckIcon />}
              onClick={onSubmit}
              variant="contained"
              color="green"
            />
          </div>
          <div className={styles.actionWrapper}>
            <IconButton
              size="sm"
              appearance="primary"
              icon={<ReloadIcon />}
              onClick={onReset}
              variant="contained"
              color="violet"
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className={styles.formWrapper}>
        <div className={styles.formField}>
          <Field name="title">
            {({ field }: FieldProps) => {
              return (
                <Input
                  size="sm"
                  id="outlined-basic"
                  placeholder="Заголовок"
                  {...field}
                  onChange={onTitleChange}
                />
              );
            }}
          </Field>
        </div>
        <div className={styles.formField}>
          <Field name="description">
            {({ field, form }: FieldProps) => {
              return (
                <HashTextArea
                  value={field.value}
                  hashtags={usedTags}
                  onChange={onTextChange}
                  onSearch={onTagsSearch}
                />
              );
            }}
          </Field>
        </div>
        <div className={styles.hashtagField}>
          <Field name="hashTags">
            {({ field }: FieldProps) => {
              return <HashtagListContainer hashtagNames={field.value} />;
            }}
          </Field>
        </div>
      </div>
    </Panel>
  );
};
