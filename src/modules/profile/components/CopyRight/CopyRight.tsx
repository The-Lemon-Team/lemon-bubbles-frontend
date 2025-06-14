import { Heading, Text, IconButton } from 'rsuite';

import { GithubSvg } from './GithubSvg';

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
        <IconButton
          icon={<GithubSvg />}
          size="xs"
          onClick={() =>
            window.location.replace('https://github.com/The-Lemon-Team')
          }
        />
      </div>
    </div>
  );
};
