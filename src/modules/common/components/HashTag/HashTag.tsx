import React from 'react';
import { Tag } from 'rsuite';

interface IHashTagProps extends React.PropsWithChildren {
  color: string;
}

export const HashTag: React.FC<IHashTagProps> = ({ color, children }) => {
  return (
    <Tag
      size="sm"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </Tag>
  );
};
