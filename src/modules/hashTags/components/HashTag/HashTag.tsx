import React from 'react';
import { Tag } from 'rsuite';

interface IHashTagProps extends React.PropsWithChildren {
  size?: 'lg' | 'md' | 'sm';
  color: string;

  onClick?: () => void;
}

export const HashTag: React.FC<IHashTagProps> = ({
  color,
  size = 'sm',
  children,
  onClick,
  ...props
}) => {
  return (
    <Tag
      onClick={onClick}
      size={size}
      style={{
        backgroundColor: color,
        cursor: onClick ? 'pointer' : 'text',
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};
