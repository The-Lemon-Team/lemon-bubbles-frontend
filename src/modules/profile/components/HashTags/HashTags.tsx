import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Heading,
  Input,
  InputGroup,
  Panel,
  Popover,
  Text,
  Tooltip,
  Whisper,
  Form,
  Divider,
  Tag,
} from 'rsuite';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { useFormik } from 'formik';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';

import { displayDate, HashTag, useAppSelector } from '../../../common';
import { useLoadTagsWithNotesQuery } from '../../../hashTags';

import styles from './HashTags.module.scss';

import { IHashTagWithNotes } from '../../../../interfaces';

interface IHashTagFormProps {
  selectedHashTag: IHashTagWithNotes;
}

interface IDefaultPopoverProps {
  content: string;
  title: string;
  color: string;
}

const DefaultPopover: React.FC<IDefaultPopoverProps> = React.forwardRef(
  ({ content, title, color, ...props }, ref: any) => {
    return (
      <Popover ref={ref} {...props}>
        <ColorPicker
        // onChange={(color) => {
        //   setFieldValue('color', color.toHexString());
        // }}
        // style={{
        //   backgroundColor: values.color,
        // }}
        // value={values.color}
        />
      </Popover>
    );
  },
);

const HashTagModule: React.FC<IHashTagFormProps> = ({ selectedHashTag }) => {
  const { values, setFieldValue } = useFormik({
    initialValues: selectedHashTag,
    onSubmit: () => void 0,
  });

  console.log('selectedHashTag', selectedHashTag);

  return (
    <Panel bordered>
      <div className={styles.hashTagFormContainer}>
        <Heading
          level={6}
          style={{
            marginBottom: '12px',
          }}
        >
          Редактировать хэштег:{' '}
        </Heading>

        <Form className={styles.form}>
          <Form.Group className={styles.colorField}>
            <Form.ControlLabel>Color:</Form.ControlLabel>
            <Whisper
              key={values.id}
              enterable
              trigger="click"
              placement="rightStart"
              controlId={values.id}
              speaker={
                <Popover>
                  <ColorPicker
                    onChange={(color) => {
                      setFieldValue('color', color.toHexString());
                    }}
                    style={{
                      backgroundColor: values.color,
                    }}
                    value={values.color}
                  />
                </Popover>
              }
            >
              <Button
                className={styles.colorBtn}
                style={{
                  backgroundColor: values.color,
                }}
              >
                <div className={styles.color}></div>
              </Button>
            </Whisper>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel className={styles.hashTagLabel}>
              Хэштег:
            </Form.ControlLabel>
            <InputGroup size="xs" className={styles.hashTagInput}>
              <Input
                onChange={(value) => setFieldValue('text', value)}
                size="xs"
                disabled
                value={values.text}
              ></Input>
              <InputGroup.Addon
                disabled
                style={{
                  cursor: 'not-allowed',
                }}
              >
                <Whisper
                  placement="top"
                  speaker={<Tooltip>Не доступно для редактирования</Tooltip>}
                >
                  <InfoRoundIcon />
                </Whisper>
              </InputGroup.Addon>
            </InputGroup>
          </Form.Group>
        </Form>

        <div className={styles.notesWrapper}>
          <Heading level={6}>Упоминания: </Heading>
          {selectedHashTag.notes?.map((note) => {
            return (
              <Accordion bordered className={styles.accordion}>
                <Accordion.Panel
                  header={
                    <div className={styles.accordionTitleWrapper}>
                      <div className={styles.accordionHeader}>
                        <Text size="small">{note.title}</Text>
                        <Text size="small">{displayDate(note.created)}</Text>
                      </div>
                    </div>
                  }
                >
                  <Text weight="bold" size="small">
                    Текст:
                  </Text>
                  <Text size="small">{note.description}</Text>
                  <Divider
                    style={{
                      margin: '12px 0',
                    }}
                  />
                  <div>
                    {note.hashTags?.map((hashTag) => (
                      <Tag
                        key={hashTag.id}
                        style={{ backgroundColor: hashTag.color }}
                        title={hashTag.text}
                      >
                        #{hashTag.text}
                      </Tag>
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion>
            );
          })}
        </div>
      </div>
    </Panel>
  );
};

export const HashTags = () => {
  const [selectedId, setSelectedId] = useState('');
  const { data: hashTags } = useLoadTagsWithNotesQuery({});
  const selectedHashTag = hashTags?.find(
    (hashTag) => hashTag.id === selectedId,
  );
  const onTagSelect = (tagId: string) => {
    if (tagId === selectedId) {
      setSelectedId('');
      return;
    }

    setSelectedId(tagId);
  };

  return (
    <div>
      <Heading level={4}>Хэштеги: </Heading>

      <div>
        <div className={styles.hashTagsContainer}>
          {hashTags?.map((hashTag) => (
            <div className={styles.hashTag} key={hashTag.id}>
              <HashTag
                onClick={() => onTagSelect(hashTag.id)}
                color={hashTag.color}
              >
                {hashTag.text} | {hashTag.notes.length}
              </HashTag>
            </div>
          ))}
        </div>
        {selectedId && (
          <div className={styles.hashTagEditor}>
            <HashTagModule selectedHashTag={selectedHashTag!} />
          </div>
        )}
      </div>
    </div>
  );
};
