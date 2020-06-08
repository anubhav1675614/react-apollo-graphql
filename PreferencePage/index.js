import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import { useSelector } from 'react-redux';
import { css, ThemeContext } from 'styled-components';

import { ServerClientContext } from 'context/serverClient';

import Page from 'components/Page';

import PreferenceHero from './components/PreferenceHero';
import JobPreferenceForm from './JobPreferenceForm';

import { usePreferences } from './usePreferences';

const PreferencePage = () => {
  const { colors, display, media } = useContext(ThemeContext);

  const userId = useSelector(state => state?.user?.id);

  const serverClientContext = useContext(ServerClientContext);
  const loggedIn = useSelector(state => state?.user?.token);

  const {
    allQueriesLoaded,
    getJobAlertFrequencyQuery,
    getJobPreferences,
    getPayRate,
    getShiftTimes,
    getShiftTypes,
    getSpecialtyId,
    getStateAbbreviation,
  } = usePreferences(userId);

  if (serverClientContext.serverClient === 'server') {
    return <Page />;
  }

  if (!loggedIn && serverClientContext.serverClient !== 'server') {
    return <Redirect to="/signin" />;
  }

  return (
    <Page
      css={css`
        ${display.flexCol};
        justify-content: center;

        margin: 0 auto;

        font-size: 18px;
        font-family: Avenir, sans-serif;
      `}
      id="PreferencePage"
      page="preference"
    >
      <PreferenceHero />

      <main
        css={css`
          max-width: 914px;
          min-width: 914px;
          margin: 40px auto 32px;
          padding: 16px 16px 96px;

          border: 1px solid ${colors.linkWater};
          border-radius: 5px;

          box-sizing: border-box;

          @media ${media.mobile} {
            min-width: 1px;
            padding-bottom: 116px;
          }
        `}
      >
        {allQueriesLoaded && (
          <JobPreferenceForm
            getJobAlertFrequencyQuery={getJobAlertFrequencyQuery}
            getJobPreferences={getJobPreferences}
            getPayRate={getPayRate}
            getShiftTimes={getShiftTimes}
            getShiftTypes={getShiftTypes}
            getSpecialtyId={getSpecialtyId}
            getStateAbbreviation={getStateAbbreviation}
            id={'preference-page'}
            userId={userId}
          />
        )}
      </main>
    </Page>
  );
};

export default PreferencePage;
