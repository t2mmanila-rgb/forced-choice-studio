import { AppConfig, ChoiceCard, EvasionBehavior, ThemeId } from "@/types";

export interface ArchetypeTopic {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  defaultTheme: ThemeId;
  defaultEvasion: EvasionBehavior;
  headlines: string[];
  subtitles: string[];
  yesTexts: string[];
  noTexts: string[];
  step2Titles: string[];
  step2Subtitles: string[];
  step2Buttons: string[];
  step3Titles: string[];
  step3Subtitles: string[];
  step3Options: ChoiceCard[];
  step4Titles: string[];
  step4Subtitles: string[];
  step4Target: ChoiceCard;
  step4Rejections: ChoiceCard[];
  rejectionPhrases: string[];
  step5Titles: string[];
  step5Subtitles: string[];
  badgeTexts: string[];
  confirmButtonTexts: string[];
}

export const ARCHETYPES: Record<string, ArchetypeTopic> = {
  "favourite-parent": {
    id: "favourite-parent",
    name: "Choose your favourite parent?",
    emoji: "👨‍👩‍👧",
    tagline: "End the household debate once and for all with science!",
    defaultTheme: "electric-fun",
    defaultEvasion: "halo",
    headlines: [
      "Who is your undisputed favourite parent?",
      "Who is the objectively superior parent in this house?",
      "Official Parent of the Year Election: Cast your vote!",
    ],
    subtitles: [
      "Think carefully... although household science already knows the truth! 😉",
      "Answer honestly. Your selection is permanently recorded in the family archive.",
      "No pressure, but your inheritance balance may depend on this.",
    ],
    yesTexts: [
      "Dad, without question! 🏆",
      "Mom, obviously the best! 🌟",
      "100% Mom / Dad! ❤️",
    ],
    noTexts: [
      "I love both equally",
      "I plead the fifth",
      "Neither parent",
    ],
    step2Titles: [
      "I knew it! The truth hurts, but it sets you free.",
      "Official Parental Victory Declared!",
      "The household debate is officially settled.",
    ],
    step2Subtitles: [
      "Your vote has been locked into the blockchain. Reversal is strictly prohibited.",
      "Mom and Dad have been notified of your supreme loyalty.",
      "You made the right choice. Now let's arrange their celebration.",
    ],
    step2Buttons: [
      "Proceed to Reward Setup 🎁",
      "Claim Your Parental Prize 🚀",
      "Lock in the Celebration ✨",
    ],
    step3Titles: [
      "When are you visiting your favourite parent?",
      "Select the mandatory quality time window:",
      "When are you treating them?",
    ],
    step3Subtitles: [
      "Parental bonding cannot be postponed any longer:",
      "Pick the optimal time slot to shower them with gratitude:",
      "Choose your availability:",
    ],
    step3Options: [
      { id: "parent-sunday", title: "This Sunday for Dinner", description: "Home-cooked food & family gossip", emoji: "🍲" },
      { id: "parent-weekend", title: "Every Single Weekend", description: "Parental bliss & free laundry", emoji: "🧺" },
      { id: "parent-now", title: "Right Now / On My Way", description: "Already in the car heading over", emoji: "🚗" },
      { id: "parent-holiday", title: "Mother's / Father's Day Tribute", description: "The annual grand honorary feast", emoji: "💐" },
    ],
    step4Titles: [
      "What reward does your favourite parent receive?",
      "Choose the official tribute package:",
      "How will you compensate their parental sacrifice?",
    ],
    step4Subtitles: [
      "Reward them for years of unconditional patience & driving you around:",
      "Select an appropriate reward for the #1 parent:",
      "Cast your vote for the final compensation package:",
    ],
    step4Target: {
      id: "reward-hugs-tech",
      title: "Unlimited Hugs, Love & Free Tech Support",
      description: "Fixing their Wi-Fi forever + gourmet 5-star dinner treat",
      emoji: "💖",
    },
    step4Rejections: [
      { id: "reward-gascard", title: "Gas Station Greeting Card", description: "Bought 3 minutes before arriving", emoji: "⛽" },
      { id: "reward-call", title: "A 15-Second Phone Call", description: "'Hey gotta run bye' once a month", emoji: "📱" },
      { id: "reward-socks", title: "Single Pair of Plain White Socks", description: "Wrong shoe size included", emoji: "🧦" },
      { id: "reward-delivered", title: "Leaving their text on 'Delivered'", description: "Seen at 2:14 PM with no reply", emoji: "👀" },
    ],
    rejectionPhrases: [
      "Family Court policy prohibits this cheap choice! 👨‍⚖️",
      "Error: Minimum love requirement not met! 🚨",
      "Nice try! They raised you better than that! 😂",
      "Denied: Budget approved only for the #1 parent package!",
      "Option unavailable due to acute lack of effort! ❌",
    ],
    step5Titles: [
      "Official Favourite Parent Award",
      "Certified Best Parent Declaration",
      "Household Superiority Contract",
    ],
    step5Subtitles: [
      "Certified and ratified in an entirely unbiased, non-negotiable household poll.",
      "Framed and sealed under the sovereign laws of parental pride.",
      "Send this official screenshot to the family group chat to assert dominance.",
    ],
    badgeTexts: [
      "PARENT OF THE DECADE",
      "UNDISPUTED #1 MOM/DAD",
      "OFFICIALLY RATIFIED",
    ],
    confirmButtonTexts: [
      "Send to Family Group Chat 📱",
      "Send Proof via WhatsApp 💬",
      "Copy Official Certificate 🏆",
    ],
  },

  "romantic-date": {
    id: "romantic-date",
    name: "Romantic Date Night 💖",
    emoji: "💖",
    tagline: "Lock in your dream date with zero chance of rejection!",
    defaultTheme: "pastel-romance",
    defaultEvasion: "teleport",
    headlines: [
      "Will you go out on a date with me?",
      "Are you free to be my date this weekend?",
      "Official Romance Invitation: Will you say yes?",
    ],
    subtitles: [
      "Think carefully... although you might not have much of a choice! 😉",
      "Rejection is mathematically impossible. Resistance is futile.",
      "The sweetest invitation with the highest acceptance rate in history.",
    ],
    yesTexts: [
      "Yes, absolutely! 🥰",
      "100% Yes, can't wait! 💖",
      "Yes, of course! ✨",
    ],
    noTexts: [
      "No thanks",
      "I'm busy forever",
      "Pass",
    ],
    step2Titles: [
      "YAY! I knew you'd say yes!",
      "Best Decision of Your Week!",
      "Date Confirmed! The stars have aligned.",
    ],
    step2Subtitles: [
      "Refusal was never an option anyway. Let's make it unforgettable.",
      "I have already started looking at menus. Prepare yourself.",
      "Official date protocol activated. Now for the fun part.",
    ],
    step2Buttons: [
      "Let's plan our date ✨",
      "Pick Time & Place 🍷",
      "Customize Our Rendezvous 🚀",
    ],
    step3Titles: [
      "When are you free?",
      "Pick our rendezvous time slot:",
      "When is our dream date taking place?",
    ],
    step3Subtitles: [
      "Pick the best time slot for our grand rendezvous:",
      "Select when we are painting the town red:",
      "Your presence is required at:",
    ],
    step3Options: [
      { id: "opt-fri-night", title: "Friday Night", description: "After work drinks & vibes", emoji: "🌙" },
      { id: "opt-sat-eve", title: "Saturday Evening", description: "Prime weekend golden hour", emoji: "✨" },
      { id: "opt-sun-brunch", title: "Sunday Brunch", description: "Lazy morning mimosas & waffles", emoji: "🥞" },
      { id: "opt-whenever", title: "Whenever You Want", description: "My calendar is wide open for you", emoji: "💌" },
    ],
    step4Titles: [
      "What are we doing?",
      "Choose our dream date activity:",
      "Select tonight's itinerary:",
    ],
    step4Subtitles: [
      "Choose our dream activity (some options might be slightly preferred...)",
      "Cast your vote for the main event:",
      "Pick from our exclusive activity menu:",
    ],
    step4Target: {
      id: "act-dinner-movie",
      title: "Candlelight Dinner & Rooftop Drinks",
      description: "5-star food, great drinks & city skyline views",
      emoji: "🍷",
    },
    step4Rejections: [
      { id: "act-gym", title: "Leg Day at the Gym", description: "Heavy squats until we can't walk", emoji: "🏋️" },
      { id: "act-grocery", title: "Grocery Shopping", description: "Comparing olive oil prices for 2 hours", emoji: "🛒" },
      { id: "act-taxes", title: "Doing Taxes Together", description: "Organizing receipts and spreadsheets", emoji: "📊" },
      { id: "act-ikea", title: "Assembling IKEA Furniture", description: "Testing our patience with an Allen key", emoji: "🪑" },
    ],
    rejectionPhrases: [
      "Kitchen is closed for that choice! 👨‍🍳",
      "Sold out! Try again 😉",
      "404: Option Not Found!",
      "Are you sure? Re-read carefully! 🧐",
      "Nope, the computer says no!",
    ],
    step5Titles: [
      "Official Date Confirmation",
      "Certified Date Night Pass",
      "Binding Romantic Rendezvous",
    ],
    step5Subtitles: [
      "It's locked in! Screenshot or send this pass so it's legally binding.",
      "Ratified under the international laws of romance.",
      "Show this pass at the venue for VIP romantic privileges.",
    ],
    badgeTexts: [
      "CONFIRMED & SEALED",
      "VIP DATE PASS",
      "LEGALLY BINDING",
    ],
    confirmButtonTexts: [
      "Send via WhatsApp / iMessage 💌",
      "Share Romantic Ticket ✨",
      "Confirm Reservation 🥂",
    ],
  },

  "office-mvp": {
    id: "office-mvp",
    name: "Office Colleague MVP Award 🏆",
    emoji: "🏆",
    tagline: "Rig an executive workplace vote for yourself or a colleague!",
    defaultTheme: "electric-fun",
    defaultEvasion: "halo",
    headlines: [
      "Is Michael the undisputed Colleague of the Year?",
      "Who deserves the prestigious Office MVP Award?",
      "Official Peer Review: Are they the best coworker ever?",
    ],
    subtitles: [
      "Please submit your completely unbiased, strictly anonymous employee vote.",
      "Management requires 100% team participation.",
      "HR compliance survey: Refusal triggers a mandatory team building seminar.",
    ],
    yesTexts: [
      "100% Yes, obviously! 🌟",
      "Undisputed MVP! 🥇",
      "Absolutely, promote them! 🚀",
    ],
    noTexts: [
      "Disagree",
      "I vote for myself",
      "Needs improvement",
    ],
    step2Titles: [
      "Thank you for your honesty!",
      "Peer Review Successfully Submitted!",
      "Unanimous Consensus Achieved!",
    ],
    step2Subtitles: [
      "Your transparent workplace feedback has been noted in the blockchain.",
      "The executive board applauds your team spirit.",
      "Now let's allocate the appropriate workplace bonus.",
    ],
    step2Buttons: [
      "Proceed to Reward Allocation 🚀",
      "Authorize Bonus Package 💰",
      "Present the Trophy 🏆",
    ],
    step3Titles: [
      "When should we present the trophy?",
      "Select the ceremonial all-hands time slot:",
      "When is the award ceremony?",
    ],
    step3Subtitles: [
      "Choose the ceremony time for maximum team visibility:",
      "Select the ceremonial all-hands time slot:",
      "Pick when the confetti cannons go off:",
    ],
    step3Options: [
      { id: "opt-standup", title: "Tomorrow Standup", description: "First thing in the morning", emoji: "☕" },
      { id: "opt-allhands", title: "Friday All-Hands", description: "In front of the entire company", emoji: "🎤" },
      { id: "opt-slack", title: "Immediate Slack Blast", description: "With @channel sirens and confetti", emoji: "🚨" },
      { id: "opt-now", title: "Right Now", description: "Why wait any longer?", emoji: "⚡" },
    ],
    step4Titles: [
      "What perk should the MVP receive?",
      "Cast your vote for the MVP reward package:",
      "Select the executive compensation package:",
    ],
    step4Subtitles: [
      "Select the executive bonus package:",
      "Cast your vote for the MVP reward package:",
      "Choose the appropriate compensation:",
    ],
    step4Target: {
      id: "perk-coffee-raise",
      title: "Unlimited Coffee & Big Raise",
      description: "Fully funded espresso bar & fat quarterly bonus",
      emoji: "☕",
    },
    step4Rejections: [
      { id: "perk-pizza", title: "Single Cold Pizza Slice", description: "One slice leftover from yesterday", emoji: "🍕" },
      { id: "perk-pager", title: "Weekend On-Call Duty", description: "24/7 alerts for minor warnings", emoji: "📟" },
      { id: "perk-pen", title: "A Branded Ballpoint Pen", description: "That runs out of ink in 10 minutes", emoji: "🖊️" },
    ],
    rejectionPhrases: [
      "HR policy prohibits this option!",
      "Error: Insufficient team karma!",
      "Nice try, management rejected this!",
      "Budget approved only for the top choice! 💰",
    ],
    step5Titles: [
      "Certified MVP Declaration",
      "Executive Excellence Certificate",
      "Official Employee of the Century",
    ],
    step5Subtitles: [
      "Voted by 100% of respondents in an entirely unmanipulated poll.",
      "Officially ratified by human resources and executive leadership.",
      "Send to the company Slack channel immediately.",
    ],
    badgeTexts: [
      "EXECUTIVE SIGN-OFF",
      "UNANIMOUS MVP",
      "BLOCKCHAIN CERTIFIED",
    ],
    confirmButtonTexts: [
      "Share with the Team 💬",
      "Post to Slack / Teams 📢",
      "Download Executive Pass 🏆",
    ],
  },

  "dinner-decider": {
    id: "dinner-decider",
    name: "Dinner & Food Decider 🍕",
    emoji: "🍕",
    tagline: "Destroy dinner indecision and force the feast you actually crave!",
    defaultTheme: "pastel-romance",
    defaultEvasion: "bamboozle",
    headlines: [
      "Are you hungry and ready to eat?",
      "Can we finally agree on dinner tonight?",
      "Official Food Summit: Time to eat?",
    ],
    subtitles: [
      "Tired of the 'I don't know, what do you want?' loop? Let's settle it!",
      "Decision paralysis ends right here, right now.",
      "Hangry negotiations are officially open.",
    ],
    yesTexts: [
      "Yes, Feed Me Now! 😋",
      "Starving, let's eat! 🍕",
      "Yes, food time! 🍣",
    ],
    noTexts: [
      "I'm not hungry",
      "I don't care, you pick",
      "Maybe later",
    ],
    step2Titles: [
      "Fantastic! The chef is ready.",
      "Hunger Crisis Averted!",
      "Decision Paralysis Defeated!",
    ],
    step2Subtitles: [
      "Decision paralysis ends today. Prepare your taste buds.",
      "No more back-and-forth texting. The kitchen is warming up.",
      "Time to lock in the dream restaurant.",
    ],
    step2Buttons: [
      "Pick the Menu 🍽️",
      "Choose Restaurant 🍷",
      "Lock In Dinner 🍕",
    ],
    step3Titles: [
      "What time are we eating?",
      "Timing is everything when cravings strike:",
      "Select dinner schedule:",
    ],
    step3Subtitles: [
      "Select when we break bread:",
      "Timing is everything when cravings strike:",
      "Pick your dining window:",
    ],
    step3Options: [
      { id: "time-asap", title: "ASAP / Starving", description: "Within the next 30 minutes", emoji: "🚀" },
      { id: "time-7pm", title: "7:30 PM", description: "Classic dinner prime time", emoji: "🕖" },
      { id: "time-late", title: "Late Night Craving", description: "Post 9:00 PM feast", emoji: "🌙" },
    ],
    step4Titles: [
      "Where are we eating?",
      "Choose tonight's dining destination:",
      "What are you ordering?",
    ],
    step4Subtitles: [
      "Choose from tonight's curated dining destinations:",
      "Pick from our exclusive dinner menu:",
      "The only approved culinary selections:",
    ],
    step4Target: {
      id: "food-sushi",
      title: "Fresh Sushi & Sashimi Boat",
      description: "Melt-in-your-mouth spicy tuna & specialty rolls",
      emoji: "🍣",
    },
    step4Rejections: [
      { id: "food-salad", title: "Plain Iceberg Lettuce", description: "No dressing, just crunchy water", emoji: "🥗" },
      { id: "food-leftover", title: "Mystery Fridge Tupperware", description: "Estimated age: 2 to 3 weeks", emoji: "🥡" },
      { id: "food-water", title: "Tap Water & Deep Breaths", description: "Extreme intermittent fasting", emoji: "💧" },
    ],
    rejectionPhrases: [
      "Health inspection pending! ❌",
      "Fully booked until 2029! 📅",
      "The chef took the day off!",
      "Nope, you ate that yesterday!",
      "System glitch: Choose the tasty option!",
    ],
    step5Titles: [
      "Dinner Table Reservation Pass",
      "Confirmed Dining Ticket",
      "Official Feast Voucher",
    ],
    step5Subtitles: [
      "Your dining selection has been locked into the kitchen queue.",
      "Non-refundable culinary agreement confirmed.",
      "Send to your dining partner so they cannot back out.",
    ],
    badgeTexts: [
      "TABLE RESERVED",
      "CHEF APPROVED",
      "FEAST CONFIRMED",
    ],
    confirmButtonTexts: [
      "Send Dining Order 📲",
      "Share with Dinner Partner 🍕",
      "Confirm Table 🍷",
    ],
  },

  "chore-delegator": {
    id: "chore-delegator",
    name: "Chore Delegation & Duty Split 🧹",
    emoji: "🧹",
    tagline: "End roommate & couple disputes with an airtight cleaning contract!",
    defaultTheme: "minimalist-dark",
    defaultEvasion: "shrink",
    headlines: [
      "Do you agree to fair household chore division?",
      "Will you fulfill your household cleaning duty?",
      "Official Roommate Agreement: Sign below!",
    ],
    subtitles: [
      "In the spirit of harmony and clean countertops, sign below:",
      "Clean floors build strong relationships. Refusal is invalid.",
      "The dishwasher will not empty itself.",
    ],
    yesTexts: [
      "I agree to fair chores 🤝",
      "Yes, I will clean! 🧼",
      "Signed and sealed 🧹",
    ],
    noTexts: [
      "Refuse duty",
      "I like the mess",
      "I cleaned last time",
    ],
    step2Titles: [
      "Agreement Officially Sealed!",
      "Household Harmony Restored!",
      "Contract Signed in Blood (and soap)!",
    ],
    step2Subtitles: [
      "A clean home is a happy home. Now let's assign the duties.",
      "Your signature is legally binding. Now choose your chore.",
      "No dodging allowed. Cleaning starts promptly.",
    ],
    step2Buttons: [
      "Assign Assignments 🧼",
      "Pick Your Chore 🧹",
      "View Cleaning List ✨",
    ],
    step3Titles: [
      "When should the chores get done?",
      "Select the cleaning window:",
      "Procrastination window selection:",
    ],
    step3Subtitles: [
      "Procrastination window selection:",
      "When will the scrubbing commence?",
      "Set your cleanup deadline:",
    ],
    step3Options: [
      { id: "chore-tonight", title: "Tonight Before Bed", description: "Wake up to sparkling clean counters", emoji: "🛏️" },
      { id: "chore-sat-morning", title: "Saturday Morning", description: "Blasting music while scrubbing", emoji: "🎵" },
      { id: "chore-now", title: "Right Now (Speed Run)", description: "Knock it out in 15 minutes", emoji: "⏱️" },
    ],
    step4Titles: [
      "Select your chore assignment:",
      "What is your contribution to the household?",
      "Choose your designated task:",
    ],
    step4Subtitles: [
      "Choose your contribution to the household:",
      "Pick your assigned chore:",
      "All other options are strictly off limits:",
    ],
    step4Target: {
      id: "chore-dishes-trash",
      title: "Dishes & Take Out the Trash",
      description: "The ultimate heroic household sacrifice",
      emoji: "🫧",
    },
    step4Rejections: [
      { id: "chore-couch", title: "Quality Check the Sofa", description: "Lying down to ensure cushions work", emoji: "🛋️" },
      { id: "chore-remote", title: "Remote Control Custodian", description: "Ensuring Netflix stays on", emoji: "📺" },
      { id: "chore-snack", title: "Official Snack Taster", description: "Testing chips for crispiness", emoji: "🍿" },
    ],
    rejectionPhrases: [
      "This chore has already been completed!",
      "Access denied: Requires Senior Cleaner clearance!",
      "Broken vacuum cleaner! Try another chore!",
      "Haha nope! Not your lucky day!",
    ],
    step5Titles: [
      "Household Duty Contract",
      "Certified Cleaning Mandate",
      "Official Roommate Accord",
    ],
    step5Subtitles: [
      "Binding under the unwritten laws of roommate and couple harmony.",
      "Violations result in kitchen confiscation and shame.",
      "Send to your roommate or partner as binding evidence.",
    ],
    badgeTexts: [
      "DUTY ASSIGNED",
      "OFFICIALLY SEALED",
      "BINDING ACCORD",
    ],
    confirmButtonTexts: [
      "Send Chore Agreement 📱",
      "Share with Roommate 🧹",
      "Seal Cleaning Pact 🤝",
    ],
  },

  "best-friend": {
    id: "best-friend",
    name: "Who is your Best Friend? 👯",
    emoji: "👯",
    tagline: "Force your bestie to admit you are their #1 favorite person!",
    defaultTheme: "electric-fun",
    defaultEvasion: "bamboozle",
    headlines: [
      "Who is your absolute #1 best friend?",
      "Official Best Friend Audit: Who is your soulmate?",
      "Who is the best friend you could ever ask for?",
    ],
    subtitles: [
      "Answer truthfully! There is only one legally acceptable answer. 😉",
      "Your friend ranking algorithm has been loaded.",
      "Friendship loyalty test in progress...",
    ],
    yesTexts: [
      "You, obviously! 💖",
      "100% Besties Forever! 👯",
      "You're my #1 soulmate! 🌟",
    ],
    noTexts: [
      "Someone else",
      "We're just acquaintances",
      "I have no friends",
    ],
    step2Titles: [
      "I KNEW IT! We're inseparable!",
      "Friendship Level: 10,000 / 10!",
      "Official Bestie Status Confirmed!",
    ],
    step2Subtitles: [
      "Our bestie bond has been stamped and locked in the archives.",
      "Anyone else trying to be your best friend has been disqualified.",
      "Now let's plan our next legendary hangout.",
    ],
    step2Buttons: [
      "Plan Our Bestie Hangout ✨",
      "Claim Friendship Perk 🎁",
      "Lock in Hangout Time 🚀",
    ],
    step3Titles: [
      "When are we hanging out next?",
      "Bestie calendar coordination:",
      "When is our next adventure?",
    ],
    step3Subtitles: [
      "Select our official reunion time slot:",
      "Quality bestie time cannot be delayed:",
      "Choose your availability:",
    ],
    step3Options: [
      { id: "hang-this-weekend", title: "This Weekend", description: "All day adventures and treats", emoji: "🎉" },
      { id: "hang-tonight", title: "Tonight", description: "Spilling tea over takeout", emoji: "🧋" },
      { id: "hang-spontaneous", title: "Spontaneous Road Trip", description: "Pack bags and drive away", emoji: "🚗" },
    ],
    step4Titles: [
      "What is our bestie hangout activity?",
      "Select tonight's adventure:",
      "How are we celebrating our friendship?",
    ],
    step4Subtitles: [
      "Choose our activity (choose wisely!):",
      "Pick from the approved bestie menu:",
      "Only top tier activities allowed:",
    ],
    step4Target: {
      id: "act-boba-shopping",
      title: "Boba Drinks, Shopping & Spilling Secrets",
      description: "Unlimited laughs, sweet treats and gossip",
      emoji: "🧋",
    },
    step4Rejections: [
      { id: "act-ignore", title: "Sit in Silence on Phones", description: "Staring at screens without talking", emoji: "📱" },
      { id: "act-study", title: "Study Calculus Together", description: "Solving differential equations", emoji: "📐" },
      { id: "act-dmv", title: "Wait in Line at the DMV", description: "Waiting for number B-489 to be called", emoji: "🏛️" },
    ],
    rejectionPhrases: [
      "Boring! Besties deserve better! 🙅‍♀️",
      "Access Denied: Not fun enough! 🚨",
      "Friendship protocol rejected this lame option!",
      "Nice try! Pick the fun activity!",
    ],
    step5Titles: [
      "Official Best Friends Certificate",
      "Certified Soulmate Declaration",
      "Binding Friendship Contract",
    ],
    step5Subtitles: [
      "Permanently verified under the international laws of friendship.",
      "Non-transferable and legally binding until the end of time.",
      "Send to your bestie as certified proof of your mutual bond.",
    ],
    badgeTexts: [
      "BESTIES FOR LIFE",
      "OFFICIALLY RATIFIED",
      "SOULMATE CERTIFIED",
    ],
    confirmButtonTexts: [
      "Send to My Bestie 💖",
      "Share via Instagram / WhatsApp 💬",
      "Save Friendship Pass 🏆",
    ],
  },
};

