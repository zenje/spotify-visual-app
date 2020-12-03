import React, { useState } from 'react';
import MusicIcon from '@material-ui/icons/MusicNoteOutlined';
import OverlayBase from '../OverlayBase';
import { ABOUT_TEXT, GITHUB_ICON, REPO_LINK } from '../../constants';
import { Icon, Wrapper } from './style';

export default function Footer(props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const handleClose = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Wrapper>
      <AboutOverlay open={isOverlayOpen} handleClose={handleClose} />
      <div onClick={() => setIsOverlayOpen(true)}>
        <MusicIcon fontSize="small" style={{ color: 'white' }} />
      </div>{' '}
      <div>
        <a href={REPO_LINK}>
          <Icon src={GITHUB_ICON} />
        </a>
      </div>
    </Wrapper>
  );
}

const AboutOverlay = (props) => {
  const { open, handleClose } = props;
  return (
    <OverlayBase open={open} handleClose={handleClose}>
      <>{ABOUT_TEXT}</>
    </OverlayBase>
  );
};

Footer.propTypes = {
  repoLink: PropTypes.string,
};
