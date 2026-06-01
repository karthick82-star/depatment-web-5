/* =============================================
   CYBER EXTRAS - Matrix Rain, Threat Ticker, WhatsApp FAB
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

  /* ---- Matrix Rain on Hero Canvas ---- */
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/\\~`ΨΩΣΔΘΛΞΠΦΧΨΩαβγδεζηθ';
    const fontSize = 13;
    let cols, drops;

    function init() {
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    }
    init();
    window.addEventListener('resize', init);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00e5ff';
      ctx.font = fontSize + 'px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#00bcd4';
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }
    setInterval(draw, 55);
  }

  /* ---- WhatsApp FAB ---- */
  const waBtn = document.createElement('a');
  waBtn.className = 'whatsapp-fab';
  waBtn.href = 'https://wa.me/918667316956?text=Hello%2C%20I%27m%20interested%20in%20the%20Cyber%20Security%20Department.%20Please%20provide%20more%20information.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="whatsapp-label">Chat on WhatsApp</span>`;
  document.body.appendChild(waBtn);

  /* ---- Threat Intelligence Ticker (inject after navbar) ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar && !document.querySelector('.threat-ticker')) {
    const threats = [
      'Ransomware attacks up 42% in Q1 2026',
      'New zero-day in OpenSSL — patch immediately',
      'AI-powered phishing now mimics real contacts',
      'Supply chain attacks targeting npm packages',
      'CISA alerts on critical ICS vulnerabilities',
      'State-sponsored APT groups targeting higher education',
      'Deep-fake voice phishing (vishing) on the rise',
      'IoT botnets growing — secure your devices',
      'Data breaches cost avg ₹18 Cr per incident in India 2025',
      'Chrome extension malware steals banking credentials',
    ];
    const ticker = document.createElement('div');
    ticker.className = 'threat-ticker';
    const doubledThreats = [...threats, ...threats];
    ticker.innerHTML = `
      <div class="ticker-label">⚡ THREAT INTEL</div>
      <div style="overflow:hidden;flex:1;">
        <div class="ticker-track">
          ${doubledThreats.map(t => `<span class="ticker-item">${t}</span>`).join('')}
        </div>
      </div>`;
    navbar.insertAdjacentElement('afterend', ticker);
 
    
  }

});