# YesPlan — Forced Choice Studio 💖

> A playful interactive invite & date-proposal funnel builder where rejection is hilariously impossible and decisions can be subtly or aggressively rigged.

Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **Lucide React**, **Framer Motion**, and **Canvas Confetti**.

---

## ✨ Features

- **Split-Screen Studio Mode (`/`):** Real-time customizer drawer on the left with an interactive live device preview on the right (toggleable between mobile smartphone and desktop views).
- **Recipient / Play Mode (`/` with URL state):** Clean, distraction-free landing page with zero builder UI for the recipient.
- **Serverless Base64 / LZ-String URL State:** Every funnel configuration compresses directly into the URL, requiring zero databases or backend infrastructure to share.
- **The Unclickable "No" Button (Evasion Engine):**
  1. `Teleport`: Bounded coordinate jumps on hover or mobile `touchstart`.
  2. `Hitbox Proximity Halo`: Repulsive physics vector pushing the button away as cursor approaches.
  3. `Decoy Shrink & Morph`: Shrinks the "No" button by 25% per attempt while the "Yes" button balloons up.
  4. `Instant Bamboozle`: Spring-animated position and label swap between Yes and No.
- **10-Attempt Escape Hatch:** Discrete text button appearing after 10 failed attempts showing a comical *"Error 500: Server refuses to accept rejection"* modal.
- **The "Only One Path" Rigged Choice Engine:** Non-target choices shake with red border flashes and humorous floating excuse tooltips (*"Kitchen is closed!"*, *"404: Not an option"*).
- **5-Step Funnel Flow:**
  1. The Pitch / Question with evasion arena & confetti
  2. Celebration & Affirmation
  3. Date & Time Slot Picker
  4. Activity / Destination Selector (Free or Rigged)
  5. Final Summary Date Pass with WhatsApp / Web Share & downloadable PNG pass
- **Preset Templates:**
  - *Romantic Date Night*
  - *Office / Colleague MVP Award*
  - *Dinner Decider*
  - *Chore Delegation*

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static export
npm run build
```

---

## 📄 License
MIT
