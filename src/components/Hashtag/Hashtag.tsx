import React from 'react';
import { Chip } from '@mui/material';

import { IHashTag } from '../../interfaces';

interface IHashtagProps {
  text?: string;
}

export const Hashtag: React.FC<IHashtagProps> = ({ text = '' }) => {
  return <Chip label={`# ${text}`} />;
};
