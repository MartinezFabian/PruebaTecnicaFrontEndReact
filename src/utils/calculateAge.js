import moment from 'moment';

export function calculateAge(dateOfBirth) {
  const today = moment(); // Current Date
  const birthDate = moment(dateOfBirth); // Date of birth
  const years = today.diff(birthDate, 'years'); // Calculate the difference in years

  return years;
}
