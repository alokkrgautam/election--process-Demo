"use client"

import * as React from "react"
import { CheckSquare, Square } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const checklistItems = [
  "Verify name in Electoral Roll via NVSP",
  "Locate assigned Polling Station",
  "Keep EPIC (Voter ID) card ready",
  "Prepare alternative ID (Aadhaar, PAN) just in case",
  "Read the Model Code of Conduct (MCC) basics",
  "Research local candidates and their backgrounds",
]

export function VoterChecklist() {
  const [completed, setCompleted] = React.useState<number[]>([])

  const toggleItem = (index: number) => {
    setCompleted((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const progress = Math.round((completed.length / checklistItems.length) * 100)

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">Personalized Checklist</CardTitle>
        <CardDescription>Get ready for polling day step-by-step.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Preparation Progress</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <ul className="space-y-2">
          {checklistItems.map((item, index) => {
            const isDone = completed.includes(index)
            return (
              <li 
                key={index}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => toggleItem(index)}
              >
                <div className={`mt-0.5 ${isDone ? "text-primary" : "text-muted-foreground"}`}>
                  {isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </div>
                <span className={`text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {item}
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
