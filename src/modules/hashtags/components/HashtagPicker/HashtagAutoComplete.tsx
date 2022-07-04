import React, { useCallback, useState } from 'react';
import {
  autocompleteClasses,
  Autocomplete,
  AutocompleteCloseReason,
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { format } from 'date-fns';
import { VirtualElement } from '@popperjs/core';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme, styled } from '@mui/material/styles';

import { AutocompletePaper } from './AutocompletePaper';

import { useRootStore } from '../../../common/stores/RootStore';

import { IHashTag } from '../../../../interfaces/IHashTag';

interface HashtagAutoCompleteProps {
  isOpen?: boolean;
  isCreatingMode?: boolean;
  selected?: IHashTag[];
  hashTags?: IHashTag[];
  onClose?: (chosenTags: IHashTag[]) => void;
}

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

interface PopperComponentProps {
  anchorEl?: null | VirtualElement | (() => VirtualElement);
  disablePortal?: boolean;
  open: boolean;
}

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;

  return <StyledAutocompletePopper {...other} />;
}

export const HashtagAutoComplete: React.FC<HashtagAutoCompleteProps> = observer(
  ({ isOpen = false, selected = [], hashTags = [], onClose = () => {} }) => {
    const theme = useTheme();
    const { createHashtagStore, hashtagsStore } = useRootStore();
    const [pendingValue, setPendingValue] = useState<IHashTag[]>(selected);
    const handleClose = useCallback(() => {
      onClose(pendingValue);
      createHashtagStore.switchOffCreatingMode();
    }, [pendingValue, onClose, createHashtagStore]);

    return (
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Box
            sx={{
              borderBottom: `1px solid ${
                theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
              }`,
              padding: '8px 10px',
              fontWeight: 600,
            }}
          >
            {createHashtagStore.isCreatingMode ? (
              <Box display="flex" alignItems="center">
                <IconButton
                  size="small"
                  sx={{ padding: '0', width: '0.5rem', height: '0.5rem' }}
                  disableRipple
                  onClick={createHashtagStore.switchOffCreatingMode}
                >
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <span>Create a hashtag:</span>
              </Box>
            ) : (
              <span>Use hashtags:</span>
            )}
          </Box>
          <Autocomplete
            open={isOpen}
            multiple
            loading={hashtagsStore.isLoading}
            loadingText="Loading hashtags..."
            onClose={(
              event: React.ChangeEvent<{}>,
              reason: AutocompleteCloseReason,
            ) => {
              if (reason === 'escape') {
                handleClose();
              }
            }}
            value={pendingValue}
            onChange={(event, newValue, reason) => {
              if (
                event.type === 'keydown' &&
                (event as React.KeyboardEvent).key === 'Backspace' &&
                reason === 'removeOption'
              ) {
                return;
              }
              setPendingValue(newValue);
            }}
            PaperComponent={AutocompletePaper}
            disableCloseOnSelect
            PopperComponent={PopperComponent}
            renderTags={() => null}
            noOptionsText="No labels"
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      mt: '2px',
                    }}
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color:
                          theme.palette.mode === 'light'
                            ? '#586069'
                            : '#8b949e',
                      },
                    }}
                  >
                    {option.text}
                    <br />
                    <span>{format(new Date(option.created), 'd MMM Y')}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                </li>
              );
            }}
            options={hashTags}
            getOptionLabel={(option) => option.text}
            renderInput={(params) =>
              createHashtagStore.isCreatingMode ? (
                <div ref={params.InputProps.ref} />
              ) : (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )
            }
          />
        </div>
      </ClickAwayListener>
    );
  },
);
