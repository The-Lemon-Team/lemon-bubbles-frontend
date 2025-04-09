import React from 'react';
import { Tag } from 'rsuite';

interface IHashTagProps extends React.PropsWithChildren {
  size?: 'lg' | 'md' | 'sm';
  color: string;
}

export const HashTag: React.FC<IHashTagProps> = ({
  color,
  size = 'sm',
  children,
}) => {
  return (
    <Tag
      size={size}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </Tag>
  );
};
