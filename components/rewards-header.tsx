"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Medal, Star } from "lucide-react"
import { useRewards } from "./rewards-context"

export function RewardsHeader() {
  const { points, badges } = useRewards()

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <motion.div 
        key={points}
        initial={{ scale: 1.2, color: "#3b82f6" }}
        animate={{ scale: 1, color: "inherit" }}
        className="flex items-center gap-1.5"
      >
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span>{points} pts</span>
      </motion.div>

      {badges.length > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 border-l pl-4 border-border">
          <Medal className="w-4 h-4 text-primary" />
          <div className="flex gap-1">
            <AnimatePresence>
              {badges.map((badge) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  {badge}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
