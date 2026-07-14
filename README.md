# Therīgāthā · Past-Life Avatars

An interactive audience tool to run *alongside* a live presentation on the
**Therīgāthā** — the ancient poems of the first Buddhist nuns.

Inspired by **Isidāsī's** song, in which she recounts her past lives as a
monkey, a goat, an ox, and more, the audience is invited to **draw (or upload) the
creature they imagine they once were**. Each drawing appears as an avatar on a
shared **farm scene** projected on the main screen. As the presentation moves
along, the presenter reveals discussion questions, and each person's short
answers pop up as **speech bubbles above their own avatar**.

- 🎨 Audience **draws on their phone** or **uploads / photographs** a drawing
- 🐾 Avatars gather live on an **illustrated farm** on the big screen
- 💬 Answers to each question appear as **speech bubbles** from the right avatar
- 🎛️ The **presenter drives** the flow (Start → Question 1 → 2 → …)
- 📱 Audience joins by **scanning a QR code** shown on screen

---

## The two pages

| Page | Who opens it | What it does |
|------|-------------|--------------|
| **`index.html`** | The **audience** (their phones) | Draw/upload an avatar, enter name + creature, then answer each question. |
| **`present.html`** | The **presenter** (laptop → projector) | The farm big-screen. Shows the QR code, everyone's avatars, and the controls to advance questions. |

Both are plain static files — perfect for **GitHub Pages**.

---

## Setup (about 10 minutes)

### 1. Create a free Firebase project (for live sync across phones)

The audience's phones and the presenter screen need to talk to each other in
real time. Firebase Realtime Database does this for free, with no server to run.

1. Go to <https://console.firebase.google.com> and **Add project** (any name).
   You can skip Google Analytics. The free **Spark** plan is enough — no credit
   card needed.
2. In the left menu open **Build → Realtime Database → Create Database**.
   - Pick a location, then choose **Start in test mode** and enable.
   - *(Test mode allows open read/write, which is what we want for a short live
     event. See "Locking it down" below.)*
3. Click the **⚙️ gear → Project settings**. Scroll to **Your apps**, click the
   **`</>` (Web)** icon, register an app (any nickname, no hosting needed).
4. Firebase shows you a `firebaseConfig = { ... }` snippet. Copy those values.

### 2. Paste your config

Open **`config.js`** and replace the placeholder values in the `firebase: {…}`
block with the ones from step 4. Make sure `databaseURL` is filled in (it looks
like `https://your-project-default-rtdb.firebaseio.com`).

While the config still has the `PASTE_…` placeholders, the app runs in
**local-preview mode**: everything works, but only inside a single browser —
great for trying it out, not for a real audience.

### 3. Edit your questions (optional)

Also in `config.js`:
- `avatarPrompt` — the instruction shown while people draw.
- `questions` — the list the presenter walks through. Keep them short; answers
  show as small speech bubbles.
- `sessionId` — change it to start a new, empty farm (e.g. per event).
- `title` / `subtitle` — shown to the audience and on the big screen.

### 4. Publish on GitHub Pages

1. Push these files to your repo (root of the default branch is easiest).
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, Branch: your branch, folder **`/ (root)`**, Save.
4. After a minute your site is live at
   `https://<your-username>.github.io/<repo>/`.
   - Audience URL: `…/index.html`
   - Presenter URL: `…/present.html`

---

## Running it during your talk

1. Open **`present.html`** on the machine driving the projector and go
   fullscreen (F11 / green button). A **QR code** pops up automatically.
2. The audience scans it, lands on **`index.html`**, draws/uploads their
   creature, types their **name** + **creature**, and taps **Join the farm**.
   Watch them appear on your screen. 🌾
3. Tap the QR to dismiss it (or press **Q** to toggle). When ready, click
   **Start ›** (or press **→**) to reveal Question 1.
4. As people answer on their phones, **speech bubbles** appear above their
   avatars. Click **Next ›** for each following question. **‹ Prev** goes back.
5. **Reset** clears the farm for a fresh run.

**Presenter shortcuts:** `→` next · `←` previous · `Q` toggle QR · ⚙️ (bottom-right) hide/show the control dock.

---

## Notes & tips

- **~20 people** is well within the free tier. Avatars are shrunk to 320px and
  stored compressed, so the whole farm is only a few hundred KB.
- Participants' identity is remembered in their browser, so a refresh keeps
  their avatar and lets them keep answering.
- **Test first:** open `present.html` in one tab and `index.html` in another
  (even in local-preview mode) to rehearse the whole flow on one computer.
- The presenter screen also works great on a tablet if you're presenting from one.

### Locking it down (optional)

Test mode leaves the database open to anyone with the URL for 30 days, which is
fine for a one-off event. If you want tighter rules, in **Realtime Database →
Rules** you can scope access to just this app's data, for example:

```json
{
  "rules": {
    "sessions": {
      "$sid": { ".read": true, ".write": true }
    }
  }
}
```

After the event, you can delete the Realtime Database (or the whole project) to
remove all uploaded drawings.

---

*The Therīgāthā verses of Isidāsī describe a soul passing through many births —
monkey, goat, ox — as it works toward liberation. This little tool turns that
image into a shared, playful moment with your audience.*
