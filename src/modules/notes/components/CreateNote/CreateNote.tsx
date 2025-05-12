import { Divider, IconButton, Input } from 'rsuite';
import { Field, FieldProps } from 'formik';
import { Panel } from 'rsuite';
import ReloadIcon from '@rsuite/icons/Reload';

import { HashtagListContainer } from '../../../hashTags';
import { HashTextArea } from '../../../common/components/HashTextArea';

import styles from './CreateNote.module.scss';

import { IHashTag } from '../../../../interfaces';

export interface CreateNoteProps {
  isEditMode?: boolean;
  usedTags?: IHashTag[];

  onTextChange: (value?: string) => void;
  onTitleChange: (value?: string) => void;
  onTagsSearch: (value: string) => void;
  onReset: () => void;
}

export const CreateNote = ({
  isEditMode,
  usedTags,
  onTextChange,
  onTagsSearch,
  onTitleChange,
  onReset,
}: CreateNoteProps) => {
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
                  data-testid="titleInput"
                  {...field}
                  onChange={onTitleChange}
                />
              );
            }}
          </Field>
        </div>
        <div className={styles.formField}>
          <Field name="description">
            {({ field }: FieldProps) => {
              return (
                <HashTextArea
                  value={field.value}
                  data-testid="descriptionInput"
                  hashTags={usedTags}
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
