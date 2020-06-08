import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import Select from 'components/LabeledSelect';

const PriorityRankingSelect = ({
  children,
  className,
  errorClassName,
  error,
  id,
  input: { onBlur, onChange, value } = {},
  placeholder,
  wrapperClassName,
}) => (
  <div
    css={css`
      :not(:first-child) {
        padding-left: 0px;
      }
    `}
  >
    <Select
      className={className}
      error={error}
      errorClassName={errorClassName}
      id={id}
      input={{ onBlur, onChange, value }}
      placeholder={placeholder || 'Rank Priority'}
      wrapperClassName={wrapperClassName}
    >
      {children}
    </Select>
  </div>
);

PriorityRankingSelect.propTypes = {
  anyOption: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  rank1: PropTypes.string,
  rank2: PropTypes.string,
};

export default PriorityRankingSelect;
