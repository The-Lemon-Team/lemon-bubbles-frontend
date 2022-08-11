import { Tag } from 'rsuite';

interface ILineTagProps {
  className?: string;
  color?: string;
  text?: string;
}

export const LineTag: React.FC<ILineTagProps> = ({
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
