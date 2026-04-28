"use client"

import * as React from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { CheckCircle2, Circle } from "lucide-react"
import { useRewards } from "./rewards-context"

const phases = [
  {
    id: 1,
    title: "Voter Registration",
    description: "Fill out Form 6 to get your Voter ID (EPIC) from the Election Commission of India (ECI).",
  },
  {
    id: 2,
    title: "Model Code of Conduct (MCC)",
    description: "Guidelines enforced by ECI for political parties and candidates to ensure free and fair elections.",
  },
  {
    id: 3,
    title: "Polling Day",
    description: "Cast your vote securely using Electronic Voting Machines (EVM) and verify via VVPAT.",
  },
  {
    id: 4,
    title: "Vote Counting",
    description: "EVMs are unsealed in the presence of party representatives, and results are declared.",
  },
]

export function InteractiveTimeline() {
  const [activePhase, setActivePhase] = React.useState(1)
  const { addPoints, addBadge, badges } = useRewards()

  const handlePhaseClick = (id: number) => {
    if (id <= activePhase + 1) {
      if (id > activePhase) {
        addPoints(50)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#ef4444', '#ffffff']
        })
        if (id === 4 && !badges.includes("Process Master")) {
          setTimeout(() => addBadge("Process Master"), 1000)
        }
      }
      setActivePhase(id)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {phases.map((phase, index) => {
          const isActive = phase.id <= activePhase
          const isCurrent = phase.id === activePhase

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-colors duration-300 z-10 cursor-pointer ${
                  isActive
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-muted text-muted-foreground hover:border-primary/50"
                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                onClick={() => handlePhaseClick(phase.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePhaseClick(phase.id)
                  }
                }}
                aria-label={`Mark ${phase.title} as active`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isActive ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </div>

              <motion.div
                className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                  isActive ? "bg-card border-primary/20 shadow-primary/5" : "bg-muted/50 border-transparent opacity-60"
                }`}
                whileHover={isActive ? { scale: 1.02 } : {}}
              >
                <div className="flex flex-col gap-1">
                  <h3 className={`text-lg font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {phase.title}
                  </h3>
                  <p className={`text-sm ${isActive ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
