import React from 'react';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IHashtagProps {
  color?: string;
  text?: string;
}

export const useHashTagColors = () => {
  const theme = useTheme();
  const DEFAULT_BACKGROUND = theme.palette.text.secondary;
  const DEFAULT_COLOR = theme.palette.grey[50];
  const getColors = (color?: string) => {
    return {
      backgroundColor: color || DEFAULT_BACKGROUND,
      color: color ? theme.palette.getContrastText(color) : DEFAULT_COLOR,
    };
  };

  return {
    getColors,
  };
};

export const getColors = (color?: string) => {};

export const Hashtag: React.FC<IHashtagProps> = ({ text = '', color }) => {
  const { getColors } = useHashTagColors();

  return <Chip label={`# ${text}`} sx={getColors(color)} />;
};
