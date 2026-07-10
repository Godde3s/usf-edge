export const subscriptionHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__SUB_NAME__ — Usf-Edge</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg-dark:#0a0e1a;--bg-mid:#1a1a2e;
  --glass-bg:rgba(15,23,42,0.6);--glass-border:rgba(255,255,255,0.08);
  --cyan:#06b6d4;--cyan-dim:rgba(6,182,212,0.15);--cyan-glow:rgba(6,182,212,0.3);
  --purple:#8b5cf6;--purple-dim:rgba(139,92,246,0.15);
  --green:#22c55e;--yellow:#eab308;--red:#ef4444;
  --text:#e2e8f0;--text-dim:#94a3b8;--text-muted:#64748b;
  --radius:16px;--radius-sm:10px;--radius-xs:6px;
}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{
  font-family:'Inter',system-ui,-apple-system,sans-serif;
  background:linear-gradient(160deg,var(--bg-dark) 0%,var(--bg-mid) 50%,#0f172a 100%);
  color:var(--text);min-height:100vh;overflow-x:hidden;line-height:1.6;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
}

/* Animated Background Orbs */
.bg-orbs{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.35;animation:orbFloat 20s ease-in-out infinite}
.orb-1{width:500px;height:500px;background:radial-gradient(circle,rgba(6,182,212,.4),transparent 70%);top:-10%;left:-10%;animation-delay:0s}
.orb-2{width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,.3),transparent 70%);top:40%;right:-15%;animation-delay:-7s;animation-duration:25s}
.orb-3{width:400px;height:400px;background:radial-gradient(circle,rgba(6,182,212,.25),transparent 70%);bottom:-5%;left:30%;animation-delay:-14s;animation-duration:22s}
@keyframes orbFloat{
  0%,100%{transform:translate(0,0) scale(1)}
  25%{transform:translate(60px,-40px) scale(1.1)}
  50%{transform:translate(-30px,60px) scale(.95)}
  75%{transform:translate(40px,30px) scale(1.05)}
}
@media(prefers-reduced-motion:reduce){
  .orb{animation:none}
  .progress-ring-circle{transition:none!important}
}

/* Layout */
.container{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:24px 20px 40px}

/* Card */
.card{
  background:var(--glass-bg);border:1px solid var(--glass-border);
  border-radius:var(--radius);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  transition:border-color .3s,box-shadow .3s;
}
.card:hover{border-color:rgba(255,255,255,.12);box-shadow:0 8px 32px rgba(0,0,0,.3)}

