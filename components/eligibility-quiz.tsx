"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import { useRewards } from "./rewards-context"

/**
 * Array of questions for the eligibility quiz.
 * Follows a branching logic where answers lead to the next step or a failure state.
 */
const questions = [
  {
    id: 1,
    question: "Are you an Indian citizen?",
    yes: 2,
    no: -1,
  },
  {
    id: 2,
    question: "Are you 18 years or older as of January 1st of the qualifying year?",
    yes: 3,
    no: -1,
  },
  {
    id: 3,
    question: "Are you an ordinarily resident of the polling area where you want to be enrolled?",
    yes: 4,
    no: -1,
  },
]

/**
 * EligibilityQuiz Component
 * 
 * A gamified quiz to help users determine their eligibility to vote in Indian elections.
 * It uses success celebrations and points integration from the RewardsContext.
 * 
 * Logic follows the ECI guidelines (Citizenship, Age, Residency).
 * @see {@link checkVoterEligibility} in @/lib/election-logic for the underlying rules.
 * 
 * @returns React component for the eligibility quiz.
 */
export function EligibilityQuiz() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [direction, setDirection] = React.useState(1)
  const { addPoints, addBadge, badges } = useRewards()

  const handleAnswer = (nextStep: number) => {
    setDirection(1)
    setCurrentStep(nextStep)
    
    // Add points for each question answered
    if (nextStep > 0 && nextStep <= 4) {
      addPoints(20)
    }

    if (nextStep === 4) {
      triggerSuccess()
      if (!badges.includes("Registered Voter")) {
        setTimeout(() => addBadge("Registered Voter"), 1500)
      }
    }
  }

  const resetQuiz = () => {
    setDirection(-1)
    setCurrentStep(1)
  }

  const triggerSuccess = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#3b82f6', '#ef4444', '#ffffff']
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="w-full max-w-md mx-auto py-12 px-4">
      <div className="relative h-[300px]">
        <AnimatePresence custom={direction} mode="wait">
          {currentStep > 0 && currentStep <= questions.length && (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col justify-between border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-lg text-muted-foreground uppercase tracking-wider text-xs font-bold">
                    Question {currentStep} of {questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center text-center px-8">
                  <h2 className="text-2xl font-bold">{questions[currentStep - 1].question}</h2>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pb-8">
                  <Button
                    variant="outline"
                    className="w-24 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleAnswer(questions[currentStep - 1].no)}
                  >
                    No
                  </Button>
                  <Button
                    className="w-24 bg-primary hover:bg-primary/90"
                    onClick={() => handleAnswer(questions[currentStep - 1].yes)}
                  >
                    Yes
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="success"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col justify-between bg-primary/5 border-primary/30 shadow-lg shadow-primary/10">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-primary/20 p-3 rounded-full mb-4 w-fit text-primary">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">You are Eligible!</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground pb-2">
                  <p>Congratulations! It looks like you meet the basic requirements to vote.</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pb-8">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <MapPin className="w-4 h-4" /> Find Your Polling Place
                  </Button>
                  <Button variant="ghost" className="w-full text-xs" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === -1 && (
            <motion.div
              key="fail"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col justify-between bg-destructive/5 border-destructive/30 shadow-lg shadow-destructive/10">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-destructive/20 p-3 rounded-full mb-4 w-fit text-destructive">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-destructive">Not Yet Eligible</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground pb-2 text-sm">
                  <p>Based on your answer, you might not be eligible to vote right now. Requirements can vary by state.</p>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                  <Button variant="outline" className="w-full" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
