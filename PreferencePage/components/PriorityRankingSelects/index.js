import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';

import FormSubParagraph from '../FormSubParagraph';
import PriorityRankingSelect from './PriorityRankingSelect';

const PriorityRankingSelects = ({
  className,
  primaryPriorityField,
  secondaryPriorityField,
  tertiaryPriorityField,
}) => {
  const { display, media } = useContext(ThemeContext);

  const RankPriorityWrapper = styled.div`
    display: flex;
    align-items: center;

    width: 33.33%;

    &:not(:first-child) {
      margin-left: 16px;
    }

    @media ${media.mobileWidthMed} {
      width: 100%;

      &:not(:first-child) {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  `;

  const primaryPriorityList = ['Pay', 'Location', 'Facility Tier'];
  const secondaryPriorityList = primaryPriorityList.filter(
    item => item !== primaryPriorityField?.value
  );
  secondaryPriorityField.value = secondaryPriorityList?.includes(
    secondaryPriorityField.value
  )
    ? secondaryPriorityField.value
    : secondaryPriorityList?.[0];

  const tertiaryPriorityList = secondaryPriorityList.filter(
    item => item !== secondaryPriorityField?.value
  );
  tertiaryPriorityField.value = tertiaryPriorityList?.[0];

  return (
    <div
      className={className}
      css={css`
        ${display.flexRow};

        @media ${media.mobileWidthMed} {
          ${display.flexCol};
        }
      `}
    >
      <RankPriorityWrapper>
        <FormSubParagraph title={'Priority 1'}>
          <PriorityRankingSelect {...primaryPriorityField}>
            {primaryPriorityList.map(rank => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </PriorityRankingSelect>
        </FormSubParagraph>
      </RankPriorityWrapper>

      <RankPriorityWrapper>
        <FormSubParagraph title={'Priority 2'}>
          <PriorityRankingSelect {...secondaryPriorityField}>
            {secondaryPriorityList.map(rank => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </PriorityRankingSelect>
        </FormSubParagraph>
      </RankPriorityWrapper>

      <RankPriorityWrapper>
        <FormSubParagraph title={'Priority 3'}>
          <PriorityRankingSelect {...tertiaryPriorityField}>
            {tertiaryPriorityList.map(rank => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </PriorityRankingSelect>
        </FormSubParagraph>
      </RankPriorityWrapper>
    </div>
  );
};

export default PriorityRankingSelects;