/* Hero */
.hero{display:flex;align-items:center;gap:16px;padding:28px 32px;margin-bottom:24px;flex-wrap:wrap}
.logo{
  width:48px;height:48px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--cyan),var(--purple));
  font-weight:800;font-size:18px;color:#fff;letter-spacing:-.5px;
  box-shadow:0 4px 20px var(--cyan-glow);
}
.hero-info{flex:1;min-width:0}
.hero-info h1{font-size:clamp(1.25rem,3vw,1.5rem);font-weight:700;letter-spacing:-.3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hero-info h1 span{color:var(--text-dim);font-weight:400;font-size:.85em;margin-left:6px}
.badge{
  display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;
  font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.5px;
}
.badge-active{background:rgba(34,197,94,.12);color:var(--green);border:1px solid rgba(34,197,94,.25)}
.badge-expired{background:rgba(239,68,68,.12);color:var(--red);border:1px solid rgba(239,68,68,.25)}
.badge-limited{background:rgba(234,179,8,.12);color:var(--yellow);border:1px solid rgba(234,179,8,.25)}
.badge-disabled{background:rgba(100,116,139,.15);color:var(--text-muted);border:1px solid rgba(100,116,139,.25)}
.badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.badge-active .badge-dot{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

/* Stats Grid */
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:24px}
.stat-card{padding:28px 24px;text-align:center}
.stat-card .stat-label{font-size:.8rem;font-weight:500;color:var(--text-dim);text-transform:uppercase;letter-spacing:.8px;margin-bottom:20px}

/* Volume Ring */
.ring-wrap{position:relative;width:140px;height:140px;margin:0 auto 16px}
.ring-wrap svg{transform:rotate(-90deg);width:100%;height:100%}
.ring-bg{fill:none;stroke:rgba(255,255,255,.06);stroke-width:8}
.ring-fg{fill:none;stroke:url(#cyanGrad);stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)}
.ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ring-value{font-size:1.15rem;font-weight:700;letter-spacing:-.3px}
.ring-sub{font-size:.7rem;color:var(--text-muted);margin-top:2px}

/* Time Card */
.time-big{font-size:2.8rem;font-weight:800;letter-spacing:-1px;background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;margin-bottom:4px}
.time-sub{font-size:.75rem;color:var(--text-muted);margin-bottom:16px}
.time-bar-wrap{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;margin-bottom:10px}
.time-bar{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--cyan),var(--purple));transition:width 1.5s cubic-bezier(.4,0,.2,1)}
.time-expire{font-size:.75rem;color:var(--text-muted)}

/* Connections */
.conn-count{font-size:2.4rem;font-weight:800;letter-spacing:-.5px;line-height:1.1;margin-bottom:4px}
.conn-count span{font-size:1.4rem;font-weight:400;color:var(--text-muted)}
.conn-list{margin-top:16px;text-align:left;display:flex;flex-direction:column;gap:8px}
.conn-item{
  display:flex;align-items:center;gap:10px;padding:8px 12px;
  background:rgba(255,255,255,.03);border-radius:var(--radius-xs);border:1px solid rgba(255,255,255,.04);
  font-size:.75rem;color:var(--text-dim);
}
.conn-item svg{flex-shrink:0;color:var(--text-muted)}
.conn-ip{font-family:'SF Mono',Monaco,Consolas,monospace;font-weight:500;color:var(--text)}
.conn-time{margin-left:auto;white-space:nowrap;color:var(--text-muted)}
.conn-ua{display:block;font-size:.65rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}

/* Section Title */
.section-title{
  font-size:1.1rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:10px;
}
.section-title svg{color:var(--cyan)}

/* Sub Links */
.sub-section{padding:28px 24px;margin-bottom:24px}
.tab-bar{display:flex;gap:4px;margin-bottom:20px;background:rgba(255,255,255,.04);border-radius:var(--radius-sm);padding:4px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.tab-btn{
  flex:1;min-width:max-content;padding:8px 16px;border:none;background:transparent;
  color:var(--text-muted);font-family:inherit;font-size:.8rem;font-weight:500;
  border-radius:var(--radius-xs);cursor:pointer;transition:all .25s;white-space:nowrap;
}
.tab-btn:hover{color:var(--text-dim);background:rgba(255,255,255,.04)}
.tab-btn.active{background:var(--cyan-dim);color:var(--cyan);box-shadow:0 2px 8px rgba(6,182,212,.15)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.sub-url-wrap{display:flex;gap:8px;align-items:stretch}
.sub-url-input{
  flex:1;padding:12px 16px;background:rgba(255,255,255,.04);border:1px solid var(--glass-border);
  border-radius:var(--radius-xs);color:var(--text);font-family:'SF Mono',Monaco,Consolas,monospace;
  font-size:.78rem;resize:none;outline:none;min-height:44px;cursor:text;transition:border-color .2s;
  word-break:break-all;
}
.sub-url-input:focus{border-color:rgba(6,182,212,.4)}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:10px 18px;border:1px solid var(--glass-border);border-radius:var(--radius-xs);
  background:rgba(255,255,255,.04);color:var(--text-dim);font-family:inherit;
  font-size:.78rem;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;
}
.btn:hover{background:rgba(255,255,255,.08);color:var(--text);border-color:rgba(255,255,255,.15)}
.btn:active{transform:scale(.97)}
.btn-cyan{background:var(--cyan-dim);color:var(--cyan);border-color:rgba(6,182,212,.2)}
.btn-cyan:hover{background:rgba(6,182,212,.25);border-color:rgba(6,182,212,.35);color:var(--cyan)}
.btn svg{width:16px;height:16px}
.qr-wrap{margin-top:16px;display:none;justify-content:center;animation:fadeUp .3s ease}
.qr-wrap.visible{display:flex}
.qr-inner{
  background:#fff;padding:16px;border-radius:var(--radius-sm);
  box-shadow:0 4px 24px rgba(0,0,0,.4);
}
.qr-inner canvas,.qr-inner img{display:block;border-radius:4px}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Copy check animation */
.btn.copied{color:var(--green);border-color:rgba(34,197,94,.3);background:rgba(34,197,94,.1)}
.btn.copied .copy-icon{display:none}
.btn.copied .check-icon{display:block}
.check-icon{display:none}

/* How to Use */
.howto-section{padding:28px 24px;margin-bottom:24px}
.howto-toggle{
  width:100%;display:flex;align-items:center;justify-content:space-between;
  padding:0;border:none;background:none;color:var(--text);font-family:inherit;
  font-size:1.1rem;font-weight:700;cursor:pointer;
}
.howto-toggle svg{transition:transform .3s;color:var(--text-muted)}
.howto-toggle.open svg{transform:rotate(180deg)}
.howto-content{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1)}
.howto-content.open{max-height:2000px}
.howto-tabs{display:flex;gap:4px;margin:16px 0;background:rgba(255,255,255,.04);border-radius:var(--radius-sm);padding:4px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.howto-tab{flex:1;min-width:max-content;padding:8px 12px;border:none;background:transparent;color:var(--text-muted);font-family:inherit;font-size:.78rem;font-weight:500;border-radius:var(--radius-xs);cursor:pointer;transition:all .25s;white-space:nowrap;text-align:center}
.howto-tab:hover{color:var(--text-dim)}
.howto-tab.active{background:var(--purple-dim);color:var(--purple)}
.howto-panel{display:none;padding:20px 0 0}
.howto-panel.active{display:block}
.app-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:24px}
.app-card{padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:var(--radius-xs);transition:border-color .2s}
.app-card:hover{border-color:rgba(255,255,255,.1)}
.app-name{font-weight:600;font-size:.85rem;margin-bottom:4px;color:var(--text)}
.app-desc{font-size:.72rem;color:var(--text-muted);line-height:1.5}
.steps{counter-reset:step;display:flex;flex-direction:column;gap:12px}
.step{display:flex;align-items:flex-start;gap:14px;counter-increment:step}
.step::before{
  content:counter(step);flex-shrink:0;width:28px;height:28px;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--cyan-dim),var(--purple-dim));
  border:1px solid rgba(6,182,212,.2);border-radius:50%;
  font-size:.75rem;font-weight:700;color:var(--cyan);
}
.step-text{font-size:.82rem;color:var(--text-dim);padding-top:3px;line-height:1.5}
.step-text strong{color:var(--text);font-weight:600}

