"use client"

import * as React from "react"
import { AlertTriangle, Camera, Upload, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useRewards } from "./rewards-context"
import { motion, AnimatePresence } from "framer-motion"

const violationTypes = [
  "Distributing Cash/Gifts",
  "Liquor Distribution",
  "Fake News / Hate Speech",
  "Campaigning outside permitted hours",
  "Using Government Vehicles",
]

export function MockCvigil() {
  const [step, setStep] = React.useState<"form" | "uploading" | "success">("form")
  const [violation, setViolation] = React.useState("")
  const [description, setDescription] = React.useState("")
  const { addPoints, addBadge, badges } = useRewards()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!violation) return

    setStep("uploading")
    
    setTimeout(() => {
      setStep("success")
      addPoints(100)
      if (!badges.includes("Democracy Defender")) {
        addBadge("Democracy Defender")
      }
    }, 2000)
  }

  const resetForm = () => {
    setViolation("")
    setDescription("")
    setStep("form")
  }

  return (
    <Card className="border-destructive/20 shadow-sm relative overflow-hidden" id="cvigil">
      <CardHeader className="bg-destructive/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-destructive">
          <AlertTriangle className="w-5 h-5" /> 
          cVIGIL Complaint Portal (Demo)
        </CardTitle>
        <CardDescription>
          Report Model Code of Conduct (MCC) violations anonymously.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Violation Type *</label>
                <select 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                  value={violation}
                  onChange={(e) => setViolation(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a violation type</option>
                  {violationTypes.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location & Description</label>
                <textarea 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50 resize-none h-20"
                  placeholder="E.g., Near Main Market, Sector 12..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="p-4 border-2 border-dashed rounded-lg text-center bg-muted/30 cursor-not-allowed opacity-70">
                <Camera className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Camera/Photo Upload (Simulated)</p>
              </div>

              <Button type="submit" disabled={!violation} className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Submit Report Anonymously
              </Button>
            </motion.form>
          )}

          {step === "uploading" && (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <div className="p-4 rounded-full bg-destructive/10">
                <Upload className="w-8 h-8 text-destructive animate-bounce" />
              </div>
              <h3 className="text-lg font-medium animate-pulse">Encrypting & Uploading Evidence...</h3>
              <p className="text-xs text-muted-foreground">Securing your anonymity via ECI servers.</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 space-y-4 text-center"
            >
              <div className="p-3 rounded-full bg-green-500/20 text-green-600 mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Report Submitted!</h3>
              <div className="bg-muted p-3 rounded-lg border w-full">
                <p className="text-xs text-muted-foreground mb-1">Tracking ID</p>
                <p className="font-mono font-bold tracking-wider text-primary">CV-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Action will be taken within 100 minutes as per ECI guidelines. 
                <br/><br/>
                <span className="font-bold text-primary flex items-center justify-center gap-1">
                  You earned the "Democracy Defender" badge! 🛡️
                </span>
              </p>
              <Button variant="outline" onClick={resetForm} className="mt-4 w-full">
                File Another Report
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
