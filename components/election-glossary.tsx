"use client"

import * as React from "react"
import { BookOpen, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const glossaryTerms = [
  { term: "EPIC", meaning: "Electoral Photo Identity Card. Commonly known as the Voter ID card issued by ECI." },
  { term: "NOTA", meaning: "None of the Above. A ballot option allowing a voter to indicate disapproval of all candidates." },
  { term: "EVM", meaning: "Electronic Voting Machine. Used in India to cast and record votes securely." },
  { term: "VVPAT", meaning: "Voter Verifiable Paper Audit Trail. Provides feedback to voters using a slip to verify their vote." },
  { term: "MCC", meaning: "Model Code of Conduct. A set of guidelines issued by ECI for political parties and candidates." },
  { term: "Constituency", meaning: "An electoral district that elects a single representative to a legislative body." },
  { term: "ECI", meaning: "Election Commission of India. The autonomous constitutional authority responsible for administering elections." },
]

export function ElectionGlossary() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredTerms = glossaryTerms.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="border-border/50 shadow-sm col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl"><BookOpen className="text-secondary" /> Election Glossary Explorer</CardTitle>
        <CardDescription>Search to understand common Indian election terminology.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search terms (e.g., NOTA, EPIC)..."
            className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredTerms.map((item) => (
              <motion.div
                key={item.term}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold text-primary mb-1">{item.term}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.meaning}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTerms.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No terms found matching "{searchTerm}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
