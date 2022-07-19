import React from 'react';
import cn from 'classnames';

import logoSrc from './logo.svg';
import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <img src={logoSrc} alt="Logo" />
    </div>
  );
};
