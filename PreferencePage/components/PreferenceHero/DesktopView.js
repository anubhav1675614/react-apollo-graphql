import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import BackgroundImage from '../BackgroundImage';

import { Heading2, Paragraph } from 'styles/atoms';

import mountainImage from './assets/mountain.svg';
import moneyImage from './assets/money.svg';
import daynightImage from './assets/day-night.svg';
import calendarImage from './assets/calendar.svg';

const DesktopView = ({ className }) => {
  const { display, media } = useContext(ThemeContext);

  return (
    <div
      className={className}
      css={css`
        ${display.flexRow};
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;

          width: 33.33%;
        `}
      >
        <BackgroundImage image={mountainImage} />
        <BackgroundImage
          css={css`
            margin: 0 45px;
          `}
          image={moneyImage}
        />
      </div>
      <div
        css={css`
          ${display.flexCol};
          width: 33.33%;
          margin: 0 15px;
        `}
      >
        <Heading2
          css={css`
            @media (max-width: 1330px) {
              font-size: 24px;
            }
          `}
        >
          {'Your job preferences'}
        </Heading2>
        <Paragraph
          css={css`
            text-align: center;

            @media ${media.mobileWidthMed} {
              width: 100%;
            }
          `}
        >
          {
            'Preferences help us match you with positions that are a good fit. You can see your matched positions in the job alerts that we email you.'
          }
        </Paragraph>
      </div>
      <div
        css={css`
          display: flex;
          width: 33.33%;
        `}
      >
        <BackgroundImage
          css={css`
            margin: 0 45px;
          `}
          image={daynightImage}
        />
        <BackgroundImage image={calendarImage} />
      </div>
    </div>
  );
};

DesktopView.propTypes = {
  className: PropTypes.string,
};

export default DesktopView;
