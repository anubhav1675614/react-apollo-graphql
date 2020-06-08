import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const usePreferences = userId => {
  const getJobAlertFrequencyQuery = useQuery(
    gql`
      query get_job_alert_frequency($user_id: bigint) {
        person_prefers_job_alert_frequency(
          where: { person_id: { _eq: $user_id } }
        ) {
          job_alert_frequency
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getJobPreferences = useQuery(
    gql`
      query get_job_preferences($user_id: bigint) {
        person_has_job_preferences(where: { person_id: { _eq: $user_id } }) {
          is_actively_job_searching
          preferred_start
          primary_priority
          secondary_priority
          tertiary_priority
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getPayRate = useQuery(
    gql`
      query get_pay_rate($user_id: bigint) {
        person_prefers_pay_rate(where: { person_id: { _eq: $user_id } }) {
          minimum
          maximum
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getShiftTimes = useQuery(
    gql`
      query get_shift_times($user_id: bigint) {
        person_prefers_shift_times(where: { person_id: { _eq: $user_id } }) {
          shift_time
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getShiftTypes = useQuery(
    gql`
      query get_shift_types($user_id: bigint) {
        person_prefers_shift_types(where: { person_id: { _eq: $user_id } }) {
          shift_type
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getSpecialtyId = useQuery(
    gql`
      query get_specialty_id($user_id: bigint) {
        person_prefers_specialty(where: { person_id: { _eq: $user_id } }) {
          specialty_id
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const getStateAbbreviation = useQuery(
    gql`
      query get_state_abbreviation($user_id: bigint) {
        person_prefers_state(where: { person_id: { _eq: $user_id } }) {
          state_abbreviation
        }
      }
    `,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      variables: { user_id: userId },
    }
  );

  const allQueriesLoaded = [
    getJobAlertFrequencyQuery.loading,
    getJobPreferences.loading,
    getPayRate.loading,
    getShiftTimes.loading,
    getShiftTypes.loading,
    getSpecialtyId.loading,
    getStateAbbreviation.loading,
  ].reduce((allLoaded, isLoading) => allLoaded && !isLoading, true);

  return {
    allQueriesLoaded,
    getJobAlertFrequencyQuery,
    getJobPreferences,
    getPayRate,
    getShiftTimes,
    getShiftTypes,
    getSpecialtyId,
    getStateAbbreviation,
  };
};
