import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import { useWindowWidth } from 'helpers/hooks';

import DesktopView from './DesktopView';
import MobileView from './MobileView';

const PreferenceHero = ({ className }) => {
  const { colors } = useContext(ThemeContext);

  const width = useWindowWidth();
  const isMobileWidth = width < 1148;

  return (
    <div
      className={className}
      css={css`
        width: 100%;
        display: flex;
        margin: 0 auto;
      `}
    >
      <div
        css={css`
          width: 100%;

          margin: 0 24px;
          padding: 70px 40px;

          background: ${colors.whiteBurgerMenu};
          border: 1px solid ${colors.linkWater};
          border-radius: 8px;

          @media (max-width: 1148px) {
            padding: 20px;
            margin: 24px 16px 0;
          }
        `}
      >
        {isMobileWidth ? <MobileView /> : <DesktopView />}
      </div>
    </div>
  );
};

PreferenceHero.propTypes = {
  className: PropTypes.string,
};

export default PreferenceHero;
