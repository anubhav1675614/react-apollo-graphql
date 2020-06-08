import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Select from 'components/LabeledSelect';

const JobAlertFrequencySelect = ({
  className,
  errorClassName,
  error,
  id,
  input: { onBlur, onChange, value } = {},
  placeholder,
  wrapperClassName,
}) => {
  const alertFrequencyTypeQuery = useQuery(
    gql`
      {
        preferred_job_alert_frequency_type {
          value
          description
        }
      }
    `
  );

  const alertFrequencyTypes = alertFrequencyTypeQuery?.data?.preferred_job_alert_frequency_type?.filter(
    item => item.value
  );

  return (
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
        placeholder={placeholder || 'Notification Frequency'}
        wrapperClassName={wrapperClassName}
      >
        {alertFrequencyTypes?.map(({ description, value }) => (
          <option key={value} value={value}>
            {description}
          </option>
        ))}
      </Select>
    </div>
  );
};

JobAlertFrequencySelect.propTypes = {
  anyOption: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }),
  placeholder: PropTypes.string,
};

export default JobAlertFrequencySelect;
