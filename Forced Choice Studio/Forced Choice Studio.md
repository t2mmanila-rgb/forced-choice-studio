# Forced Choice Studio  
Build a production-grade, highly engaging, fully responsive interactive web application called "YesPlan" (or "Forced Choice Studio") using Next.js (App Router), React, Tailwind CSS, Lucide React icons, and Framer Motion.  
  
The application allows users to create, customize, preview, and share playful interactive invite/date-proposal funnels where rejection is hilariously impossible and multiple-choice decisions can be subtly or aggressively rigged.  
  
---  
  
### 1. APPLICATION ARCHITECTURE & MODES  
  
The app consists of two primary operational modes accessible via a persistent top header bar:  
1. **Builder / Studio Mode (`/` or `?mode=edit`):** A creator dashboard featuring a live split-screen: an intuitive settings/customizer drawer on the left and a responsive interactive device frame (desktop/mobile toggle) on the right.  
2. **Recipient / Play Mode (`/p/[slug]` or URL base64 state parameter):** A clean, full-screen, recipient-facing landing page displaying only the configured interactive experience with zero builder UI.  
  
All configuration state must be fully serializable into a compressed Base64 URL string (or hash fragment) so that users can instantly generate and copy a shareable link without requiring a backend database. Include an option to copy the link with one click.  
  
---  
  
### 2. CORE INTERACTION MECHANICS & ENGINE  
  
#### A. The Unclickable "No" Button (Evasion Engine)  
Implement a dedicated React component `<EvasiveButton />` that handles rejection evasion across both desktop and mobile touchscreens. The creator can choose one of **four selectable evasion behaviors** from a dropdown in settings:  
  
1. **Option 1: `Teleport (touchstart & mouseenter)`**  
   - **Desktop:** Triggers on `onMouseEnter` or when the cursor enters an invisible 50px buffer zone around the button. The button instantly recalculates a new bounded `(x, y)` coordinate within the parent viewport (preventing it from overflowing outside the visible screen) and translates smoothly or snaps to the new spot.  
   - **Mobile:** Triggers strictly on `onTouchStart`. The moment a finger lands on or within proximity of the button, it recalculates coordinates before a `click` or `touchend` event can register, giving the illusion of slipping away under the finger.  
   - **Escalation:** Each failed attempt slightly increments the `Yes` button scale (e.g., `+10%` per evasion).  
  
2. **Option 2: `Hitbox Proximity Halo`**  
   - The button is surrounded by an invisible, dynamic radial trigger area (padding: 40px to 80px).  
   - Tracks cursor coordinates (`mousemove`) and touch events. As soon as the pointer breaches the halo radius, the button applies a high-velocity repulsive vector pushing it in the opposite direction from the pointer's trajectory, keeping a minimum distance at all times.  
  
3. **Option 3: `Decoy Shrink & Morph`**  
   - Every time the user hovers over, enters, or taps (`onTouchStart`) the "No" button, its scale decreases by `25%` (e.g., scale: 1.0 -> 0.75 -> 0.50 -> 0.25 -> 0.05), while the positive "Yes" button simultaneously scales up (e.g., 1.1x -> 1.3x -> 1.6x -> 2.2x), eventually covering the majority of the card container until "No" disappears entirely.  
  
4. **Option 4: `Instant Bamboozle (Position & Text Swap)`**  
   - On desktop `mouseenter` or mobile `onTouchStart`, the "Yes" and "No" buttons instantly exchange visual coordinates and labels with a quick 150ms spring animation.  
   - If the user attempts to tap "No", they inevitably touch the "Yes" button that swapped into its place.  
  
#### B. The "Only One Path" Rigged Choice Engine  
On multiple-choice screens (e.g., selecting an activity, restaurant, or gift):  
- The creator can toggle **"Only One Path" Mode** and designate one specific card as the "Target / Correct" choice.  
- **Interactions for Non-Target Cards:**  
  - If a user clicks or taps any option *other* than the designated target, the card rejects selection:  
    1. Triggers a Framer Motion horizontal shake animation (`[-8px, 8px, -6px, 6px, 0px]`) with a subtle red border flash.  
    2. Displays a temporary floating humorous tooltip or bubble over the tapped card (e.g., *"Nice try!"*, *"Kitchen is closed!"*, *"404: Not an option"*, *"Are you sure? Try again 😉"*).  
    3. Prevents selection state from updating.  
- **Interactions for Target Card:**  
  - Highlights with an active theme border, pops with a gentle scale-up bounce, triggers subtle sparkle/confetti particles, and enables the "Continue" button.  
  
---  
  
