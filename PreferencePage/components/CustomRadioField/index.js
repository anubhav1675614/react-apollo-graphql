import React, { useContext } from 'react';
import { css, ThemeContext } from 'styled-components';

import RadioCircle from './RadioCircle';

const RadioField = ({
  className,
  id,
  input: { onChange, value },
  resetPreferredStates = () => {},
  options,
}) => {
  const { colors, display, media } = useContext(ThemeContext);

  return (
    <span
      css={css`
        width: 100%;
        display: inline-flex;
        align-items: center;

        @media ${media.mobile} {
          flex-wrap: wrap;
        }

        @media ${media.mobile} {
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
      `}
    >
      {options?.map(option => {
        const checked = value === option.value;

        return (
          <label
            className={className}
            css={css`
              ${display.flexRow};

              height: 64px;
              width: 50%;

              border-radius: 5px;
              border: ${checked
                ? `2px solid ${colors.malibu};`
                : `1px solid ${colors.linkWater};`};

              background-color: ${checked
                ? `rgba(94, 156, 222, 0.15)`
                : 'white'};

              padding: 0 4px;

              box-sizing: border-box;
              cursor: pointer;

              &:not(:last-child) {
                margin-right: 16px;
              }

              & > :first-child {
                margin-left: 8px;
              }

              @media ${media.mobile} {
                width: 100%;
                padding: 0 16px;

                &:not(:first-child) {
                  margin-left: 0;
                  margin-top: 8px;
                }
              }
            `}
            key={JSON.stringify(option)}
            onClick={() => {
              onChange(option.value);
              if (option.value === 'Anywhere') resetPreferredStates();
            }}
          >
            <RadioCircle id={`${id}-${option.value}`} selected={checked} />
            <div
              css={css`
                ${display.flexCol};

                width: 100%;
                padding: 0 8px;

                hyphens: auto;
                text-align: center;
                word-break: break-word;

                @media ${media.mobile} {
                  word-break: normal;
                  hyphens: none;
                }
              `}
            >
              {option.icon && (
                <img alt="briefcase" height={24} src={option.icon} width={24} />
              )}
              {option.text}
            </div>
          </label>
        );
      })}
    </span>
  );
};

export default RadioField;
