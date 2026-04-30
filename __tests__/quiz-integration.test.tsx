import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EligibilityQuiz } from '@/components/eligibility-quiz'
import { RewardsProvider } from '@/components/rewards-context'

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}))

describe('EligibilityQuiz Integration', () => {
  it('should progress through questions and show success on "Yes" to all', async () => {
    render(
      <RewardsProvider>
        <EligibilityQuiz />
      </RewardsProvider>
    )

    // Question 1: Citizen?
    expect(screen.getByText(/Indian citizen/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Yes'))

    // Question 2: Age?
    expect(await screen.findByText(/18 years or older/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Yes'))

    // Question 3: Resident?
    expect(await screen.findByText(/ordinarily resident/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Yes'))

    // Final: Eligible!
    expect(await screen.findByText(/You are Eligible!/i)).toBeInTheDocument()
  })

  it('should show failure state if "No" is clicked', async () => {
    render(
      <RewardsProvider>
        <EligibilityQuiz />
      </RewardsProvider>
    )

    fireEvent.click(screen.getByText('No'))
    expect(await screen.findByText(/Not Yet Eligible/i)).toBeInTheDocument()
  })
})
