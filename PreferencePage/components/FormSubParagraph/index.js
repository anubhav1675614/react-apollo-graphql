import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import FormParagraph from '../FormParagraph';

const FormSubParagraph = ({ children, className, title }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <FormParagraph
        className={className}
        css={css`
          font-weight: 500;
          color: ${colors.chambray};
          margin: 0 0 8px;
          text-align: left;
        `}
        title={title}
      >
        {children}
      </FormParagraph>
    </div>
  );
};

FormSubParagraph.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default FormSubParagraph;
