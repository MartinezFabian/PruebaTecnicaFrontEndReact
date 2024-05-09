import { calculateAge } from '../../src/utils/calculateAge';

/* Mock of the moment function to simulate its behavior; 
  It doesn't matter how moment calculates the difference in years; 
  what matters is how calculateAge uses that information
*/
jest.mock('moment', () => () => ({
  diff: () => 22, // Mock the difference in years returned by moment function
}));

describe('Tests in calculateAge', () => {
  it('must return the correct age', () => {
    const dateOfBirth = '2001-05-24';

    const age = calculateAge(dateOfBirth);

    expect(age).toBe(22);
  });
});
