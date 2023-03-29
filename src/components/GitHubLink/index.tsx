import React from 'react';
import './GitHubLink.css';
import { ReactComponent as GitHubSVG } from 'icons/github-mark-white.svg';

const GitHubLink = () => {
  // We want referrer here, but we also don't want to make the user accidentally
  // lose their progress by changing the window on them... so we use _blank as-is
  /* eslint-disable */
  return (
    <React.Fragment>
      <a target="_blank" href="https://github.com/Evertras/evergolf">
        <div className="GitHubLinkBG">
          <GitHubSVG height={100} />
          <div className="GitHubLink">Code here!</div>
        </div>
      </a>
    </React.Fragment>
  );
  /* eslint-enable */
};

export default GitHubLink;
