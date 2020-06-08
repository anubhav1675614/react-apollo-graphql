import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, ThemeContext } from 'styled-components';

import { Heading4 } from 'styles/atoms';

const FormParagraph = ({ children, className, title }) => {
  const { media } = useContext(ThemeContext);

  return (
    <div>
      <Heading4
        className={className}
        css={css`
          font-weight: 900;
          margin: 32px 0 16px;

          @media ${media.mobileWidthMed} {
            text-align: center;
            margin: 24px 0 16px;
          }
        `}
      >
        {title}
      </Heading4>
      {children}
    </div>
  );
};

FormParagraph.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default FormParagraph;