/* Footer */
.footer{text-align:center;padding:24px 20px;color:var(--text-muted);font-size:.75rem}
.footer-brand{font-weight:600;background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.footer a{color:var(--text-dim);text-decoration:none;transition:color .2s}
.footer a:hover{color:var(--cyan)}

/* Responsive */
@media(max-width:640px){
  .container{padding:16px 14px 32px}
  .hero{padding:20px 18px;gap:12px}
  .stat-card{padding:22px 18px}
  .sub-section,.howto-section{padding:22px 18px}
  .sub-url-wrap{flex-direction:column}
  .btn-row{display:flex;gap:8px}
  .btn-row .btn{flex:1}
  .stats-grid{grid-template-columns:1fr}
  .app-grid{grid-template-columns:1fr}
  .ring-wrap{width:120px;height:120px}
  .time-big{font-size:2.2rem}
  .conn-count{font-size:2rem}
  .tab-bar,.howto-tabs{justify-content:flex-start}
}

/* Scrollbar */
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.2)}

/* Selection */
::selection{background:rgba(6,182,212,.3);color:#fff}

/* Toast notification */
.toast{
  position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);
  padding:10px 20px;background:rgba(15,23,42,.95);border:1px solid var(--glass-border);
  border-radius:var(--radius-sm);font-size:.8rem;color:var(--text);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  box-shadow:0 8px 32px rgba(0,0,0,.4);z-index:999;
  transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s;opacity:0;pointer-events:none;
}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
</style>
</head>
<body>

<!-- Background Orbs -->
<div class="bg-orbs" aria-hidden="true">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
</div>

<!-- SVG Defs for gradients -->
<svg width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
</svg>

