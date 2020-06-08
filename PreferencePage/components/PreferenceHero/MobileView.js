import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import BackgroundImage from '../BackgroundImage';

import { Heading5, Paragraph } from 'styles/atoms';

import mountainImage from './assets/mountain.svg';
import moneyImage from './assets/money.svg';
import daynightImage from './assets/day-night.svg';
import calendarImage from './assets/calendar.svg';

const MobileView = ({ className }) => {
  const { display } = useContext(ThemeContext);

  return (
    <div
      className={className}
      css={css`
        ${display.flexCol};
        justify-content: center;
      `}
    >
      <div
        css={css`
          ${display.flexCol};
        `}
      >
        <Heading5
          css={css`
            margin-bottom: 16px;
            text-align: center;
          `}
        >
          {'Your job preferences'}
        </Heading5>
        <Paragraph
          css={css`
            width: 100%;
            text-align: center;
          `}
        >
          {
            'Preferences help us match you with positions that are a good fit. You can see your matched positions in the job alerts that we email you.'
          }
        </Paragraph>
      </div>
      <div
        css={css`
          width: 100%;

          ${display.flexRow};
          justify-content: center;

          margin-top: 12px;
        `}
      >
        <BackgroundImage image={mountainImage} />
        <BackgroundImage image={moneyImage} />
        <BackgroundImage image={daynightImage} />
        <BackgroundImage image={calendarImage} />
      </div>
    </div>
  );
};

MobileView.propTypes = {
  className: PropTypes.string,
};

export default MobileView;
