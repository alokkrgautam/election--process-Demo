/**
 * Logic to check voter eligibility based on Indian election rules.
 * @param age - The age of the voter.
 * @param isIndianCitizen - Boolean indicating if the person is an Indian citizen.
 * @param isResident - Boolean indicating if the person is a resident of the constituency.
 * @returns { status: 'eligible' | 'ineligible', reason?: string }
 */
export function checkVoterEligibility(age: number, isIndianCitizen: boolean, isResident: boolean) {
  if (!isIndianCitizen) {
    return { status: 'ineligible', reason: 'Only Indian citizens are eligible to vote.' }
  }
  if (age < 18) {
    return { status: 'ineligible', reason: 'Minimum age for voting is 18 years.' }
  }
  if (!isResident) {
    return { status: 'ineligible', reason: 'Must be an ordinary resident of the constituency.' }
  }
  return { status: 'eligible' }
}

/**
 * Calculates the campaign spending limit based on candidate type.
 * @param electionType - 'Assembly' or 'LokSabha'
 * @returns Limit in Rupees
 */
export function getSpendingLimit(electionType: 'Assembly' | 'LokSabha'): number {
  return electionType === 'LokSabha' ? 9500000 : 4000000
}
