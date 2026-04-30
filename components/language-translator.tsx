"use client"

import * as React from "react"
import { Languages, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { name: "English", code: "en" },
  { name: "Hindi (हिन्दी)", code: "hi" },
  { name: "Marathi (मराठी)", code: "mr" },
  { name: "Bengali (বাংলা)", code: "bn" },
  { name: "Telugu (తెలుగు)", code: "te" },
  { name: "Tamil (தமிழ்)", code: "ta" }
]

export function LanguageTranslator() {
  const [selected, setSelected] = React.useState(languages[0])
  const [isTranslating, setIsTranslating] = React.useState(false)

  const handleTranslate = (lang: typeof languages[0]) => {
    setSelected(lang)
    setIsTranslating(true)
    // Simulation of Google Translate API / Gemini Translation
    setTimeout(() => {
      setIsTranslating(false)
      // In a real app, this would trigger a global context change
    }, 1000)
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 bg-primary/5">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-xs">{selected.name}</span>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code} 
              onClick={() => handleTranslate(lang)}
              className="text-xs"
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {isTranslating && (
        <div className="flex items-center gap-1 text-[10px] text-primary animate-pulse font-bold">
          <Sparkles className="w-3 h-3" /> AI Translating...
        </div>
      )}
    </div>
  )
}
