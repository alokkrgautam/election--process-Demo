import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VoterIdScanner } from '@/components/voter-id-scanner'

describe('VoterIdScanner Component', () => {
  it('should render the scan button initially', () => {
    render(<VoterIdScanner />)
    expect(screen.getByText(/Scan My Voter ID/i)).toBeInTheDocument()
  })

  it('should show loading state when scanning is triggered', async () => {
    render(<VoterIdScanner />)
    const button = screen.getByText(/Scan My Voter ID/i)
    fireEvent.click(button)
    expect(screen.getByText(/Analyzing with Gemini/i)).toBeInTheDocument()
  })

  it('should display results after a successful scan', async () => {
    render(<VoterIdScanner />)
    const button = screen.getByText(/Scan My Voter ID/i)
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText(/Scan Successful!/i)).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(screen.getByText(/Voter Name/i)).toBeInTheDocument()
    expect(screen.getByText(/ALOK KUMAR GAUTAM/i)).toBeInTheDocument()
  })
})
