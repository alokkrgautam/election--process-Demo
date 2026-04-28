"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles, Move } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  id: string
  role: "user" | "ai"
  content: string
}

const presetQuestions = [
  "I saw a candidate distributing cash. What should I do?",
  "How does the biometric voting simulation work?",
  "What is the limit a candidate can spend?",
  "What challenges if we add vote using biometric?",
]

const dummyResponses: Record<string, string> = {
  "I saw a candidate distributing cash. What should I do?": "IDENTIFY THE CHALLENGE: That is a clear violation of the Model Code of Conduct (MCC) and bribery laws! 🚨\n\nPROVIDE THE SOLUTION: According to ECI guidelines and the RPA, bribing voters with cash is strictly prohibited to ensure free and fair elections. ⚖️\n\nCALL TO ACTION: Please report this immediately using the ECI's cVIGIL app! Upload a photo/video, and action will be taken. 📱\n\nWould you like to earn a 'Democracy Defender' badge by answering a quick question about voting rights? 🏆",
  "How does the biometric voting simulation work?": "AADHAAR LINKING: In our simulation, the app uses the UIDAI API to cross-check your Aadhaar number against a live biometric scan (Face/Iris/Fingerprint). 👁️\n\nAUTHENTICATION: This is a secure 1:1 matching process. Biometric data is verified but NOT stored on our servers, protecting your privacy. 🔒\n\nFUTURE VISION: While the Supreme Court is currently reviewing biometric voting (as of April 2026), our app provides a secure pilot simulation of this future technology! 🇮🇳",
  "What is the limit a candidate can spend?": "IDENTIFY THE CHALLENGE: You're asking about campaign expenditure limits, a crucial part of the MCC! 💸\n\nPROVIDE THE SOLUTION: Yes! For the 2026 elections, limits are strictly monitored: ₹40 lakh for Assembly candidates and ₹95 lakh for Lok Sabha. Also, cash exceeding ₹50,000 in a vehicle can be seized unless justified! ⚖️\n\nCALL TO ACTION: Suspect overspending? Report it via the cVIGIL app. 📱\n\nReady for a challenge? Ask me a quiz question to earn your 'Election Expert' badge! 🗳️",
  "What challenges if we add vote using biometric?": "TECHNICAL HURDLES: Implementing a nationwide biometric system requires massive infrastructure, consistent internet connectivity in remote areas, and reliable power sources. 🌐\n\nPRIVACY CONCERNS: There are significant debates around data security, potential breaches, and ensuring that biometric data isn't misused. 🔒\n\nINCLUSIVITY ISSUES: Elderly voters, manual laborers whose fingerprints may have faded, or individuals with disabilities might face authentication failures. 🤝\n\nLEGAL AND ETHICAL: It requires strict legislation to prevent disenfranchisement due to technical glitches. ⚖️",
  default: "That's a fantastic question! 🌟 As the 2026 Election Compliance AI, I must remain neutral. While I don't have that specific data in my dummy memory, a real implementation would check the latest ECI rules to assist you. Ask me about MCC violations or biometric registration! ⚖️"
}

export function ElectionGPT() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Namaste! 🇮🇳 I am the 2026 Election Compliance & Voter Guide AI. I'm here to provide accurate, neutral information about the ongoing April 2026 state elections in Assam, Kerala, Tamil Nadu, West Bengal, and Puducherry. How can I assist you today? ⚖️",
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, isOpen])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false)
      
      const lowerText = text.toLowerCase()
      // Find a match if the user's text is similar to our predefined questions
      const matchedKey = Object.keys(dummyResponses).find(k => {
        if (k === 'default') return false;
        const lowerK = k.toLowerCase().replace(/[^a-z0-9 ]/g, '')
        const cleanText = lowerText.replace(/[^a-z0-9 ]/g, '')
        return lowerK.includes(cleanText) || cleanText.includes(lowerK)
      })

      const responseContent = matchedKey 
        ? dummyResponses[matchedKey] 
        : dummyResponses.default

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content: responseContent }
      setMessages((prev) => [...prev, aiMsg])
    }, 1500)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-[0_0_20px_rgba(255,153,51,0.5)] bg-gradient-to-tr from-primary to-accent hover:opacity-90 text-primary-foreground border-2 border-white/20"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={{ left: -500, right: 0, top: -500, bottom: 0 }}
            initial={{ opacity: 0, y: 50, scale: 0.8, rotate: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, rotate: -2 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-40 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-8rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden bg-background/80 backdrop-blur-xl ring-1 ring-white/20 dark:ring-white/10 rounded-2xl relative">
              {/* Gradient Border Illusion */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 pointer-events-none" />
              
              <CardHeader className="bg-gradient-to-r from-primary/90 via-background to-secondary/90 text-foreground py-4 flex flex-row items-center gap-3 space-y-0 cursor-grab active:cursor-grabbing border-b border-border/50 z-10">
                <div className="bg-white/20 backdrop-blur p-2 rounded-full shadow-inner relative">
                  <Bot className="h-5 w-5 text-foreground" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"></span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    BharatBot <Sparkles className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                  <p className="text-xs opacity-80">AI Guide to Indian Democracy</p>
                </div>
                <Move className="w-4 h-4 opacity-50" />
              </CardHeader>

              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 z-10 scrollbar-hide">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex items-start gap-2 max-w-[85%] ${
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 shadow-sm ${
                          msg.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary/20 text-primary"
                        }`}
                      >
                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-accent text-accent-foreground rounded-tr-none"
                          : "bg-background/90 border border-border/50 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-start gap-2 max-w-[85%] mr-auto"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 shadow-sm bg-primary/20 text-primary">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="p-4 rounded-2xl bg-background/90 border border-border/50 rounded-tl-none shadow-sm flex gap-1 items-center">
                        <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="px-4 py-3 bg-background/90 backdrop-blur border-t z-10">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                  {presetQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap bg-muted hover:bg-primary/20 text-foreground text-xs px-3 py-1.5 rounded-full transition-all border border-border/50 shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend(inputValue)
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask BharatBot..."
                    className="flex-grow px-4 py-2 bg-background border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping} className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-md">
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
