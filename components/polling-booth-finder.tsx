"use client"

import * as React from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function PollingBoothFinder() {
  const [epicNumber, setEpicNumber] = React.useState("")
  const [result, setResult] = React.useState<{ name: string; address: string } | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!epicNumber.trim()) return

    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setLoading(false)
      setResult({
        name: "Government Primary School, Sector 4",
        address: "Room No. 2, Block A, New Delhi - 110001",
      })
    }, 1000)
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl"><MapPin className="text-primary" /> Find Your Polling Booth (Demo)</CardTitle>
        <CardDescription>Enter your dummy EPIC number to locate your mock polling station.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={epicNumber}
            onChange={(e) => setEpicNumber(e.target.value)}
            placeholder="Enter EPIC No. (e.g., ABC1234567)"
            className="flex-grow px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" disabled={loading || !epicNumber.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {loading ? "Searching..." : <><Search className="w-4 h-4 mr-2" /> Search</>}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-3">
            <div>
              <h4 className="font-bold text-foreground">Assigned Polling Station:</h4>
              <p className="text-sm font-medium mt-1">{result.name}</p>
              <p className="text-xs text-muted-foreground">{result.address}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs gap-2"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.name + ' ' + result.address)}`, '_blank')}
            >
              <MapPin className="w-3 h-3" /> View on Google Maps
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
