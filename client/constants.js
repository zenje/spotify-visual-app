export const TIME_RANGES = {
  LONG_TERM: {
    text: 'All Time',
    timeRange: 'long_term',
  },
  MEDIUM_TERM: {
    text: 'Six Months',
    timeRange: 'medium_term',
  },
  SHORT_TERM: {
    text: 'One Month',
    timeRange: 'short_term',
  },
};

export const TRACK_STATUS = {
  PLAYING: 'now playing',
  PAUSED: 'paused',
  LAST_PLAYED: 'last played',
};

export const RECENT_TRACKS_LIMIT = 8;

export const PRIMARY_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap';

export const CURRENT_TRACK_SIZE = {
  SMALL: `width: 250px;
          height: 350px;`,
  MEDIUM: `width: 550px;
          height: 250px;`,
  LARGE: `width: 650px;
          height: 250px;`,
};

export const WRAPPER_MAX_WIDTH = '50rem';

export const CURRENT_TRACK_IMAGE_LENGTH = {
  SMALL: 250,
  MEDIUM: 280,
};

export const SKELETON_GREY = 'lightgrey';

export const IS_LT_600W = (size) => size.width < 600;
export const IS_LT_600W_700H = (size) => size.width < 600 && size.height < 700;

export const TOOLTIP_TEXT = {
  TOP_ARTISTS: `Your top artists are updated by Spotify daily, with data being available for three time spans. Click on an artist to learn more.`,
  TOP_TRACKS: `Your top tracks are updated by Spotify daily, with data being available for three time spans.`,
  TOP_GENRES: `Your top genres are derived directly from the genres Spotify associates to your top artists. Note: This method may not reflect actual listening trends (e.g., for a user who listens to a lot of lo-fi by various artists, this may not be apparent).`,
};

// FOOTER

export const ABOUT_TEXT = `Thanks for visiting! This is a small, experimental project built on an iPad Pro in 2020, an unusual year when I had a bit too much time on my hands. Let me know if you have any suggestions, or find any bugs :D\n\n- Jessica`;

export const REPO_LINK = 'https://github.com/zenje/spotify-visual-app';
