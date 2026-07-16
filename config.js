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
    apiKey: "AIzaSyA_0XmGEIa6f60HHDitNKdhXMQuGxsf4zM",
  authDomain: "therigatha-b6a11.firebaseapp.com",
  databaseURL: "https://therigatha-b6a11-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "therigatha-b6a11",
  storageBucket: "therigatha-b6a11.firebasestorage.app",
  messagingSenderId: "1086445354068",
  appId: "1:1086445354068:web:f38cbccd38d999650b41c1"
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
    "What do you think life was like for women over 2,000 years ago?",
    "Do you think the female sangha was genuinely progressive, or was it simply tolerated under strict conditions?",
    "What do you notice?",
    "In one word: what's the hardest thing you would have to give up to feel completely free?",
    "Is the sangha's 'sexual equality' a real break from patriarchy, or a different hierarchy replacing the old one?",
    "How far would someone have to go before you truly believed that they were more than just their appearance?",
  ],
};
