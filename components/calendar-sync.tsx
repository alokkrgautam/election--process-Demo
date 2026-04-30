"use client"

import * as React from "react"
import { CalendarDays, ExternalLink, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function CalendarSync() {
  const ELECTION_DATE = "20260415T070000Z" // Example Date: April 15, 2026
  const ELECTION_END_DATE = "20260415T180000Z"
  
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("🇮🇳 Polling Day: Indian General Elections 2026")}&dates=${ELECTION_DATE}/${ELECTION_END_DATE}&details=${encodeURIComponent("Don't forget to exercise your right to vote! Carry your Voter ID.")}&location=${encodeURIComponent("Your Assigned Polling Booth")}&sf=true&output=xml`

  return (
    <Card className="border-secondary/20 shadow-sm overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary via-orange-400 to-green-500" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="text-secondary" /> Election Day Reminder
        </CardTitle>
        <CardDescription className="text-xs">
          Never miss your chance to vote. Add the 2026 dates to your Google Calendar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-3 rounded-lg border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-center bg-background p-2 rounded border min-w-[50px]">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">APR</p>
              <p className="text-lg font-black leading-none">15</p>
            </div>
            <div>
              <p className="text-sm font-bold">General Elections 2026</p>
              <p className="text-[10px] text-muted-foreground">Tentative Polling Window</p>
            </div>
          </div>
          <BellRing className="w-4 h-4 text-orange-400 animate-bounce" />
        </div>

        <Button 
          variant="secondary" 
          className="w-full gap-2 text-xs h-10"
          onClick={() => window.open(googleCalendarUrl, '_blank')}
        >
          <ExternalLink className="w-3 h-3" /> Sync with Google Calendar
        </Button>
      </CardContent>
    </Card>
  )
}
