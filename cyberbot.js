/* =============================================
   CYBERBOT AI - Advanced Chatbot for Cyber Security Dept
   ============================================= */

(function() {
  'use strict';

  /* ---- Knowledge Base ---- */
  const KB = {
    greet: [
      "Hello! I'm <strong>CyberBot</strong> — your AI assistant for the Cyber Security Department. How can I assist you today? 🔐",
      "Welcome! I'm CyberBot, trained on all things cybersecurity. Ask me anything about our department, courses, or digital safety! 🛡️"
    ],
    courses: `Our department offers:<br>
    <strong>• B.Sc Cyber Security</strong> (3 years)<br>
    <strong>• M.Sc Cyber Security</strong> (2 years)<br>
    <strong>• Diploma in Ethical Hacking</strong> (1 year)<br>
    We cover: Network Security, Ethical Hacking, Digital Forensics, Cloud Security, AI-based Threat Detection and more.`,
    faculty: `We have <strong>4 expert faculty members</strong> with specializations in:<br>
    • Network Security & Cryptography<br>
    • Penetration Testing & Forensics<br>
    • Cloud & IoT Security<br>
    • AI-driven Cyber Defense<br><br>
    Visit our <a href="faculty.html" style="color:#00e5ff;">Faculty page</a> for full profiles.`,
    admission: `Admissions for 2026-27 are open! 🎓<br><br>
    <strong>Eligibility:</strong><br>
    • B.Sc: 10+2 with 55%+ (any stream)<br>
    • M.Sc: B.Sc/BCA/B.Tech with 60%+<br><br>
    Contact us at <a href="mailto:cybersecurity@college.edu" style="color:#00e5ff;">cybersecurity@college.edu</a> or WhatsApp us directly!`,
    placement: `Our department boasts <strong>100% placement support</strong>! 💼<br><br>
    Top recruiters include IT firms, cybersecurity companies, government agencies & banks.<br>
    We provide: mock interviews, aptitude training, certification guidance (CEH, CISSP, CompTIA Security+).`,
    labs: `We have <strong>3 state-of-the-art security labs</strong>:<br>
    <br>🔬 <strong>Penetration Testing Lab</strong> – Kali Linux, Metasploit, Burp Suite<br>
    🔬 <strong>Digital Forensics Lab</strong> – Autopsy, FTK, Wireshark<br>
    🔬 <strong>Network Security Lab</strong> – Firewalls, IDS/IPS, SIEM tools`,
    contact: `You can reach us via:<br><br>
    📧 <strong>Email:</strong> cybersecurity@college.edu<br>
    📞 <strong>Phone:</strong> +91 8667316956<br>
    💬 <strong>WhatsApp:</strong> <a href="https://wa.me/918667316956" style="color:#25D366;" target="_blank">Click to chat</a><br>
    📍 <strong>Location:</strong> Chennai, Tamil Nadu — 600001<br><br>
    Or use our <a href="contact.html" style="color:#00e5ff;">contact form</a>!`,
    tips: [
      "💡 <strong>Tip:</strong> Always use a password manager! Never reuse passwords across sites.",
      "💡 <strong>Tip:</strong> Enable 2FA (Two-Factor Authentication) on all your accounts for extra security.",
      "💡 <strong>Tip:</strong> Keep your software updated — most breaches exploit known, unpatched vulnerabilities.",
      "💡 <strong>Tip:</strong> Use a VPN on public Wi-Fi to encrypt your traffic and protect your data.",
      "💡 <strong>Tip:</strong> Think before you click! Phishing is still the #1 attack vector worldwide."
    ],
    default: [
      "I'm not sure about that specific query. Could you rephrase? You can ask me about <strong>courses, faculty, admissions, labs, placements</strong> or <strong>cyber tips</strong>!",
      "Hmm, that's outside my knowledge base. Try asking about <strong>admissions, courses, or contact info</strong>. Or click a quick option below!",
    ]
  };

  /* Quick action responses */
  const quickMap = {
    '🎓 Courses': 'courses',
    '👨‍🏫 Faculty': 'faculty',
    '🚪 Admissions': 'admission',
    '💼 Placements': 'placement',
    '🔬 Labs': 'labs',
    '📞 Contact': 'contact',
    '💡 Cyber Tip': 'tip',
  };

  function getResponse(input) {
    const q = input.toLowerCase();
    if (/hi|hello|hey|greet|good/i.test(q)) return rand(KB.greet);
    if (/course|program|degree|study|curriculum|bsc|msc|diploma/i.test(q)) return KB.courses;
    if (/faculty|professor|teacher|staff|hod|department head/i.test(q)) return KB.faculty;
    if (/admission|apply|join|eligibility|fee|intake|enrol/i.test(q)) return KB.admission;
    if (/placement|job|hire|recruit|career|company|salary/i.test(q)) return KB.placement;
    if (/lab|equipment|tool|kali|metasploit|wireshark|forensic/i.test(q)) return KB.labs;
    if (/contact|email|phone|address|location|reach|whatsapp/i.test(q)) return KB.contact;
    if (/tip|advice|protect|safe|security tip|password|2fa|vpn|phish/i.test(q)) return rand(KB.tips);
    return rand(KB.default);
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ---- Build UI ---- */
  function buildBot() {
    // FAB
    const fab = document.createElement('div');
    fab.className = 'cyberbot-fab';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', 'Open CyberBot');
    fab.innerHTML = `
  <img src="images22/logo.png" alt="CyberBot" class="cyberbot-logo">
  <span class="cyberbot-label">CyberBot AI</span>`;

    // Panel
    const panel = document.createElement('div');
    panel.className = 'cyberbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'CyberBot Chat');
    panel.innerHTML = `
      <div class="cyberbot-header">
       <div class="bot-avatar">
  <img src="images22/logo.png" alt="CyberBot">
</div>
        <div class="bot-info">
          <div class="bot-name">CyberBot AI</div>
          <div class="bot-status">Online — Ready to assist</div>
        </div>
        <button class="bot-close" aria-label="Close CyberBot">✕</button>
      </div>
      <div class="cyberbot-messages" id="botMessages"></div>
      <div class="cyberbot-input-area">
        <input class="cyberbot-input" id="botInput" placeholder="Ask about courses, admissions..." maxlength="200" />
        <button class="cyberbot-send" id="botSend" aria-label="Send">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>`;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    const msgs = panel.querySelector('#botMessages');
    const input = panel.querySelector('#botInput');
    const sendBtn = panel.querySelector('#botSend');
    const closeBtn = panel.querySelector('.bot-close');

    // Initial bot message with quick buttons
    setTimeout(() => {
      addBotMsg(rand(KB.greet));
      addQuickBtns();
    }, 500);

    function addBotMsg(html) {
      const d = document.createElement('div');
      d.className = 'bot-msg';
      d.innerHTML = html;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addUserMsg(text) {
      const d = document.createElement('div');
      d.className = 'user-msg';
      d.textContent = text;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addTyping() {
      const d = document.createElement('div');
      d.className = 'bot-typing show';
      d.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function addQuickBtns() {
      const wrap = document.createElement('div');
      wrap.className = 'quick-btns';
      Object.keys(quickMap).forEach(label => {
        const b = document.createElement('button');
        b.className = 'quick-btn';
        b.textContent = label;
        b.addEventListener('click', () => {
          handleSend(label);
        });
        wrap.appendChild(b);
      });
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function handleSend(text) {
      const q = text.trim();
      if (!q) return;
      addUserMsg(q);
      input.value = '';

      // Show typing indicator
      const typing = addTyping();
      const key = quickMap[q];
      let answer;
      if (key === 'tip') {
        answer = rand(KB.tips);
      } else if (key) {
        answer = KB[key];
      } else {
        answer = getResponse(q);
      }

      setTimeout(() => {
        typing.remove();
        addBotMsg(answer);
        if (msgs.querySelectorAll('.quick-btns').length === 0) addQuickBtns();
      }, 900 + Math.random() * 600);
    }

    sendBtn.addEventListener('click', () => handleSend(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(input.value); });

    // Toggle panel
    fab.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      fab.setAttribute('aria-expanded', isOpen);
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      fab.setAttribute('aria-expanded', 'false');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBot);
  } else {
    buildBot();
  }
})();