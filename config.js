// ============================================================================
//  Therīgāthā Past-Life Avatars — Configuration
// ============================================================================
//
//  1) FIREBASE  — paste your project config below (see README.md, ~5 min setup).
//     Until you do, the app runs in LOCAL PREVIEW mode: everything works, but
//     only within a single browser (great for testing, NOT for a live audience).
//
//  2) QUESTIONS — edit the discussion prompts your audience will answer.
//
// ----------------------------------------------------------------------------

window.CONFIG = {

  // ---- Firebase project config -------------------------------------------
  // Replace the placeholder values with the ones from your Firebase console.
  // Leave them as-is to run in local-preview mode.
  firebase: {
    apiKey:            "PASTE_API_KEY",
    authDomain:        "PASTE_PROJECT.firebaseapp.com",
    databaseURL:       "https://PASTE_PROJECT-default-rtdb.firebaseio.com",
    projectId:         "PASTE_PROJECT",
    storageBucket:     "PASTE_PROJECT.appspot.com",
    messagingSenderId: "PASTE_SENDER_ID",
    appId:             "PASTE_APP_ID",
  },

  // ---- Session --------------------------------------------------------------
  // All participants and the presenter must share the same session code.
  // Change it (e.g. per event) to start with a fresh, empty farm.
  sessionId: "therigatha-2026",

  // ---- Event title (shown to participants + on the presenter screen) --------
  title: "Therīgāthā · Past-Life Avatars",
  subtitle: "Inspired by Isidāsī’s song of many lives",

  // ---- The prompt shown while people are drawing their avatar ---------------
  avatarPrompt:
    "Draw the animal or creature you imagine you were in a past life.",

  // ---- Discussion questions (the presenter advances through these) ----------
  // Add, remove, or reword freely. Keep them short — answers appear as
  // speech bubbles above each avatar on the big screen.
  questions: [
    "Why did you choose this creature? What drew you to it?",
    "What is one quality of your creature that you also see in yourself?",
    "Isidāsī saw her lives as fruit of past actions. Do you feel shaped by your past? Say it in a few words.",
    "If you could speak to your past-life creature, what would you tell it?",
    "The Therīgāthā are women’s songs of finding freedom. What does freedom mean to you, in one line?",
  ],
};
