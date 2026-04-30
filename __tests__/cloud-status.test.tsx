import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { CloudStatus } from '@/components/cloud-status'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
  db: {}
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  limit: vi.fn()
}))

describe('CloudStatus Component', () => {
  it('should initially show loading state', () => {
    render(<CloudStatus />)
    expect(screen.getByText(/Google Cloud Status/i)).toBeInTheDocument()
  })

  it('should show connected state on successful sync', async () => {
    render(<CloudStatus />)
    await waitFor(() => {
      expect(screen.getByText(/Syncing with Firestore/i)).toBeInTheDocument()
    })
  })
})
