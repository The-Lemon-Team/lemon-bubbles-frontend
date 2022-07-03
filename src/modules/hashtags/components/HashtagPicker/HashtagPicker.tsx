import React, { useCallback } from 'react';
import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Popper, ButtonBase, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { HashtagAutoComplete } from './HashtagAutoComplete';

import { useHashTagColors } from '../../../../components/Hashtag';
import styles from './HashtagPicker.module.scss';

import { IHashTag } from '../../../../interfaces';

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: '100%',
  textAlign: 'left',
  paddingBottom: 8,
  color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
  fontWeight: 600,
  '&:hover,&:focus': {
    color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
  },
  '& span': {
    width: '100%',
  },
  '& svg': {
    width: 16,
    height: 16,
  },
}));

interface HashtagPickerProps {
  hashTags?: IHashTag[];
  onChange?: (hashTags: IHashTag[]) => void;
  selected?: IHashTag[];
}

export const HashtagPicker: FC<HashtagPickerProps> = ({
  selected = [],
  hashTags = [],
  onChange = () => void 0,
}) => {
  const hashTagUtils = useHashTagColors();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<IHashTag[]>(selected);

  const openAll = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const onSelectEnd = useCallback(
    (chosenTags: IHashTag[]) => {
      setValue(chosenTags);
      if (anchorEl) {
        anchorEl.focus();
      }
      setAnchorEl(null);
      onChange(value);
    },
    [setValue, setAnchorEl, onChange],
  );

  const open = Boolean(anchorEl);

  return (
    <div className={styles.container}>
      <Box sx={{ fontSize: 13 }}>
        <Button
          color="primary"
          disableRipple
          className={styles.settingsButton}
          onClick={openAll}
        >
          <Typography>Hashtags</Typography>
          <SettingsIcon />
        </Button>
        {value.map((hashTag) => (
          <Box
            key={hashTag.id}
            className={styles.chosenItem}
            style={hashTagUtils.getColors(hashTag.color)}
          >
            # {hashTag.text}
          </Box>
        ))}
      </Box>
      <StyledPopper open={open} anchorEl={anchorEl} placement="bottom-start">
        <HashtagAutoComplete
          hashTags={hashTags}
          onClose={onSelectEnd}
          selected={selected}
          isOpen={open}
        />
      </StyledPopper>
    </div>
  );
};
