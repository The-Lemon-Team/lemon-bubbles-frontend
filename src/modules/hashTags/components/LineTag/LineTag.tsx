import { Tag } from 'rsuite';
import getCurrentContrastText from 'font-color-contrast';

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
  const backgroundColor = color || '#9e9e9e';

  return (
    <Tag
      size="sm"
      className={className}
      style={{
        backgroundColor,
        color: getCurrentContrastText(backgroundColor),
      }}
    >
      {`# ${text}`}
    </Tag>
  );
};
