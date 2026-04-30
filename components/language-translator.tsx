"use client"

import * as React from "react"
import { Languages, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [isOpen, setIsOpen] = React.useState(false)

  const handleTranslate = (lang: typeof languages[0]) => {
    setSelected(lang)
    setIsOpen(false)
    setIsTranslating(true)
    setTimeout(() => {
      setIsTranslating(false)
    }, 1000)
  }

  return (
    <div className="flex items-center gap-2 relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 gap-2 border-primary/20 bg-primary/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="w-4 h-4 text-primary" />
        <span className="text-xs">{selected.name}</span>
        <ChevronDown className="w-3 h-3 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors"
              onClick={() => handleTranslate(lang)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
      
      {isTranslating && (
        <div className="flex items-center gap-1 text-[10px] text-primary animate-pulse font-bold whitespace-nowrap">
          <Sparkles className="w-3 h-3" /> AI Translating...
        </div>
      )}
    </div>
  )
}
