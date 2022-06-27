import React from 'react';
import { Chip } from '@mui/material';

import { IHashTag } from '../../interfaces';

interface IHashtagProps {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  text?: string;
}

export const Hashtag: React.FC<IHashtagProps> = ({ text = '', color }) => {
  return <Chip label={`# ${text}`} color={color} />;
};
