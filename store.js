// ============================================================================
//  store.js — data layer
//
//  A tiny abstraction over the realtime backend so index.html / present.html
//  don't care whether we're talking to Firebase or a local fallback.
//
//  If config.js contains a real Firebase config → Firebase Realtime Database.
//  Otherwise → LocalStore (localStorage + BroadcastChannel), which syncs only
//  within a single browser. Good for previewing; NOT for a live audience.
//
//  Data shape (per session):
//    sessions/{sessionId}/
//      meta/            { stage: "lobby" | "question", currentQuestion: <int> }
//      participants/{id}/
//        name, creature, avatar (base64 data URL), joinedAt,
//        answers/ { <qIndex>: "text", ... }
// ============================================================================

(function () {
  const cfg = window.CONFIG || {};
  const sid = cfg.sessionId || "default";

  function looksConfigured(fb) {
    return fb && fb.apiKey && !String(fb.apiKey).startsWith("PASTE_") &&
           fb.databaseURL && !String(fb.databaseURL).includes("PASTE_");
  }

  // -------------------------------------------------------------------------
  //  Firebase implementation
  // -------------------------------------------------------------------------
  function FirebaseStore() {
    firebase.initializeApp(cfg.firebase);
    const db = firebase.database();
    const root = db.ref("sessions/" + sid);

    return {
      mode: "firebase",

      onMeta(cb) {
        root.child("meta").on("value", (s) => cb(s.val() || null));
      },
      setMeta(obj) {
        return root.child("meta").update(obj);
      },

      onParticipants(cb) {
        root.child("participants").on("value", (s) => cb(s.val() || {}));
      },
      addParticipant(data) {
        const ref = root.child("participants").push();
        return ref.set(data).then(() => ref.key);
      },
      updateParticipant(id, data) {
        return root.child("participants/" + id).update(data);
      },
      setAnswer(id, qIndex, text) {
        return root.child("participants/" + id + "/answers/" + qIndex).set(text);
      },
      removeParticipant(id) {
        return root.child("participants/" + id).remove();
      },

      reset() {
        return root.remove();
      },
    };
  }

  // -------------------------------------------------------------------------
  //  Local fallback (single browser only)
  // -------------------------------------------------------------------------
  function LocalStore() {
    const KEY = "therigatha:" + sid;
    const chan =
      "BroadcastChannel" in window ? new BroadcastChannel(KEY) : null;
    const metaCbs = [];
    const partCbs = [];

    function read() {
      try {
        return JSON.parse(localStorage.getItem(KEY)) || {};
      } catch (e) {
        return {};
      }
    }
    function write(state) {
      localStorage.setItem(KEY, JSON.stringify(state));
      if (chan) chan.postMessage("changed");
      fire();
    }
    function fire() {
      const s = read();
      metaCbs.forEach((cb) => cb(s.meta || null));
      partCbs.forEach((cb) => cb(s.participants || {}));
    }
    if (chan) chan.onmessage = fire;
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) fire();
    });

    function uid() {
      return "p" + Math.abs(hash(String(performance.now()) + navigator.userAgent + partCbs.length + JSON.stringify(read()))).toString(36);
    }
    function hash(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
      }
      return h;
    }

    return {
      mode: "local",

      onMeta(cb) {
        metaCbs.push(cb);
        cb(read().meta || null);
      },
      setMeta(obj) {
        const s = read();
        s.meta = Object.assign({}, s.meta, obj);
        write(s);
        return Promise.resolve();
      },

      onParticipants(cb) {
        partCbs.push(cb);
        cb(read().participants || {});
      },
      addParticipant(data) {
        const s = read();
        s.participants = s.participants || {};
        const id = uid();
        s.participants[id] = data;
        write(s);
        return Promise.resolve(id);
      },
      updateParticipant(id, data) {
        const s = read();
        if (s.participants && s.participants[id]) {
          Object.assign(s.participants[id], data);
          write(s);
        }
        return Promise.resolve();
      },
      setAnswer(id, qIndex, text) {
        const s = read();
        if (s.participants && s.participants[id]) {
          s.participants[id].answers = s.participants[id].answers || {};
          s.participants[id].answers[qIndex] = text;
          write(s);
        }
        return Promise.resolve();
      },
      removeParticipant(id) {
        const s = read();
        if (s.participants) delete s.participants[id];
        write(s);
        return Promise.resolve();
      },

      reset() {
        localStorage.removeItem(KEY);
        if (chan) chan.postMessage("changed");
        fire();
        return Promise.resolve();
      },
    };
  }

  // -------------------------------------------------------------------------
  const configured = looksConfigured(cfg.firebase);
  window.Store = configured ? FirebaseStore() : LocalStore();
  window.Store.configured = configured;
})();
