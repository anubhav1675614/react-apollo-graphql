import React from 'react';
import { css } from 'styled-components';

const RadioCircle = ({ selected }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
    `}
  >
    <div
      css={css`
        height: 24px;
        width: 24px;

        border: 1px solid #bfc4d1;
        box-sizing: border-box;
        border-radius: 50%;

        background-color: #fff;

        display: flex;
        align-items: center;
        justify-content: center;
      `}
      selected={selected}
    >
      <div
        css={css`
          height: 12px;
          width: 12px;

          border-radius: 50%;
          border: 1px solid #bfc4d1;

          border-color: ${props =>
            props.selected ? '#5E9CDE' : 'transparent'};

          background-color: ${props =>
            props.selected ? `#5E9CDE` : 'transparent'};
          box-sizing: border-box;
        `}
        selected={selected}
      />
    </div>
  </div>
);

export default RadioCircle;
