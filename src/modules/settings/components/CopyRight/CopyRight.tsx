import { Heading, Text, IconButton } from 'rsuite';
import GoogleIcon from '@rsuite/icons/Google';
import IOsIcon from '@rsuite/icons/IOs';
import AndroidIcon from '@rsuite/icons/Android';
import MiniProgramIcon from '@rsuite/icons/MiniProgram';

import styles from './CopyRight.module.scss';

export const CopyRight = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Heading level={5}>Lemon Bubbles</Heading>
      </div>
      <div className={styles.copyright}>
        <Text size="lg">© Copyright by Lemon Team</Text>
      </div>
      <div className={styles.socialsContainer}>
        <IconButton icon={<GoogleIcon />} size="xs" />
        <IconButton icon={<IOsIcon />} size="xs" />
        <IconButton icon={<AndroidIcon />} size="xs" />
        <IconButton icon={<MiniProgramIcon />} size="xs" />
      </div>
    </div>
  );
};
