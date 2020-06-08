import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

const BackgroundImage = ({ className, image }) => {
  const { colors, display } = useContext(ThemeContext);

  return (
    <div
      className={className}
      css={css`
        width: 140px;
        height: 140px;

        ${display.flexRow};
        justify-content: center;

        border: 2px solid ${colors.linkWater};
        border-radius: 50%;

        background: ${colors.white};
        background-image: url(${image});
        background-position: center, center;
        background-repeat: no-repeat;

        @media (max-width: 1190px) {
          width: 120px;
          height: 120px;

          background-size: 96px 96px;
        }

        @media (max-width: 1148px) {
          margin: 0 4px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }

        @media (max-width: 644px) {
          width: 52px;
          height: 52px;

          background-size: 40px 40px;
        }
      `}
    />
  );
};

BackgroundImage.defaultProps = {
  classname: '',
  image: '',
};

BackgroundImage.propTypes = {
  classname: PropTypes.string,
  image: PropTypes.string,
};

export default BackgroundImage;