### 3. MULTI-STEP FUNNEL FLOW (RECIPIENT EXPERIENCE)  
  
Build a clean 5-step interactive progression with smooth slide-and-fade Framer Motion page transitions:  
  
- **Step 1: The Pitch / Question**  
  - Title (e.g., *"Will you go out with me?"*), optional subtitle, animated icon/emoji, and the dual-button arena featuring the configurable Evasive Button and the positive button.  
  - Clicking the positive button triggers a burst of screen confetti (via `canvas-confetti`) and automatically advances to Step 2.  
  
- **Step 2: Celebration & Affirmation**  
  - Celebratory headline (e.g., *"I'm so glad you said yes!"*), joyful micro-copy, animated sticker or celebratory badge, and a single primary button: *"Press to continue"*.  
  
- **Step 3: Date & Time Picker**  
  - Section header (e.g., *"When should we go?"*).  
  - Card-based selector for day and time slots (e.g., *"Friday night"*, *"Saturday afternoon"*, *"Sunday evening"*). Supports single selection with visual checkmarks and active states.  
  
- **Step 4: Activity / Destination Selection**  
  - Section header (e.g., *"What would you like to do?"*)[cite: 1].  
  - 2x3 or 2x2 grid of cards featuring title, short description, and icon (e.g., *"Dinner"*, *"Coffee"*, *"Arcade"*, *"Movie"*, *"Picnic"*, *"Mini Golf"*)[cite: 1].  
  - Supports normal multi-select OR the **"Only One Path"** rigging engine.  
  
- **Step 5: Final Summary & Sealed Deal**  
  - Displays a clean "Booking Confirmation" / "Date Pass" card recapping the agreed date, time, and activity.  
  - Action buttons:  
    * *"Send to Me"* (generates an automatic pre-filled WhatsApp / iMessage / SMS link or triggers the Web Share API with the agreed details).  
    * *"Download Pass"* (renders the ticket card nicely).  
  
---  
  
### 4. BUILDER & SETTINGS DRAWER SPECIFICATIONS  
  
The builder panel must provide real-time updates to the preview canvas:  
1. **General & Theme Settings:**  
   - Color palette presets: *Pastel Romance* (Blush pink, soft cream, rose gold), *Electric Fun* (Purple, cyan, yellow), *Minimalist Dark* (Slate, zinc, emerald).  
   - Editable titles, question headers, and micro-copy for all 5 steps.  
2. **No-Button Evasion Settings:**  
   - Dropdown: Choose between the 4 Evasion Models (`Teleport`, `Halo Proximity`, `Decoy Shrink`, `Bamboozle Swap`).  
   - Sensitivity Slider: Proximity radius / evasion trigger distance (20px to 100px).  
   - "Yes" Growth Factor toggle (enable/disable scaling the yes button on misses).  
3. **Step 4 Logic Settings:**  
   - Mode Toggle: `Free Choice` vs. `Only One Path (Rigged)`.  
   - If `Only One Path` is active: Radio list allowing creator to select which card is the only clickable option.  
   - Custom funny rejection phrases list (creators can add/edit phrases like *"Sold out!"*, *"Try again!"*).  
4. **Card Manager:**  
   - Add, edit, remove, and reorder cards for Steps 3 and 4 (title, description, emoji/icon).  
5. **Share Modal:**  
   - "Copy Recipient Link" button (copies encoded URL).  
   - "Test Recipient View" button (opens recipient mode in a new tab).  
   - Preset Templates dropdown:  
     * *Romantic Date Night* (Dinner, Movies, etc.)  
     * *Office / Colleague MVP Award* (Voting for friend of the month)  
     * *Dinner Decider* (Rigged to a specific restaurant)  
     * *Chore Delegation* (Whose turn is it?)  
  
---  
  
### 5. DESIGN & POLISH REQUIREMENTS  
  
- **Visual Style:** Soft modern iOS/SaaS aesthetic; rounded pill buttons (`rounded-full`), smooth border strokes (`border-rose-100`, `shadow-sm`), soft backdrop blurs (`backdrop-blur-md`), and pastel gradient backgrounds.  
- **Touch & Mobile Optimization:** Ensure zero screen-scroll jitter when interacting with the evasive button by applying `touch-action: none` to evasive interactive areas.  
- **Accessibility & Escape Hatch:** If a user on desktop attempts evasion 10 times without hitting "Yes", render a tiny, comical discreet text button below the card (*"Okay okay, I give up, let me actually say no"*), which displays a playful cheeky modal (*"Error 500: Server refuses to accept rejection"*).  
  
Deliver clean, production-ready code with clear file structure, modular components, and comprehensive TypeScript interfaces for all state models.  
