# VoteGuide 🇮🇳 - One-Stop Indian Election Guide

**VoteGuide** is a high-fidelity, gamified web application designed to empower Indian voters for the 2026 General Elections. Built for the **Prompt War Hack2Skill Google** hackathon, this platform leverages the power of Google Cloud and Gemini AI to provide a secure, accessible, and interactive voter education experience.

## 🚀 Live Demo
- **URL:** [election-demo-472193589142.us-central1.run.app](https://election-demo-472193589142.us-central1.run.app)
- **GitHub:** [alokkrgautam/election--process-Demo](https://github.com/alokkrgautam/election--process-Demo)

## ✨ Key Features
- **🤖 BharatBot (AI Assistant):** A secure, Gemini-powered chatbot that provides neutral and accurate information about election compliance and voter rights.
- **📸 AI Voter ID Scanner:** Uses **Gemini 1.5 Flash (Vision)** to instantly extract details from Voter ID cards for an automated onboarding experience.
- **🗺️ Polling Booth Finder:** Interactive integration with **Google Maps** to help users locate their assigned voting stations.
- **📅 Election Calendar Sync:** One-click integration with **Google Calendar** to set reminders for critical polling dates.
- **✅ Eligibility Quiz:** A gamified assessment of voter eligibility based on ECI standards.
- **📊 Cloud Status Monitor:** Real-time synchronization status with **Firebase Firestore**.
- **🌍 Multilingual Support:** AI-driven translation support for major Indian languages.

## 🛠️ Technology Stack
- **Frontend:** Next.js 16 (App Router), Tailwind CSS, Framer Motion.
- **AI/ML:** Google Generative AI (Gemini 1.5 Flash & Pro).
- **Backend/Cloud:** Google Cloud Run, Firebase Firestore, Firebase Auth.
- **Security:** DOMPurify (XSS protection), Server-side API Routes, Rate Limiting.
- **Testing:** Vitest, React Testing Library.

## 🔒 Security & Architecture
- **Server-Side API:** All Gemini AI calls are handled via secure server-side routes to protect API keys.
- **DoS Protection:** Built-in in-memory rate limiting to prevent API abuse.
- **Sanitization:** All AI-generated content is sanitized using DOMPurify before rendering.
- **Dockerized:** Optimized using Next.js standalone output for maximum efficiency on Cloud Run.

## 🧪 Testing
The project includes a comprehensive testing suite verified via Vitest.
```bash
# Run tests
npm test
```
Coverage includes:
- Core Election Logic (Eligibility, Spending Limits).
- Component Integration (Quiz, ID Scanner).
- Cloud Service Connectivity.

## 📜 License
This project is for demonstration purposes for the Prompt War Hack2Skill Google hackathon.
