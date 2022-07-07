import React from 'react';
import { Tag } from 'rsuite';

interface IHashtagProps {
  className?: string;
  color?: string;
  text?: string;
}

export const Hashtag: React.FC<IHashtagProps> = ({
  className,
  text = '',
  color,
}) => {
  return (
    <Tag
      size="sm"
      className={className}
      style={{
        backgroundColor: color || '#9e9e9e',
        color: '#fff',
      }}
    >
      {`# ${text}`}
    </Tag>
  );
};
