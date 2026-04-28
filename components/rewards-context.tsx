"use client"

import * as React from "react"

type RewardsContextType = {
  points: number
  badges: string[]
  addPoints: (amount: number) => void
  addBadge: (badge: string) => void
}

const RewardsContext = React.createContext<RewardsContextType | undefined>(undefined)

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = React.useState(0)
  const [badges, setBadges] = React.useState<string[]>([])

  const addPoints = React.useCallback((amount: number) => {
    setPoints((prev) => prev + amount)
  }, [])

  const addBadge = React.useCallback((badge: string) => {
    setBadges((prev) => {
      if (!prev.includes(badge)) {
        return [...prev, badge]
      }
      return prev
    })
  }, [])

  return (
    <RewardsContext.Provider value={{ points, badges, addPoints, addBadge }}>
      {children}
    </RewardsContext.Provider>
  )
}

export function useRewards() {
  const context = React.useContext(RewardsContext)
  if (context === undefined) {
    throw new Error("useRewards must be used within a RewardsProvider")
  }
  return context
}
