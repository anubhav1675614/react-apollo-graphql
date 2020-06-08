import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import CheckboxGroup from 'components/CheckboxGroup';

const PreferenceCheckboxGroup = ({
  className,
  defaultValue,
  onChange,
  options,
}) => {
  const { media } = useContext(ThemeContext);

  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      `}
    >
      <CheckboxGroup
        css={css`
          max-width: 100%;
          padding-right: 5px;
          margin: 0;

          :not(:first-child) {
            margin-left: 16px;
          }

          @media ${media.mobile} {
            :not(:first-child) {
              width: 100%;
              margin-left: 0;
              margin-top: 8px;
            }
          }
        `}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

PreferenceCheckboxGroup.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  opitons: PropTypes.array,
};

export default PreferenceCheckboxGroup;