/**
 * Intelligent topic analyzer and suggestion generator
 * Matches keywords or creates contextual smart suggestions from any user topic
 */
export function getSmartSuggestionsForTopic(topic: string): ArchetypeTopic {
  const query = topic.toLowerCase().trim();

  // Keyword check
  if (query.includes("parent") || query.includes("mom") || query.includes("dad") || query.includes("mother") || query.includes("father") || query.includes("family")) {
    return ARCHETYPES["favourite-parent"];
  }
  if (query.includes("date") || query.includes("valentine") || query.includes("crush") || query.includes("love") || query.includes("marry") || query.includes("prom") || query.includes("girlfriend") || query.includes("boyfriend")) {
    return ARCHETYPES["romantic-date"];
  }
  if (query.includes("work") || query.includes("colleague") || query.includes("boss") || query.includes("mvp") || query.includes("employee") || query.includes("office") || query.includes("coworker") || query.includes("team")) {
    return ARCHETYPES["office-mvp"];
  }
  if (query.includes("eat") || query.includes("dinner") || query.includes("food") || query.includes("lunch") || query.includes("restaurant") || query.includes("hungry") || query.includes("pizza") || query.includes("sushi")) {
    return ARCHETYPES["dinner-decider"];
  }
  if (query.includes("chore") || query.includes("clean") || query.includes("dish") || query.includes("trash") || query.includes("roommate") || query.includes("house") || query.includes("laundry")) {
    return ARCHETYPES["chore-delegator"];
  }
  if (query.includes("friend") || query.includes("bestie") || query.includes("bff") || query.includes("pal") || query.includes("buddy")) {
    return ARCHETYPES["best-friend"];
  }

  // Generative fallback for completely custom topic
  const cleanTitle = topic.trim() || "My Custom Choice";
  return {
    id: `custom-${Date.now()}`,
    name: cleanTitle,
    emoji: "🎯",
    tagline: `Custom forced-choice funnel for: ${cleanTitle}`,
    defaultTheme: "electric-fun",
    defaultEvasion: "teleport",
    headlines: [
      cleanTitle.endsWith("?") ? cleanTitle : `${cleanTitle}?`,
      `Is "${cleanTitle}" your official final answer?`,
      `Official Poll: What is your verdict on ${cleanTitle}?`,
    ],
    subtitles: [
      "Think carefully... although you might not have much of a choice! 😉",
      "Answer truthfully. Rejection is mathematically prohibited.",
      "Submit your completely unbiased, irreversible decision below:",
    ],
    yesTexts: [
      "Yes, 100% agreed! ✨",
      "Obviously Yes! 🏆",
      "Yes, without hesitation! 🚀",
    ],
    noTexts: [
      "No thanks",
      "I disagree",
      "Refuse choice",
    ],
    step2Titles: [
      "Awesome! I knew you'd make the right choice!",
      "Official Agreement Sealed!",
      "Decision Ratified Successfully!",
    ],
    step2Subtitles: [
      "The vote has been recorded. Let's lock in the details!",
      "No backing out now. We are moving forward full steam.",
      "Your selection is permanently stored in the archive.",
    ],
    step2Buttons: [
      "Proceed to Schedule 📅",
      "Lock in the Details ✨",
      "Continue to Next Step 🚀",
    ],
    step3Titles: [
      "When is this taking place?",
      "Select your preferred schedule:",
      "Timing is everything:",
    ],
    step3Subtitles: [
      "Choose the optimal time window:",
      "Pick when this goes into effect:",
      "Select your availability:",
    ],
    step3Options: [
      { id: "opt-1", title: "This Weekend", description: "Prime time relaxation", emoji: "✨" },
      { id: "opt-2", title: "Right Now / ASAP", description: "Why wait any longer?", emoji: "⚡" },
      { id: "opt-3", title: "Tomorrow Evening", description: "After everything is wrapped up", emoji: "🌙" },
    ],
    step4Titles: [
      "What is the final decision / reward?",
      "Cast your vote for the final outcome:",
      "Select the winning option:",
    ],
    step4Subtitles: [
      "Pick the only approved outcome (all others will be rejected):",
      "Choose wisely! Only one option is truly valid:",
      "Your final selection:",
    ],
    step4Target: {
      id: "opt-target-winner",
      title: "The Ultimate Dream Choice",
      description: "The best possible outcome that everyone agrees on",
      emoji: "🌟",
    },
    step4Rejections: [
      { id: "opt-rej-1", title: "Do Absolutely Nothing", description: "Sitting in silence with zero progress", emoji: "🫥" },
      { id: "opt-rej-2", title: "The Worst Possible Alternative", description: "Nobody actually wants this option", emoji: "❌" },
      { id: "opt-rej-3", title: "Postpone Indefinitely", description: "Kick the can down the road forever", emoji: "⏳" },
    ],
    rejectionPhrases: [
      "Nice try! That option is strictly prohibited! ❌",
      "Error: System detected a poor life choice!",
      "Denied by executive decision! 😂",
      "404: Valid reason for this choice not found!",
    ],
    step5Titles: [
      `Official "${cleanTitle}" Certificate`,
      "Certified Binding Agreement",
      "Official Ratified Verdict",
    ],
    step5Subtitles: [
      "Verified and sealed under the sovereign rules of YesPlan Studio.",
      "Legally non-negotiable and permanently logged.",
      "Send to the recipient as official confirmation.",
    ],
    badgeTexts: [
      "OFFICIALLY RATIFIED",
      "100% BINDING",
      "CERTIFIED VERDICT",
    ],
    confirmButtonTexts: [
      "Share Official Proof 📲",
      "Send via WhatsApp / iMessage 💬",
      "Copy Confirmation 🏆",
    ],
  };
}

