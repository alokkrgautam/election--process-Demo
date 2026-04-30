"use client"

import * as React from "react"
import { Camera, Upload, CheckCircle2, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function VoterIdScanner() {
  const [isScanning, setIsScanning] = React.useState(false)
  const [scanResult, setScanResult] = React.useState<{ epic: string; name: string } | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleScan = async () => {
    setIsScanning(true)
    setError(null)
    
    try {
      // Simulation of Gemini Vision API call
      // In a real app, this would send an image buffer to /api/scan
      const response = await new Promise((resolve) => setTimeout(() => {
        resolve({ epic: "XYZ" + Math.floor(Math.random() * 1000000), name: "ALOK KUMAR GAUTAM" })
      }, 2000))
      
      setScanResult(response as any)
    } catch (err) {
      setError("Failed to scan ID. Please try again.")
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-md bg-gradient-to-br from-background to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="text-primary" /> AI Voter ID Scanner
        </CardTitle>
        <CardDescription>
          Use Google Gemini Vision to instantly extract details from your Voter ID (Demo).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!scanResult ? (
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center space-y-4 hover:border-primary/30 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
            <Button onClick={handleScan} disabled={isScanning} className="w-full">
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing with Gemini...
                </>
              ) : (
                "Scan My Voter ID"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className="bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Scan Successful!</AlertTitle>
              <AlertDescription>Gemini Vision has extracted your details correctly.</AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background border rounded-lg">
                <span className="text-[10px] uppercase text-muted-foreground font-bold">EPIC Number</span>
                <p className="text-sm font-mono font-bold text-primary">{scanResult.epic}</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <span className="text-[10px] uppercase text-muted-foreground font-bold">Voter Name</span>
                <p className="text-sm font-bold">{scanResult.name}</p>
              </div>
            </div>

            <Button variant="outline" onClick={() => setScanResult(null)} className="w-full text-xs gap-2">
              <RefreshCw className="w-3 h-3" /> Scan Another ID
            </Button>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive text-center font-medium">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}
