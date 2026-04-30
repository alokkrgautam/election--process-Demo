import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarSync } from '@/components/calendar-sync'

describe('CalendarSync Component', () => {
  it('should render the election date and sync button', () => {
    render(<CalendarSync />)
    expect(screen.getByText(/General Elections 2026/i)).toBeInTheDocument()
    expect(screen.getByText(/Sync with Google Calendar/i)).toBeInTheDocument()
  })

  it('should open Google Calendar link on click', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<CalendarSync />)
    const button = screen.getByText(/Sync with Google Calendar/i)
    fireEvent.click(button)
    expect(windowSpy).toHaveBeenCalledWith(expect.stringContaining('calendar.google.com'), '_blank')
    windowSpy.mockRestore()
  })
})