<div class="container">

  <!-- Hero -->
  <div class="card hero">
    <div class="logo" aria-hidden="true">UE</div>
    <div class="hero-info">
      <h1>Welcome, __USERNAME__ <span>· __SUB_NAME__</span></h1>
    </div>
    <div id="statusBadge"></div>
  </div>

  <!-- Stats Grid -->
  <div class="stats-grid">

    <!-- Volume Usage Card -->
    <div class="card stat-card">
      <div class="stat-label">Volume Usage</div>
      <div class="ring-wrap">
        <svg viewBox="0 0 120 120">
          <circle class="ring-bg" cx="60" cy="60" r="50"/>
          <circle class="ring-fg" id="volumeRing" cx="60" cy="60" r="50"
            stroke-dasharray="314.16" stroke-dashoffset="314.16"/>
        </svg>
        <div class="ring-center">
          <div class="ring-value" id="volumeText">__VOLUME_USED__</div>
          <div class="ring-sub" id="volumeSub">of __VOLUME_LIMIT__</div>
        </div>
      </div>
    </div>

    <!-- Time Remaining Card -->
    <div class="card stat-card">
      <div class="stat-label">Time Remaining</div>
      <div class="time-big" id="timeBig">--</div>
      <div class="time-sub" id="timeSub"></div>
      <div class="time-bar-wrap"><div class="time-bar" id="timeBar" style="width:0%"></div></div>
      <div class="time-expire" id="timeExpire"></div>
    </div>

    <!-- Connections Card -->
    <div class="card stat-card">
      <div class="stat-label">Active Connections</div>
      <div class="conn-count" id="connCount">--</div>
      <div class="conn-list" id="connList"></div>
    </div>

  </div>

  <!-- Subscription Links -->
  <div class="card sub-section">
    <div class="section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      Subscription Links
    </div>

    <div class="tab-bar" role="tablist">
      <button class="tab-btn active" role="tab" data-tab="universal">Universal</button>
      <button class="tab-btn" role="tab" data-tab="clash">Clash</button>
      <button class="tab-btn" role="tab" data-tab="singbox">Sing-box</button>
      <button class="tab-btn" role="tab" data-tab="v2ray">V2Ray</button>
    </div>

    <div class="tab-panel active" id="panel-universal">
      <div class="sub-url-wrap">
        <textarea class="sub-url-input" readonly rows="2" id="url-universal">__SUB_LINK__</textarea>
        <div class="btn-row" style="display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-cyan" onclick="copyUrl('url-universal',this)" aria-label="Copy link">
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Copy
          </button>
          <button class="btn" onclick="toggleQr('url-universal','qr-universal',this)" aria-label="Show QR code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4" rx="0.5"/><line x1="22" y1="14" x2="22" y2="14.01"/><line x1="22" y1="18" x2="22" y2="22"/><line x1="18" y1="22" x2="22" y2="22"/><line x1="14" y1="22" x2="14" y2="22.01"/></svg>
            QR
          </button>
        </div>
      </div>
      <div class="qr-wrap" id="qr-universal"><div class="qr-inner" id="qr-canvas-universal"></div></div>
    </div>

    <div class="tab-panel" id="panel-clash">
      <div class="sub-url-wrap">
        <textarea class="sub-url-input" readonly rows="2" id="url-clash">__SUB_CLASH__</textarea>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-cyan" onclick="copyUrl('url-clash',this)">
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Copy
          </button>
          <button class="btn" onclick="toggleQr('url-clash','qr-clash',this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4" rx="0.5"/><line x1="22" y1="14" x2="22" y2="14.01"/><line x1="22" y1="18" x2="22" y2="22"/><line x1="18" y1="22" x2="22" y2="22"/><line x1="14" y1="22" x2="14" y2="22.01"/></svg>
            QR
          </button>
        </div>
      </div>
      <div class="qr-wrap" id="qr-clash"><div class="qr-inner" id="qr-canvas-clash"></div></div>
    </div>

    <div class="tab-panel" id="panel-singbox">
      <div class="sub-url-wrap">
        <textarea class="sub-url-input" readonly rows="2" id="url-singbox">__SUB_SINGBOX__</textarea>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-cyan" onclick="copyUrl('url-singbox',this)">
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Copy
          </button>
          <button class="btn" onclick="toggleQr('url-singbox','qr-singbox',this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4" rx="0.5"/><line x1="22" y1="14" x2="22" y2="14.01"/><line x1="22" y1="18" x2="22" y2="22"/><line x1="18" y1="22" x2="22" y2="22"/><line x1="14" y1="22" x2="14" y2="22.01"/></svg>
            QR
          </button>
        </div>
      </div>
      <div class="qr-wrap" id="qr-singbox"><div class="qr-inner" id="qr-canvas-singbox"></div></div>
    </div>

    <div class="tab-panel" id="panel-v2ray">
      <div class="sub-url-wrap">
        <textarea class="sub-url-input" readonly rows="2" id="url-v2ray">__SUB_V2RAY__</textarea>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-cyan" onclick="copyUrl('url-v2ray',this)">
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Copy
          </button>
          <button class="btn" onclick="toggleQr('url-v2ray','qr-v2ray',this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4" rx="0.5"/><line x1="22" y1="14" x2="22" y2="14.01"/><line x1="22" y1="18" x2="22" y2="22"/><line x1="18" y1="22" x2="22" y2="22"/><line x1="14" y1="22" x2="14" y2="22.01"/></svg>
            QR
          </button>
        </div>
      </div>
      <div class="qr-wrap" id="qr-v2ray"><div class="qr-inner" id="qr-canvas-v2ray"></div></div>
    </div>
  </div>

  <!-- How to Use -->
  <div class="card howto-section">
    <button class="howto-toggle" onclick="toggleHowto(this)" aria-expanded="false">
      <span style="display:flex;align-items:center;gap:10px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        How to Use
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="howto-content" id="howtoContent">
      <div class="howto-tabs" role="tablist">
        <button class="howto-tab active" role="tab" data-htab="windows">Windows</button>
        <button class="howto-tab" role="tab" data-htab="android">Android</button>
        <button class="howto-tab" role="tab" data-htab="ios">iOS</button>
        <button class="howto-tab" role="tab" data-htab="macos">macOS</button>
        <button class="howto-tab" role="tab" data-htab="linux">Linux</button>
      </div>

      <!-- Windows -->
      <div class="howto-panel active" id="htab-windows">
        <div class="app-grid">
          <div class="app-card"><div class="app-name">v2rayN</div><div class="app-desc">Popular Windows client with a clean GUI. Supports V2Ray, Trojan, and SS protocols.</div></div>
          <div class="app-card"><div class="app-name">Clash Verge Rev</div><div class="app-desc">Modern Clash GUI client based on Tauri. Fast, lightweight with rule management.</div></div>
          <div class="app-card"><div class="app-name">Nekoray</div><div class="app-desc">Versatile Qt-based client supporting Sing-box core with advanced routing features.</div></div>
        </div>
        <div class="steps">
          <div class="step"><div class="step-text"><strong>Download</strong> and install one of the recommended apps above.</div></div>
          <div class="step"><div class="step-text"><strong>Copy</strong> the subscription link from the "Subscription Links" section above.</div></div>
          <div class="step"><div class="step-text"><strong>Open</strong> the app, go to subscription settings, and <strong>paste</strong> the link to add your subscription.</div></div>
          <div class="step"><div class="step-text"><strong>Update</strong> the subscription, select a server node, and <strong>connect</strong>. You're all set!</div></div>
        </div>
      </div>

      <!-- Android -->
      <div class="howto-panel" id="htab-android">
        <div class="app-grid">
          <div class="app-card"><div class="app-name">v2rayNG</div><div class="app-desc">The most popular Android proxy client. Open source, lightweight, feature-rich.</div></div>
          <div class="app-card"><div class="app-name">Clash Meta for Android</div><div class="app-desc">Powerful Clash-based client with rule-based routing and a modern interface.</div></div>
          <div class="app-card"><div class="app-name">NekoBox</div><div class="app-desc">Sing-box based client with advanced features like tun mode and routing rules.</div></div>
        </div>
        <div class="steps">
          <div class="step"><div class="step-text"><strong>Download</strong> and install one of the recommended apps from a trusted source.</div></div>
          <div class="step"><div class="step-text"><strong>Copy</strong> the subscription link from the "Subscription Links" section above.</div></div>
          <div class="step"><div class="step-text"><strong>Open</strong> the app, tap the profile/subscriptions tab, and <strong>add</strong> a new subscription URL.</div></div>
          <div class="step"><div class="step-text"><strong>Update</strong> the subscription, select a node, and tap <strong>connect</strong> (start the VPN service).</div></div>
        </div>
      </div>

      <!-- iOS -->
      <div class="howto-panel" id="htab-ios">
        <div class="app-grid">
          <div class="app-card"><div class="app-name">Shadowrocket</div><div class="app-desc">Premium iOS proxy client. Fast, reliable, supports multiple protocols via App Store (region-dependent).</div></div>
          <div class="app-card"><div class="app-name">Stash</div><div class="app-desc">Advanced Clash-based client for iOS with rule management and script support.</div></div>
          <div class="app-card"><div class="app-name">V2Box</div><div class="app-desc">Free, open-source iOS client supporting V2Ray and Sing-box protocols.</div></div>
        </div>
        <div class="steps">
          <div class="step"><div class="step-text"><strong>Download</strong> and install one of the recommended apps from the App Store.</div></div>
          <div class="step"><div class="step-text"><strong>Copy</strong> the subscription link from the "Subscription Links" section above.</div></div>
          <div class="step"><div class="step-text"><strong>Open</strong> the app, go to the subscription/add server screen, and <strong>paste</strong> the link.</div></div>
          <div class="step"><div class="step-text"><strong>Fetch</strong> the subscription, pick a node, and <strong>connect</strong>. Allow the VPN configuration when prompted.</div></div>
        </div>
      </div>

      <!-- macOS -->
      <div class="howto-panel" id="htab-macos">
        <div class="app-grid">
          <div class="app-card"><div class="app-name">Clash Verge Rev</div><div class="app-desc">Cross-platform Clash GUI. Works beautifully on macOS with system proxy and tun mode.</div></div>
          <div class="app-card"><div class="app-name">V2rayU</div><div class="app-desc">Lightweight macOS client with menu bar integration. Easy to use with PAC mode.</div></div>
          <div class="app-card"><div class="app-name">Nekoray</div><div class="app-desc">Feature-rich Qt client supporting Sing-box core with advanced features on macOS.</div></div>
        </div>
        <div class="steps">
          <div class="step"><div class="step-text"><strong>Download</strong> and install one of the recommended apps above.</div></div>
          <div class="step"><div class="step-text"><strong>Copy</strong> the subscription link from the "Subscription Links" section above.</div></div>
          <div class="step"><div class="step-text"><strong>Open</strong> the app, navigate to subscription settings, and <strong>add</strong> the subscription URL.</div></div>
          <div class="step"><div class="step-text"><strong>Update</strong> the subscription, select a server, and <strong>connect</strong>. Grant system proxy permissions if asked.</div></div>
        </div>
      </div>

      <!-- Linux -->
      <div class="howto-panel" id="htab-linux">
        <div class="app-grid">
          <div class="app-card"><div class="app-name">Clash Verge Rev</div><div class="app-desc">Modern Tauri-based Clash client. Available as AppImage, deb, and RPM packages.</div></div>
          <div class="app-card"><div class="app-name">Nekoray</div><div class="app-desc">Qt-based client with Sing-box core support. Excellent for power users on Linux.</div></div>
          <div class="app-card"><div class="app-name">mihomo (Clash Meta)</div><div class="app-desc">Core-only option. Run from terminal and configure via YAML. Great for headless servers.</div></div>
        </div>
        <div class="steps">
          <div class="step"><div class="step-text"><strong>Download</strong> and install one of the recommended apps for your distro.</div></div>
          <div class="step"><div class="step-text"><strong>Copy</strong> the subscription link from the "Subscription Links" section above.</div></div>
          <div class="step"><div class="step-text"><strong>Open</strong> the app, go to subscription settings, and <strong>add</strong> the URL.</div></div>
          <div class="step"><div class="step-text"><strong>Update</strong> the subscription, select a node, and <strong>connect</strong>. Configure system proxy if needed.</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    Powered by <span class="footer-brand">Usf-Edge</span><br>
    <span style="margin-top:4px;display:inline-block">If you have issues, contact your administrator</span>
  </div>

