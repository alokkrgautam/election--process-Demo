# 🇮🇳 One‑Stop Indian Voter Guide App 🗳️

Built for **Prompt War Hack2Skill Google**, this Gamified Election Guide web application serves as a one‑stop solution for Indian voters. The app makes learning about the Indian election process, timelines, voter eligibility, and practical steps engaging, accessible, and interactive.

## Core Features ✨

### Currently Implemented:
- **Gamified Interactive Timeline**: Visual roadmap of the Indian election process (Voter Registration → MCC → Polling Day → Vote Counting).
- **Eligibility Checker (Quiz)**: Conversational quiz to verify voter eligibility based on Indian criteria (age, citizenship, residency).
- **Election GPT Chatbot**: Friendly, quiz‑master style assistant answering FAQs like “How do I apply for a Voter ID?”, “What documents do I need?”, and “What is VVPAT?”.
- **Gamified Rewards System**: Earn points and badges (e.g., "Process Master", "Registered Voter") for completing timeline phases and quizzes.
- **Modern UI & Theming**: Built with Tailwind CSS and Shadcn UI concepts, featuring Light/Dark modes, and a custom Indian patriotic theme (saffron, white, green, blue accents).

### Future Roadmap (Not Available This Time) 🚀:
- **Polling Booth Finder (Mock)**: Demo tool to show how voters can locate polling stations with sample/dummy data.
- **Personalized Voter Checklist**: Auto‑generated checklist of documents and steps needed before election day.
- **Election Glossary Explorer**: Searchable glossary of Indian election terms (e.g., EPIC, NOTA, constituency).
- **Scenario‑Based Simulations**: Role‑play as a voter, candidate, or election officer to understand responsibilities.
- **Multilingual Support**: Content available in English + Hindi (expandable to regional languages).
- **Accessibility Mode**: Voice narration, advanced screen reader compatibility, and high‑contrast themes.
- **Advanced Gamification**: Unlock achievements like “First‑Time Voter”, “Election Expert”, “Democracy Defender” and a progress tracker dashboard showing learning completion.

## Tech Stack 🛠️
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (custom Indian patriotic theme: saffron, white, green, blue accents)
- **Animations**: Framer Motion
- **Icons**: lucide‑react
- **Extras**: `canvas-confetti` (celebrations), `next-themes` (Light/Dark mode)

## How to Start Locally 🚀

1. Ensure you have Node.js installed.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd "Election Demo"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Connecting a Real API for Election GPT 🤖
Currently, `ElectionGPT` uses dummy data to simulate responses for a demonstration of UX/UI. To hook it up to a real LLM like Gemini API or OpenAI API:
1. Open `components/election-gpt.tsx`.
2. Locate the `handleSend` function.
3. Replace the `setTimeout` simulation block with an actual API call (e.g., `fetch('/api/chat', ...)`).
4. Create an API route in Next.js (e.g., `app/api/chat/route.ts`).
5. Inside your server-side API route, securely use your API Key (e.g., `process.env.GEMINI_API_KEY`) to fetch the response from the LLM. 
   **Always store API keys in environment variables (`.env.local`) and never expose them on the client side.**

## Recruiter Highlights 🌟
- Demonstrates clean architecture and accessibility best practices.
- Showcases gamification and modern UI/UX design tailored for an Indian audience.
- Built with Google‑centric coding standards for performance and scalability.

## Verification Plan & Code Standards
This project adheres to:
- **Mobile Responsiveness**: Critical for the Indian mobile-first audience.
- **Accessibility Testing**: Verified via keyboard navigation, contrast ratio checks, and basic screen reader compatibility.
- **Validation**: Verified chatbot quick-question chips, auto-scroll, quiz progression, and celebratory success states.
- **Clean Architecture**: Modular components inside `components/`.
- **Responsive Design**: Mobile-first design principles.
