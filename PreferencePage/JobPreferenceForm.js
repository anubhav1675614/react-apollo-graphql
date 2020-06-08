import React, { useContext, useState } from 'react';
import { css, ThemeContext } from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import NumberField from 'components/LabeledWholeNumberField';
import RBSelect from 'components/RBSelect';
import RBSelectOption from 'components/RBSelectOption';
import Button from 'components/Button';

import FormParagraph from './components/FormParagraph';
import CustomRadioField from './components/CustomRadioField';
import JobAlertFrequencySelect from './components/JobAlertFrequencySelect';
import PreferenceCheckboxGroup from './components/PreferenceCheckboxGroup';
import PriorityRankingSelects from './components/PriorityRankingSelects';

import { bindIds } from 'helpers/string';
import { isValidString, isWholeNumber, useField } from 'helpers/form';

import { usStates } from 'constants/index';

import briefcase from './assets/briefcase.png';
import briefcaseclose from './assets/briefcase-close.png';

const JobPreferenceForm = ({
  className,
  getJobAlertFrequencyQuery,
  getJobPreferences,
  getPayRate,
  getShiftTimes,
  getShiftTypes,
  getSpecialtyId,
  getStateAbbreviation,
  id,
  userId,
}) => {
  const idx = bindIds(id);
  const { colors, display, media } = useContext(ThemeContext);

  const [saveButtonText, setSaveButtonText] = useState('Save');

  const locationType = ['Anywhere', 'Specific Locations'];

  const jobPreferencesData =
    getJobPreferences?.data?.person_has_job_preferences?.[0];
  const isPreferenceUpdate = jobPreferencesData ? true : false;

  // Getting default preference values
  const defaultJobAlertFrequencyValue =
    getJobAlertFrequencyQuery?.data?.person_prefers_job_alert_frequency?.[0]
      ?.job_alert_frequency;
  const defaultJobStartDateValue =
    getJobPreferences?.data?.person_has_job_preferences?.[0]?.preferred_start;
  const defaultLookingforJobs =
    getJobPreferences?.data?.person_has_job_preferences?.[0]
      ?.is_actively_job_searching;
  const defaultPayRateMinimum =
    getPayRate?.data?.person_prefers_pay_rate?.[0]?.minimum;
  const defaultPayRateMaximum =
    getPayRate?.data?.person_prefers_pay_rate?.[0]?.maximum;
  const defaultRankedPriorities =
    getJobPreferences?.data?.person_has_job_preferences?.[0];
  const defaultShiftTimes = getShiftTimes?.data?.person_prefers_shift_times?.map(
    st => st.shift_time
  );
  const defaultShiftTypes =
    getShiftTypes?.data?.person_prefers_shift_types?.map(st => st.shift_type) ||
    [];
  const defaultSpecialtyIds =
    getSpecialtyId?.data?.person_prefers_specialty?.map(
      sp => sp.specialty_id
    ) || [];
  const defaultStateAbbreviation =
    getStateAbbreviation?.data?.person_prefers_state?.map(
      st => st.state_abbreviation
    ) || [];
  const defaultLocationType = defaultStateAbbreviation.length
    ? locationType[1]
    : locationType[0];

  const [lookingJobsField] = useField({
    id: idx('lookingJobsField'),
    validator: () => true,
    value: defaultLookingforJobs,
  });

  const [startDateField] = useField({
    id: idx('startDateField'),
    validator: () => true,
    value: defaultJobStartDateValue,
  });

  const [jobAlertFrequencyField] = useField({
    id: idx('jobAlertFrequencyField'),
    validator: value => isValidString(value),
    value: defaultJobAlertFrequencyValue || '',
  });

  const [shiftTimes, setShiftTimes] = useState(defaultShiftTimes);
  const updateShiftTimes = (e, selectedItems) => {
    setShiftTimes(selectedItems);
  };

  const [shiftTypes, setShiftTypes] = useState(defaultShiftTypes);
  const updateShiftTypes = (e, selectedItems) => {
    setShiftTypes(selectedItems);
  };

  const [locationField] = useField({
    id: idx('locationField'),
    validator: () => true,
    value: defaultLocationType,
  });

  const [preferredStates, setPreferredStates] = useState(
    defaultStateAbbreviation
  );
  const updatePreferredStates = selectedItems => {
    setPreferredStates(selectedItems);
  };

  const specialtiesQuery = useQuery(gql`
    query {
      allSpecialties: specialty {
        id
        marketingLabel: trustaff_marketing_label
        url_safe_name: url_safe_name
      }
    }
  `);
  const specialties = specialtiesQuery?.data?.allSpecialties || [];
  const sortedSpecialties = specialties?.sort((a, b) =>
    a.marketingLabel > b.marketingLabel ? 1 : -1
  );

  const [preferredSpecialties, setPreferredSpecialties] = useState(
    defaultSpecialtyIds
  );
  const updatePreferredSpecialties = selectedItems => {
    setPreferredSpecialties(selectedItems);
  };

  const rankedPriority = ['Pay', 'Location', 'Facility Tier'];

  const [primaryPriorityField] = useField({
    id: idx('primaryPriorityField'),
    validator: value => isValidString(value),
    value: defaultRankedPriorities?.primary_priority || rankedPriority[0],
  });

  const [secondaryPriorityField] = useField({
    id: idx('secondaryPriorityField'),
    validator: value => isValidString(value),
    value: defaultRankedPriorities?.secondary_priority || rankedPriority[1],
  });

  const [tertiaryPriorityField] = useField({
    id: idx('tertiaryPriorityField'),
    validator: value => isValidString(value),
    value: defaultRankedPriorities?.tertiary_priority || rankedPriority[2],
  });

  const [minimumPayRateField] = useField({
    errorMessage: '',
    id: idx('minimumPayRateField'),
    label: 'From ($)',
    validator: value => value === '' || isWholeNumber(value?.toString()),
    value: defaultPayRateMinimum || 0,
  });

  const [maximumPayRateField, , , setMaximumPayRateErrors] = useField({
    errorMessage: '',
    id: idx('maximumPayRateField'),
    label: 'To ($)',
    validator: value => value === '' || isWholeNumber(value?.toString()),
    value: defaultPayRateMaximum || 0,
  });

  // Get preferred start job preference
  const preferredStartJobTypeQuery = useQuery(
    gql`
      {
        preferred_start_job_preference {
          value
          description
        }
      }
    `
  );
  const preferredStartJobTypes = preferredStartJobTypeQuery?.data?.preferred_start_job_preference?.filter(
    item => item.value
  );

  const [insertJobAlertFrequency] = useMutation(
    gql`
      mutation insert_person_prefers_job_alert_frequency(
        $job_alert_frequency: String
      ) {
        insert_person_prefers_job_alert_frequency(
          objects: { job_alert_frequency: $job_alert_frequency }
        ) {
          affected_rows
        }
      }
    `
  );
  const [updateJobAlertFrequency] = useMutation(
    gql`
      mutation update_person_prefers_job_alert_frequency(
        $job_alert_frequency: String
        $user_id: bigint
      ) {
        update_person_prefers_job_alert_frequency(
          where: { person_id: { _eq: $user_id } }
          _set: { job_alert_frequency: $job_alert_frequency }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertJobPreferences] = useMutation(
    gql`
      mutation insert_person_has_job_preferences(
        $job_start_date: String
        $looking_for_jobs: Boolean
        $primary_priority: String
        $secondary_priority: String
        $tertiary_priority: String
        $person_id: bigint
      ) {
        insert_person_has_job_preferences(
          objects: {
            preferred_start: $job_start_date
            is_actively_job_searching: $looking_for_jobs
            primary_priority: $primary_priority
            secondary_priority: $secondary_priority
            tertiary_priority: $tertiary_priority
            person_id: $person_id
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [updateJobPreferences] = useMutation(
    gql`
      mutation update_person_has_job_preferences(
        $looking_for_jobs: Boolean
        $job_start_date: String
        $primary_priority: String
        $secondary_priority: String
        $tertiary_priority: String
        $user_id: bigint
      ) {
        update_person_has_job_preferences(
          where: { person_id: { _eq: $user_id } }
          _set: {
            is_actively_job_searching: $looking_for_jobs
            preferred_start: $job_start_date
            primary_priority: $primary_priority
            secondary_priority: $secondary_priority
            tertiary_priority: $tertiary_priority
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertPayRate] = useMutation(
    gql`
      mutation insert_person_prefers_pay_rate($minimum: Int, $maximum: Int) {
        insert_person_prefers_pay_rate(
          objects: { minimum: $minimum, maximum: $maximum }
        ) {
          affected_rows
        }
      }
    `
  );
  const [updatePayRate] = useMutation(
    gql`
      mutation update_person_prefers_pay_rate(
        $minimum: Int
        $maximum: Int
        $user_id: bigint
      ) {
        update_person_prefers_pay_rate(
          where: { person_id: { _eq: $user_id } }
          _set: { minimum: $minimum, maximum: $maximum }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertPreferredShiftTimes] = useMutation(
    gql`
      mutation insert_person_prefers_shift_times($shift_time: String) {
        insert_person_prefers_shift_times(
          objects: { shift_time: $shift_time }
          on_conflict: {
            constraint: uniq_person_prefers_shift_times_shift_time_person_id
            update_columns: []
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [deletePreferredShiftTimes] = useMutation(
    gql`
      mutation delete_person_prefers_shift_times(
        $shift_time: String
        $user_id: bigint
      ) {
        delete_person_prefers_shift_times(
          where: {
            person_id: { _eq: $user_id }
            _and: { shift_time: { _eq: $shift_time } }
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertPreferredShiftTypes] = useMutation(
    gql`
      mutation insert_person_prefers_shift_types($shift_type: String) {
        insert_person_prefers_shift_types(
          objects: { shift_type: $shift_type }
          on_conflict: {
            constraint: uniq_person_prefers_shift_types_shift_type_person_id
            update_columns: []
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [deletePreferredShiftTypes] = useMutation(
    gql`
      mutation delete_person_prefers_shift_types(
        $shift_type: String
        $user_id: bigint
      ) {
        delete_person_prefers_shift_types(
          where: {
            person_id: { _eq: $user_id }
            _and: { shift_type: { _eq: $shift_type } }
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertPreferredSpecialty] = useMutation(
    gql`
      mutation insert_person_prefers_specialty($specialty_id: bigint) {
        insert_person_prefers_specialty(
          objects: { specialty_id: $specialty_id }
          on_conflict: {
            constraint: uniq_person_prefers_specialty_specialty_id_person_id
            update_columns: []
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [deletePreferredSpecialty] = useMutation(
    gql`
      mutation delete_person_prefers_specialty(
        $specialty_id: bigint
        $user_id: bigint
      ) {
        delete_person_prefers_specialty(
          where: {
            person_id: { _eq: $user_id }
            _and: { specialty_id: { _eq: $specialty_id } }
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const [insertPreferredState] = useMutation(
    gql`
      mutation insert_person_prefers_state($state_abbreviation: String) {
        insert_person_prefers_state(
          objects: { state_abbreviation: $state_abbreviation }
          on_conflict: {
            constraint: uniq_person_prefers_state_state_abbreviation_person_id
            update_columns: []
          }
        ) {
          affected_rows
        }
      }
    `
  );
  const [deletePreferredState] = useMutation(
    gql`
      mutation delete_person_prefers_state(
        $state_abbreviation: String
        $user_id: bigint
      ) {
        delete_person_prefers_state(
          where: {
            person_id: { _eq: $user_id }
            _and: { state_abbreviation: { _eq: $state_abbreviation } }
          }
        ) {
          affected_rows
        }
      }
    `
  );

  const refetchAllQueries = () => {
    getJobAlertFrequencyQuery?.refetch();
    getJobPreferences?.refetch();
    getPayRate?.refetch();
    getShiftTimes?.refetch();
    getShiftTypes?.refetch();
    getSpecialtyId?.refetch();
    getStateAbbreviation?.refetch();
  };

  return (
    <form
      className={className}
      id={id}
      onSubmit={async e => {
        let isValid = true;

        // Pay rate validation
        const isValidPayRate =
          maximumPayRateField.value >= minimumPayRateField.value;
        if (!isValidPayRate) {
          setMaximumPayRateErrors({
            error:
              'Maybe maximum pay rate should be equal to or greater than minimum pay.',
            errorMessage:
              'Maybe maximum pay rate should be equal to or greater than minimum pay.',
          });
          isValid = false;
        }

        if (e) e.preventDefault();

        if (isValid) {
          try {
            await Promise.all([
              defaultJobAlertFrequencyValue !== undefined
                ? updateJobAlertFrequency({
                    variables: {
                      job_alert_frequency: jobAlertFrequencyField.value,
                      user_id: userId,
                    },
                  })
                : insertJobAlertFrequency({
                    variables: {
                      job_alert_frequency: jobAlertFrequencyField.value,
                    },
                  }),
              isPreferenceUpdate
                ? updateJobPreferences({
                    variables: {
                      job_start_date: startDateField.value,
                      looking_for_jobs: lookingJobsField.value,
                      primary_priority: primaryPriorityField.value,
                      secondary_priority: secondaryPriorityField.value,
                      tertiary_priority: tertiaryPriorityField.value,
                      user_id: userId,
                    },
                  })
                : insertJobPreferences({
                    variables: {
                      job_start_date: startDateField.value,
                      looking_for_jobs: lookingJobsField.value,
                      person_id: userId,
                      primary_priority: primaryPriorityField.value,
                      secondary_priority: secondaryPriorityField.value,
                      tertiary_priority: tertiaryPriorityField.value,
                    },
                  }),
              defaultPayRateMinimum !== undefined ||
              defaultPayRateMaximum !== undefined
                ? updatePayRate({
                    variables: {
                      maximum: maximumPayRateField.value,
                      minimum: minimumPayRateField.value,
                      user_id: userId,
                    },
                  })
                : insertPayRate({
                    variables: {
                      maximum: maximumPayRateField.value,
                      minimum: minimumPayRateField.value,
                    },
                  }),
              ...shiftTimes
                ?.filter(v => !defaultShiftTimes?.includes(v))
                .map(v =>
                  insertPreferredShiftTimes({
                    variables: {
                      shift_time: v,
                    },
                  })
                ),
              ...defaultShiftTimes
                ?.filter(v => !shiftTimes?.includes(v))
                .map(v =>
                  deletePreferredShiftTimes({
                    variables: {
                      shift_time: v,
                      user_id: userId,
                    },
                  })
                ),
              ...shiftTypes
                ?.filter(v => !defaultShiftTypes?.includes(v))
                .map(v =>
                  insertPreferredShiftTypes({
                    variables: {
                      shift_type: v,
                    },
                  })
                ),
              ...defaultShiftTypes
                ?.filter(v => !shiftTypes?.includes(v))
                .map(v =>
                  deletePreferredShiftTypes({
                    variables: {
                      shift_type: v,
                      user_id: userId,
                    },
                  })
                ),
              ...preferredSpecialties
                ?.filter(v => !defaultSpecialtyIds?.includes(v))
                .map(v =>
                  insertPreferredSpecialty({
                    variables: {
                      specialty_id: v,
                    },
                  })
                ),
              ...defaultSpecialtyIds
                ?.filter(v => !preferredSpecialties?.includes(v))
                .map(v =>
                  deletePreferredSpecialty({
                    variables: {
                      specialty_id: v,
                      user_id: userId,
                    },
                  })
                ),
              ...preferredStates
                ?.filter(v => !defaultStateAbbreviation?.includes(v))
                .map(v =>
                  insertPreferredState({
                    variables: {
                      state_abbreviation: v,
                    },
                  })
                ),
              ...defaultStateAbbreviation
                ?.filter(v => !preferredStates?.includes(v))
                .map(v =>
                  deletePreferredState({
                    variables: {
                      state_abbreviation: v,
                      user_id: userId,
                    },
                  })
                ),
            ]);
          } catch (e) {
            console.error('Could not complete submission:', e);
          } finally {
            setSaveButtonText('Saved!');
            setTimeout(() => {
              setSaveButtonText('Save');
              refetchAllQueries();
            }, 2000);
          }
        }
      }}
    >
      <FormParagraph
        css={css`
          margin-top: 0;
        `}
        title={'Are you actively looking for jobs?'}
      >
        <CustomRadioField
          {...lookingJobsField}
          options={[
            { icon: briefcase, text: 'Looking for jobs', value: true },
            {
              icon: briefcaseclose,
              text: 'Not looking for jobs',
              value: false,
            },
          ]}
        />
      </FormParagraph>

      <FormParagraph
        title={'When are you looking to start your next assignement?'}
      >
        <CustomRadioField
          {...startDateField}
          css={css`
            width: 25%;

            @media ${media.mobile} {
              width: 100%;
            }
          `}
          options={preferredStartJobTypes?.map(({ description, value }) => ({
            text: description,
            value,
          }))}
        />
      </FormParagraph>

      <FormParagraph
        title={'How often do you want to receive job alert notifications?'}
      >
        <JobAlertFrequencySelect {...jobAlertFrequencyField} />
      </FormParagraph>

      <FormParagraph title={'What time(s) of day do you prefer to work?'}>
        <PreferenceCheckboxGroup
          defaultValue={shiftTimes}
          onChange={updateShiftTimes}
          options={['Mornings', 'Afternoons', 'Nights']}
        />
      </FormParagraph>

      <FormParagraph title={'Which shift(s) do you prefer?'}>
        <PreferenceCheckboxGroup
          defaultValue={shiftTypes}
          onChange={updateShiftTypes}
          options={[
            '12 hour days 3 days/week',
            '10 hour days, 4 days/week',
            '8 hour days, 5 days/week',
          ]}
        />
      </FormParagraph>

      <FormParagraph title={'Where are you interested in working?'}>
        <CustomRadioField
          {...locationField}
          options={[
            { text: 'Anywhere', value: locationType[0] },
            { text: 'Specific Location(s)', value: locationType[1] },
          ]}
          resetPreferredStates={() => updatePreferredStates([])}
        />
      </FormParagraph>

      {locationField.value === locationType[1] && (
        <FormParagraph
          css={css`
            font-weight: 500;
            color: ${colors.chambray};
          `}
          title={
            'Positions will be prioritized according to your preferred locations first, but we’ll also show you other locations outside of these.'
          }
        >
          <RBSelect onChange={updatePreferredStates} values={preferredStates}>
            {usStates?.map(state => (
              <RBSelectOption
                key={state.abbreviation}
                value={state.abbreviation}
              >
                {state.name}
              </RBSelectOption>
            ))}
          </RBSelect>
        </FormParagraph>
      )}

      <FormParagraph
        title={'Which specialties would you like to get matches with?'}
      >
        {!specialtiesQuery.loading ? (
          <RBSelect
            onChange={updatePreferredSpecialties}
            values={preferredSpecialties}
          >
            {sortedSpecialties?.map(sp => (
              <RBSelectOption key={sp.marketingLabel} value={sp.id}>
                {sp.marketingLabel}
              </RBSelectOption>
            ))}
          </RBSelect>
        ) : null}
      </FormParagraph>

      <FormParagraph title={'Rank your priorities'}>
        <PriorityRankingSelects
          primaryPriorityField={primaryPriorityField}
          secondaryPriorityField={secondaryPriorityField}
          tertiaryPriorityField={tertiaryPriorityField}
        />
      </FormParagraph>

      <FormParagraph title={'What’s the range of your preferred pay rate?'}>
        <div
          css={css`
            ${display.flexRow};
            & > :first-child {
              & > input {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
              }
            }

            & div:not(:first-child) {
              padding-left: 0;
              margin-left: -1px;

              & > input {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }
            }
          `}
        >
          <NumberField {...minimumPayRateField} />
          <NumberField {...maximumPayRateField} />
        </div>
      </FormParagraph>

      <div
        css={css`
          width: 180px;
          float: right;
          margin-top: 32px;

          @media ${media.mobile} {
            width: 100%;
            margin-top: 50px;
          }
        `}
      >
        <Button
          className="saveAndContinueButton"
          disabled={saveButtonText === 'Saved!'}
          id={'preferencePage'}
          type="submit"
        >
          {saveButtonText}
        </Button>
      </div>
    </form>
  );
};

export default JobPreferenceForm;