</div>

<!-- Toast -->
<div class="toast" id="toast"></div>

<script>
(function(){
  // ── Placeholders (replaced at runtime) ──
  const STATUS = '__STATUS__';
  const VOLUME_USED = '__VOLUME_USED__';
  const VOLUME_LIMIT = '__VOLUME_LIMIT__';
  const VOLUME_PERCENT = parseFloat('__VOLUME_PERCENT__') || 0;
  const DAYS_REMAINING = parseInt('__DAYS_REMAINING__', 10);
  const EXPIRE_DATE = '__EXPIRE_DATE__';
  const ACTIVE_CONNS = parseInt('__ACTIVE_CONNS__', 10) || 0;
  const CONN_LIMIT = '__CONN_LIMIT__';
  const CONNECTIONS_JSON = '__CONNECTIONS_JSON__';

  // ── Status Badge ──
  const badgeEl = document.getElementById('statusBadge');
  const statusMap = {
    active:   { cls:'badge-active',   label:'Active' },
    expired:  { cls:'badge-expired',  label:'Expired' },
    limited:  { cls:'badge-limited',  label:'Limited' },
    disabled: { cls:'badge-disabled', label:'Disabled' },
  };
  const st = statusMap[STATUS] || statusMap.active;
  badgeEl.innerHTML = '<div class="badge '+st.cls+'"><span class="badge-dot"></span>'+st.label+'</div>';

  // ── Volume Ring ──
  const ring = document.getElementById('volumeRing');
  const circumference = 2 * Math.PI * 50; // r=50
  const isUnlimited = VOLUME_LIMIT === 'Unlimited';
  const pct = isUnlimited ? 0 : Math.min(VOLUME_PERCENT, 100);
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
  });
  // Update ring color based on usage
  if (pct > 90 && !isUnlimited) {
    ring.style.stroke = 'var(--red)';
  } else if (pct > 70 && !isUnlimited) {
    ring.style.stroke = 'var(--yellow)';
  }
  if (isUnlimited) {
    document.getElementById('volumeSub').innerHTML = '<span style="font-size:1.4rem">∞</span> Unlimited';
  }

  // ── Time Remaining ──
  const timeBig = document.getElementById('timeBig');
  const timeSub = document.getElementById('timeSub');
  const timeBar = document.getElementById('timeBar');
  const timeExpire = document.getElementById('timeExpire');

  if (DAYS_REMAINING === -1) {
    timeBig.textContent = 'Unlimited';
    timeSub.textContent = 'No expiry set';
    timeBar.style.width = '0%';
    timeExpire.textContent = '';
  } else if (DAYS_REMAINING <= 0) {
    timeBig.textContent = '0';
    timeSub.textContent = 'Days';
    timeBig.style.background = 'linear-gradient(135deg, var(--red), #f97316)';
    timeBig.style.webkitBackgroundClip = 'text';
    timeBig.style.webkitTextFillColor = 'transparent';
    timeBar.style.width = '100%';
    timeBar.style.background = 'var(--red)';
    timeExpire.textContent = 'Expired: ' + EXPIRE_DATE;
  } else {
    timeBig.textContent = DAYS_REMAINING;
    timeSub.textContent = DAYS_REMAINING === 1 ? 'Day' : 'Days';
    const barPct = Math.max(0, Math.min(100, (1 - DAYS_REMAINING / 30) * 100));
    setTimeout(() => { timeBar.style.width = barPct + '%'; }, 100);
    if (EXPIRE_DATE && EXPIRE_DATE !== 'Never') {
      timeExpire.textContent = 'Expires: ' + EXPIRE_DATE;
    } else {
      timeExpire.textContent = '';
    }
    if (DAYS_REMAINING <= 3) {
      timeBig.style.background = 'linear-gradient(135deg, var(--yellow), var(--red))';
      timeBig.style.webkitBackgroundClip = 'text';
      timeBig.style.webkitTextFillColor = 'transparent';
    }
  }

  // ── Connections ──
  const connCount = document.getElementById('connCount');
  const connList = document.getElementById('connList');
  const isConnUnlimited = CONN_LIMIT === 'Unlimited';

  if (isConnUnlimited) {
    connCount.innerHTML = ACTIVE_CONNS + ' <span>Active</span>';
  } else {
    connCount.innerHTML = ACTIVE_CONNS + ' <span>/ ' + CONN_LIMIT + '</span>';
  }

  // Parse connections JSON
  let conns = [];
  try { conns = JSON.parse(CONNECTIONS_JSON); } catch(e) {}
  if (conns.length === 0) {
    connList.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:.78rem;padding:12px 0">No active connections</div>';
  } else {
    const recent = conns.slice(-3).reverse();
    const deviceSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
    connList.innerHTML = recent.map(function(c) {
      const ua = (c.ua || 'Unknown').length > 40 ? (c.ua || 'Unknown').substring(0, 40) + '…' : (c.ua || 'Unknown');
      return '<div class="conn-item">' + deviceSvg +
        '<div style="min-width:0;flex:1"><span class="conn-ip">' + (c.ip || '?') + '</span>' +
        (ua !== 'Unknown' ? '<span class="conn-ua">' + escapeHtml(ua) + '</span>' : '') +
        '</div><span class="conn-time">' + (c.time || '') + '</span></div>';
    }).join('');
  }

  // ── Tab Switching (Subscription Links) ──
  document.querySelectorAll('.tab-btn[data-tab]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tab = this.dataset.tab;
      this.parentElement.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      var panel = document.getElementById('panel-' + tab);
      if (panel) panel.classList.add('active');
      // Hide all QRs when switching tabs
      document.querySelectorAll('.qr-wrap').forEach(function(q) { q.classList.remove('visible'); });
    });
  });

  // ── Tab Switching (How-to) ──
  document.querySelectorAll('.howto-tab[data-htab]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tab = this.dataset.htab;
      this.parentElement.querySelectorAll('.howto-tab').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.howto-panel').forEach(function(p) { p.classList.remove('active'); });
      var panel = document.getElementById('htab-' + tab);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Copy to Clipboard ──
  window.copyUrl = function(inputId, btnEl) {
    var input = document.getElementById(inputId);
    var text = input.value || input.textContent;
    navigator.clipboard.writeText(text).then(function() {
      btnEl.classList.add('copied');
      showToast('Copied to clipboard');
      setTimeout(function() { btnEl.classList.remove('copied'); }, 2000);
    }).catch(function() {
      // Fallback
      input.select && input.select();
      document.execCommand('copy');
      btnEl.classList.add('copied');
      showToast('Copied to clipboard');
      setTimeout(function() { btnEl.classList.remove('copied'); }, 2000);
    });
  };

  // ── QR Code Toggle ──
  window.toggleQr = function(inputId, wrapId, btnEl) {
    var wrap = document.getElementById(wrapId);
    var canvasEl = document.getElementById('qr-canvas-' + inputId.replace('url-', ''));
    var isVisible = wrap.classList.contains('visible');

    if (isVisible) {
      wrap.classList.remove('visible');
      return;
    }

    // Generate QR if not already done
    if (!canvasEl.hasChildNodes()) {
      var input = document.getElementById(inputId);
      var url = input.value || input.textContent;
      try {
        var qr = qrcode(0, 'M');
        qr.addData(url);
        qr.make();
        var size = 200;
        var moduleCount = qr.getModuleCount();
        var cellSize = size / moduleCount;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#0f172a';
        for (var r = 0; r < moduleCount; r++) {
          for (var c = 0; c < moduleCount; c++) {
            if (qr.isDark(r, c)) {
              ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
          }
        }
        canvasEl.appendChild(canvas);
      } catch(e) {
        canvasEl.innerHTML = '<p style="color:#666;font-size:12px;padding:20px">Could not generate QR code. URL may be too long.</p>';
      }
    }

    // Hide other QRs
    document.querySelectorAll('.qr-wrap').forEach(function(q) { q.classList.remove('visible'); });
    wrap.classList.add('visible');
  };

  // ── How-to Collapsible ──
  window.toggleHowto = function(btn) {
    var content = document.getElementById('howtoContent');
    var isOpen = content.classList.contains('open');
    if (isOpen) {
      content.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      content.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  // ── Toast ──
  var toastTimer;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2000);
  }

  // ── Escape HTML ──
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Animate counters on load ──
  function animateValue(el, end, suffix, duration) {
    var start = 0;
    var startTime = null;
    var isFloat = String(end).indexOf('.') !== -1;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      var current = eased * end;
      if (isFloat) {
        el.textContent = current.toFixed(1) + (suffix || '');
      } else {
        el.textContent = Math.floor(current) + (suffix || '');
      }
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Animate time remaining
  if (DAYS_REMAINING > 0) {
    animateValue(timeBig, DAYS_REMAINING, '', 1200);
  }

  // Animate connections
  if (!isConnUnlimited && ACTIVE_CONNS > 0) {
    var connNumEl = connCount;
    var origHtml = connCount.innerHTML;
    connCount.innerHTML = '<span id="connAnimTarget">0</span> <span>/ ' + CONN_LIMIT + '</span>';
    animateValue(document.getElementById('connAnimTarget'), ACTIVE_CONNS, '', 800);
  } else if (isConnUnlimited && ACTIVE_CONNS > 0) {
    connCount.innerHTML = '<span id="connAnimTarget">0</span> <span>Active</span>';
    animateValue(document.getElementById('connAnimTarget'), ACTIVE_CONNS, '', 800);
  }

})();
</script>
</body>
</html>`;
