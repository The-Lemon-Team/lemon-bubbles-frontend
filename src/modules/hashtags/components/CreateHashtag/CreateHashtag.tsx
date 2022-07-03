import React, { useMemo, useCallback, useState, useRef } from 'react';
import { Formik, Field, FieldProps, FormikProps } from 'formik';
import { useTheme } from '@mui/material/styles';
import { InputAdornment, TextField, IconButton, Button } from '@mui/material';
import { ColorResult } from 'react-color';
import CachedIcon from '@mui/icons-material/Cached';
import { lighten } from '@mui/material/styles';
import TagIcon from '@mui/icons-material/Tag';
import CheckIcon from '@mui/icons-material/Check';

import { colorGenerator } from '../../utils/colorGenerator';

import styles from './CreateHashtag.module.scss';

import { IHashTag } from '../../../../interfaces';

interface FormikValues extends Pick<IHashTag, 'color' | 'text'> {
  created: IHashTag[];
}

export const CreateHashtag = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const initialValues = useMemo(() => {
    return {
      created: [],
      color: colorGenerator(),
      text: '',
    };
  }, []);
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const setColor = useCallback(
    (color: string) => formikRef.current?.setFieldValue('color', color),
    [formikRef],
  );
  const handleHashtagPickerChange = useCallback(
    ({ hex }: ColorResult) => {
      setColor(hex);
    },
    [setColor],
  );
  const handleGenerateColor = useCallback(() => {
    setColor(colorGenerator());
  }, [setColor]);
  const handleSubmit = useCallback((values: FormikValues) => {}, []);
  const openDefautPicker = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setAnchorEl(event.currentTarget);
      setIsPickerOpened(true);
    },
    [setAnchorEl, setIsPickerOpened],
  );
  const closeDefaultPicker = useCallback(() => {
    anchorEl?.blur();
    setAnchorEl(null);
    setIsPickerOpened(false);
  }, [setAnchorEl, setIsPickerOpened]);

  return (
    <Formik<FormikValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      innerRef={formikRef}
    >
      <div className={styles.formWrapper}>
        <div className={styles.refresherWrapper}>
          <Field name="color">
            {({ field }: FieldProps) => {
              return (
                <Button
                  endIcon={<CachedIcon />}
                  variant="contained"
                  name="color-generator"
                  onClick={handleGenerateColor}
                  sx={{
                    color: theme.palette.getContrastText(field.value),
                    backgroundColor: field.value,
                    padding: '6px',
                    minWidth: '0',
                    '&:hover': {
                      backgroundColor: `${lighten(
                        field.value,
                        0.15,
                      )} !important`,
                    },
                  }}
                  classes={{
                    root: styles.refreshButtonRoot,
                    endIcon: styles.resetEndIcon,
                  }}
                />
              );
            }}
          </Field>
        </div>
        <div>
          <Field name="text">
            {({ field, form: { values } }: FieldProps) => {
              return (
                <TextField
                  id="input-with-icon-textfield"
                  placeholder="Введите текст"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TagIcon sx={{ color: values.color }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...field}
                />
              );
            }}
          </Field>
        </div>
        <div>
          <IconButton color="success">
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    </Formik>
  );
};
