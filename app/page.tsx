import { ThemeToggle } from "@/components/theme-toggle"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { EligibilityQuiz } from "@/components/eligibility-quiz"
import { ElectionGPT } from "@/components/election-gpt"
import { RewardsHeader } from "@/components/rewards-header"
import { PollingBoothFinder } from "@/components/polling-booth-finder"
import { VoterChecklist } from "@/components/voter-checklist"
import { ElectionGlossary } from "@/components/election-glossary"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl -z-10" />

      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary">
              VoteGuide 🇮🇳
            </span>
          </div>
          <div className="flex items-center gap-4">
            <RewardsHeader />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Your Voice. <br className="md:hidden" />
            <span className="text-primary">Your Vote.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A one-stop gamified guide to understanding the Indian election process, checking your eligibility, and getting ready for Polling Day.
          </p>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">The Election Journey</h2>
            <p className="text-muted-foreground mt-2">Understand the key phases of the Indian election cycle.</p>
          </div>
          <InteractiveTimeline />
        </section>

        {/* Tools Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PollingBoothFinder />
          <VoterChecklist />
          <ElectionGlossary />
        </section>

        {/* Quiz Section */}
        <section className="bg-muted/30 -mx-4 px-4 py-16 rounded-3xl border border-border/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Am I Eligible?</h2>
            <p className="text-muted-foreground mt-2">Take a quick quiz to see if you meet the basic ECI requirements to vote.</p>
          </div>
          <EligibilityQuiz />
        </section>
      </div>

      <ElectionGPT />

      <footer className="border-t py-12 mt-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">VoteGuide 🇮🇳</h3>
              <p className="opacity-80">A gamified learning experience for Indian democracy. Built for Prompt War Hack2Skill Google.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Important Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">
                    Apply for Voter ID (NVSP) ↗
                  </a>
                </li>
                <li>
                  <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">
                    Search Name in Voter List ↗
                  </a>
                </li>
                <li>
                  <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">
                    Download e-EPIC ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Grievance & Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://c-vigil.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-destructive transition-colors hover:underline flex items-center gap-1">
                    File a Complaint (cVIGIL) ↗
                  </a>
                </li>
                <li>
                  <span className="opacity-80">Voter Helpline Number:</span> <strong className="text-foreground">1950</strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs opacity-60 border-t pt-8">
            <p>© {new Date().getFullYear()} VoteGuide. This is a demo application. For official voting information, please consult the official Election Commission of India website.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
