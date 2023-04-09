import React from 'react';
import styles from './GitHubLink.module.css';
import { ReactComponent as GitHubSVG } from 'icons/github-mark-white.svg';

const GitHubLink = () => {
  // We want referrer here, but we also don't want to make the user accidentally
  // lose their progress by changing the window on them... so we use _blank as-is
  /* eslint-disable */
  return (
    <React.Fragment>
      <a target="_blank" href="https://github.com/Evertras/evergolf">
        <div className={styles.gitHubLinkBG}>
          <div className={styles.version}>
            {process.env.REACT_APP_BUILD_VERSION}
          </div>
          <GitHubSVG height={100} />
          <div className={styles.gitHubLink}>Code here!</div>
        </div>
      </a>
    </React.Fragment>
  );
  /* eslint-enable */
};

export default GitHubLink;
