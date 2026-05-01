import { describe, it, expect } from 'vitest'
import { checkVoterEligibility, getSpendingLimit } from '@/lib/election-logic'

describe('Election Logic Tests', () => {
  it('should be eligible for Overseas Voters even if not resident', () => {
    const result = checkVoterEligibility(25, true, false, true)
    expect(result.status).toBe('eligible')
  })

  it('should mark as eligible if all criteria are met', () => {
    const result = checkVoterEligibility(25, true, true)
    expect(result.status).toBe('eligible')
  })

  it('should mark as ineligible if age is under 18', () => {
    const result = checkVoterEligibility(17, true, true)
    expect(result.status).toBe('ineligible')
    expect(result.reason).toContain('18 years')
  })

  it('should mark as ineligible if not an Indian citizen', () => {
    const result = checkVoterEligibility(25, false, true)
    expect(result.status).toBe('ineligible')
    expect(result.reason).toContain('citizen')
  })

  it('should return correct spending limits', () => {
    expect(getSpendingLimit('LokSabha')).toBe(9500000)
    expect(getSpendingLimit('Assembly')).toBe(4000000)
  })
})