/**
 * Builds a ready-to-run AppConfig from topic and archetype
 */
export function buildConfigFromArchetype(
  archetype: ArchetypeTopic,
  selectedTheme?: ThemeId,
  customTitle?: string
): AppConfig {
  const theme = selectedTheme || archetype.defaultTheme;
  const title = customTitle || archetype.name;

  return {
    id: `custom-${Date.now()}`,
    title,
    theme,
    step1: {
      title: archetype.headlines[0] || "What is your choice?",
      subtitle: archetype.subtitles[0] || "Think carefully... 😉",
      emoji: archetype.emoji,
      yesText: archetype.yesTexts[0] || "Yes, absolutely! 💖",
      noText: archetype.noTexts[0] || "No thanks",
      evasionBehavior: archetype.defaultEvasion,
      sensitivity: 50,
      yesGrowthFactor: true,
    },
    step2: {
      title: archetype.step2Titles[0] || "I knew you'd say yes!",
      subtitle: archetype.step2Subtitles[0] || "Refusal was never an option anyway.",
      emoji: "🎉",
      buttonText: archetype.step2Buttons[0] || "Proceed to Next Step ✨",
    },
    step3: {
      title: archetype.step3Titles[0] || "When is this happening?",
      subtitle: archetype.step3Subtitles[0] || "Select the best time slot:",
      options: [...archetype.step3Options],
    },
    step4: {
      title: archetype.step4Titles[0] || "What is your selection?",
      subtitle: archetype.step4Subtitles[0] || "Choose your preference:",
      mode: "rigged",
      targetId: archetype.step4Target.id,
      rejectionPhrases: [...archetype.rejectionPhrases],
      options: [archetype.step4Target, ...archetype.step4Rejections],
    },
    step5: {
      title: archetype.step5Titles[0] || "Official Agreement Certificate",
      subtitle: archetype.step5Subtitles[0] || "Certified and ratified.",
      badgeText: archetype.badgeTexts[0] || "CONFIRMED & SEALED",
      confirmButtonText: archetype.confirmButtonTexts[0] || "Send Confirmation",
    },
  };
}
