export const adminHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Usf-Edge Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0e1a;--card:rgba(15,23,42,0.8);--card-solid:#0f172a;--accent:#06b6d4;--accent-dim:rgba(6,182,212,0.15);
  --success:#22c55e;--success-dim:rgba(34,197,94,0.15);--warning:#f59e0b;--warning-dim:rgba(245,158,11,0.15);
  --error:#ef4444;--error-dim:rgba(239,68,68,0.15);--text:#e2e8f0;--muted:#94a3b8;
  --border:rgba(148,163,184,0.12);--sidebar-w:240px;--radius:12px;--radius-sm:8px;
}
html{font-size:16px;scroll-behavior:smooth}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;line-height:1.6}
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(148,163,184,0.2);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(148,163,184,0.35)}
input,select,textarea,button{font-family:inherit;font-size:inherit}

/* ── Login ── */
#loginView{display:none;position:fixed;inset:0;z-index:9999;background:var(--bg);justify-content:center;align-items:center;flex-direction:column}
#loginView.active{display:flex}
.login-bg{position:absolute;inset:0;overflow:hidden}
.login-bg .orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.3;animation:orbFloat 12s ease-in-out infinite}
.login-bg .orb:nth-child(1){width:400px;height:400px;background:var(--accent);top:-100px;left:-100px}
.login-bg .orb:nth-child(2){width:350px;height:350px;background:#8b5cf6;bottom:-80px;right:-80px;animation-delay:-4s}
.login-bg .orb:nth-child(3){width:250px;height:250px;background:#ec4899;top:50%;left:60%;animation-delay:-8s}
@keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-40px) scale(1.05)}66%{transform:translate(-20px,30px) scale(.95)}}
.login-card{position:relative;z-index:1;width:100%;max-width:400px;padding:48px 40px;background:rgba(15,23,42,0.7);backdrop-filter:blur(40px);border-radius:20px;border:1px solid var(--border);box-shadow:0 25px 60px rgba(0,0,0,.5);animation:cardIn .6s cubic-bezier(.16,1,.3,1)}
@keyframes cardIn{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:none}}
.login-logo{display:flex;justify-content:center;margin-bottom:32px}
.login-logo .monogram{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--accent),#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#fff;letter-spacing:-1px;box-shadow:0 8px 32px rgba(6,182,212,.3)}
.login-card h1{text-align:center;font-size:22px;font-weight:600;margin-bottom:4px}
.login-card p.sub{text-align:center;color:var(--muted);font-size:14px;margin-bottom:28px}
.field-group{margin-bottom:20px;position:relative}
.field-group label{display:block;font-size:13px;font-weight:500;color:var(--muted);margin-bottom:6px}
.input-wrap{position:relative}
.input-wrap input{width:100%;padding:12px 16px;background:rgba(15,23,42,0.6);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:14px;transition:all .2s;outline:none}
.input-wrap input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-dim)}
.input-wrap .toggle-pw{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;display:flex}
.input-wrap .toggle-pw:hover{color:var(--text)}
.login-error{background:var(--error-dim);color:var(--error);padding:10px 14px;border-radius:var(--radius-sm);font-size:13px;margin-bottom:16px;display:none;align-items:center;gap:8px}
.login-error.show{display:flex}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;border:none;border-radius:var(--radius-sm);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;outline:none;text-decoration:none}
.btn-primary{background:var(--accent);color:#0a0e1a;font-weight:600}
.btn-primary:hover{background:#22d3ee;box-shadow:0 4px 20px rgba(6,182,212,.35);transform:translateY(-1px)}
.btn-primary:active{transform:translateY(0)}
.btn-primary:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
.btn-secondary{background:rgba(148,163,184,0.1);color:var(--text);border:1px solid var(--border)}
.btn-secondary:hover{background:rgba(148,163,184,0.18);border-color:rgba(148,163,184,0.25)}
.btn-danger{background:var(--error-dim);color:var(--error)}
.btn-danger:hover{background:rgba(239,68,68,0.25)}
.btn-sm{padding:7px 14px;font-size:13px;border-radius:6px}
.btn-full{width:100%}
.btn-icon{padding:8px;border-radius:8px;background:rgba(148,163,184,0.08);border:1px solid transparent;color:var(--muted);cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;justify-content:center}
.btn-icon:hover{background:rgba(148,163,184,0.16);color:var(--text);border-color:var(--border)}
.spinner{width:18px;height:18px;border:2px solid transparent;border-top-color:currentColor;border-radius:50%;animation:spin .6s linear infinite;display:none}
@keyframes spin{to{transform:rotate(360deg)}}
.loading .spinner{display:block}
.loading .btn-text{display:none}

/* ── App Layout ── */
#app{display:none;min-height:100vh}
#app.active{display:flex}
.sidebar{position:fixed;top:0;left:0;bottom:0;width:var(--sidebar-w);background:rgba(10,14,26,0.95);backdrop-filter:blur(20px);border-right:1px solid var(--border);display:flex;flex-direction:column;z-index:100;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.sidebar-header{padding:24px 20px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border)}
.sidebar-logo{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;letter-spacing:-1px;flex-shrink:0}
.sidebar-brand{font-size:17px;font-weight:600;letter-spacing:-.3px}
.sidebar-brand span{color:var(--muted);font-weight:400;font-size:12px;display:block;margin-top:1px}
.sidebar-nav{flex:1;padding:16px 12px;overflow-y:auto}
.nav-section{margin-bottom:24px}
.nav-section-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);padding:0 12px;margin-bottom:8px;opacity:.6}
.nav-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius-sm);color:var(--muted);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;text-decoration:none;margin-bottom:2px;position:relative}
.nav-item:hover{color:var(--text);background:rgba(148,163,184,0.06)}
.nav-item.active{color:var(--accent);background:var(--accent-dim)}
.nav-item.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
.nav-item svg{width:20px;height:20px;flex-shrink:0;opacity:.7}
.nav-item.active svg{opacity:1}
.sidebar-footer{padding:16px 12px;border-top:1px solid var(--border)}
.nav-item.logout{color:var(--error);opacity:.7}
.nav-item.logout:hover{opacity:1;background:var(--error-dim)}

.main{margin-left:var(--sidebar-w);flex:1;min-height:100vh;display:flex;flex-direction:column}
.topbar{position:sticky;top:0;z-index:50;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,14,26,0.8);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.topbar-left{display:flex;align-items:center;gap:16px}
.hamburger{display:none;background:none;border:none;color:var(--text);cursor:pointer;padding:8px;border-radius:8px;transition:background .2s}
.hamburger:hover{background:rgba(148,163,184,0.1)}
.hamburger svg{width:22px;height:22px}
.topbar h2{font-size:18px;font-weight:600}
.topbar-right{display:flex;align-items:center;gap:12px}
.content{flex:1;padding:28px 32px;animation:fadeUp .4s cubic-bezier(.16,1,.3,1)}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.view{display:none}
.view.active{display:block;animation:fadeUp .35s cubic-bezier(.16,1,.3,1)}

/* ── Overlay ── */
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90;backdrop-filter:blur(2px)}
.sidebar-overlay.active{display:block}

/* ── Stat Cards ── */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:28px}
.stat-card{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:var(--radius);padding:24px;position:relative;overflow:hidden;transition:all .3s}
.stat-card:hover{border-color:rgba(148,163,184,0.2);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.3)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px 2px 0 0}
.stat-card:nth-child(1)::before{background:linear-gradient(90deg,var(--accent),#8b5cf6)}
.stat-card:nth-child(2)::before{background:linear-gradient(90deg,var(--success),#22d3ee)}
.stat-card:nth-child(3)::before{background:linear-gradient(90deg,var(--warning),#f97316)}
.stat-card:nth-child(4)::before{background:linear-gradient(90deg,#8b5cf6,#ec4899)}
.stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.stat-card:nth-child(1) .stat-icon{background:var(--accent-dim);color:var(--accent)}
.stat-card:nth-child(2) .stat-icon{background:var(--success-dim);color:var(--success)}
.stat-card:nth-child(3) .stat-icon{background:var(--warning-dim);color:var(--warning)}
.stat-card:nth-child(4) .stat-icon{background:rgba(139,92,246,0.15);color:#8b5cf6}
.stat-icon svg{width:22px;height:22px}
.stat-value{font-size:28px;font-weight:700;letter-spacing:-.5px;margin-bottom:4px}
.stat-label{font-size:13px;color:var(--muted);font-weight:500}

/* ── Table ── */
.table-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap}
.search-box{position:relative;flex:1;max-width:360px}
.search-box input{width:100%;padding:10px 16px 10px 40px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:14px;transition:all .2s;outline:none}
.search-box input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-dim)}
.search-box svg{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--muted)}
.table-wrap{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.table-scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse;white-space:nowrap}
thead{background:rgba(15,23,42,0.5)}
th{padding:14px 18px;text-align:left;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);border-bottom:1px solid var(--border)}
td{padding:14px 18px;font-size:14px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
tbody tr{transition:background .15s}
tbody tr:hover{background:rgba(148,163,184,0.04)}
.uuid-cell{display:flex;align-items:center;gap:8px;font-family:'SF Mono',Consolas,'Courier New',monospace;font-size:13px;color:var(--muted)}
.uuid-cell .copy-btn{background:none;border:none;color:var(--muted);cursor:pointer;padding:3px;border-radius:4px;transition:all .15s;display:flex;flex-shrink:0}
.uuid-cell .copy-btn:hover{color:var(--accent);background:var(--accent-dim)}
.uuid-cell .copy-btn svg{width:14px;height:14px}
.badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500}
.badge-success{background:var(--success-dim);color:var(--success)}
.badge-warning{background:var(--warning-dim);color:var(--warning)}
.badge-error{background:var(--error-dim);color:var(--error)}
.badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.badge-success .badge-dot{animation:pulse-dot 2s infinite}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
.progress-mini{width:80px;height:4px;background:rgba(148,163,184,0.12);border-radius:4px;overflow:hidden;display:inline-block;vertical-align:middle;margin-left:8px}
.progress-mini .fill{height:100%;border-radius:4px;transition:width .3s}
.progress-mini .fill.green{background:var(--success)}
.progress-mini .fill.yellow{background:var(--warning)}
.progress-mini .fill.red{background:var(--error)}
.actions-cell{display:flex;gap:6px}
.pagination{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-top:1px solid var(--border);font-size:13px;color:var(--muted)}
.pagination-btns{display:flex;gap:4px}
.pagination-btns button{padding:6px 12px;border:1px solid var(--border);background:transparent;color:var(--muted);border-radius:6px;cursor:pointer;font-size:13px;transition:all .15s}
.pagination-btns button:hover:not(:disabled){background:rgba(148,163,184,0.1);color:var(--text)}
.pagination-btns button.active{background:var(--accent-dim);color:var(--accent);border-color:rgba(6,182,212,.3)}
.pagination-btns button:disabled{opacity:.3;cursor:not-allowed}

/* ── Toggle Switch ── */
.toggle{position:relative;width:40px;height:22px;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0;position:absolute}
.toggle .slider{position:absolute;inset:0;background:rgba(148,163,184,0.2);border-radius:22px;cursor:pointer;transition:all .25s}
.toggle .slider::before{content:'';position:absolute;width:16px;height:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:all .25s}
.toggle input:checked+.slider{background:var(--accent)}
.toggle input:checked+.slider::before{transform:translateX(18px)}

/* ── Modal ── */
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:200;justify-content:center;align-items:center;padding:20px}
.modal-overlay.active{display:flex}
.modal{background:var(--card-solid);border:1px solid var(--border);border-radius:16px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;animation:modalIn .3s cubic-bezier(.16,1,.3,1);box-shadow:0 25px 60px rgba(0,0,0,.5)}
@keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:none}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:24px 28px 0;margin-bottom:20px}
.modal-header h3{font-size:18px;font-weight:600}
.modal-close{background:none;border:none;color:var(--muted);cursor:pointer;padding:6px;border-radius:8px;transition:all .15s;display:flex}
.modal-close:hover{background:rgba(148,163,184,0.1);color:var(--text)}
.modal-close svg{width:20px;height:20px}
.modal-body{padding:0 28px 28px}
.form-row{margin-bottom:18px}
.form-row label{display:block;font-size:13px;font-weight:500;color:var(--muted);margin-bottom:6px}
.form-row input,.form-row select,.form-row textarea{width:100%;padding:10px 14px;background:rgba(15,23,42,0.6);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:14px;transition:all .2s;outline:none}
.form-row input:focus,.form-row select:focus,.form-row textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-dim)}
.form-row select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
.form-row select option{background:var(--card-solid);color:var(--text)}
.form-row textarea{resize:vertical;min-height:80px}
.form-row .hint{font-size:12px;color:var(--muted);margin-top:4px}
.form-row .input-suffix{position:relative}
.form-row .input-suffix input{padding-right:40px}
.form-row .input-suffix .suffix{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:13px;pointer-events:none}
.form-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:24px}
.strength-bar{display:flex;gap:4px;margin-top:8px}
.strength-bar .seg{flex:1;height:3px;border-radius:3px;background:rgba(148,163,184,0.15);transition:background .3s}
.strength-bar .seg.weak{background:var(--error)}
.strength-bar .seg.fair{background:var(--warning)}
.strength-bar .seg.strong{background:var(--success)}
.strength-text{font-size:12px;margin-top:4px;transition:color .3s}

/* ── Confirm Dialog ── */
.confirm-body{text-align:center;padding:12px 0 8px}
.confirm-body .confirm-icon{width:56px;height:56px;border-radius:50%;background:var(--error-dim);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--error)}
.confirm-body .confirm-icon svg{width:28px;height:28px}
.confirm-body p{color:var(--muted);font-size:14px;margin-top:6px}
.confirm-actions{display:flex;gap:12px;justify-content:center;margin-top:24px}

/* ── Toast ── */
.toast-container{position:fixed;bottom:24px;right:24px;z-index:999;display:flex;flex-direction:column-reverse;gap:8px}
.toast{display:flex;align-items:center;gap:12px;padding:14px 18px;background:var(--card-solid);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:0 8px 30px rgba(0,0,0,.4);min-width:300px;max-width:420px;animation:toastIn .35s cubic-bezier(.16,1,.3,1);font-size:14px}
.toast.removing{animation:toastOut .25s ease forwards}
@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes toastOut{to{opacity:0;transform:translateX(40px)}}
.toast-icon{width:20px;height:20px;flex-shrink:0}
.toast-success .toast-icon{color:var(--success)}
.toast-error .toast-icon{color:var(--error)}
.toast-warning .toast-icon{color:var(--warning)}
.toast-info .toast-icon{color:var(--accent)}

/* ── Settings ── */
.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:700px}
.settings-grid .full{grid-column:1/-1}

/* ── Empty State ── */
.empty-state{text-align:center;padding:60px 20px;color:var(--muted)}
.empty-state svg{width:64px;height:64px;margin-bottom:16px;opacity:.3}
.empty-state p{font-size:15px}

/* ── Responsive ── */
@media(max-width:1024px){
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .settings-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay.active{display:block}
  .hamburger{display:flex}
  .main{margin-left:0}
  .content{padding:20px 16px}
  .topbar{padding:14px 16px}
  .stats-grid{grid-template-columns:1fr 1fr;gap:12px}
  .stat-card{padding:18px}
  .stat-value{font-size:22px}
  .table-header{flex-direction:column;align-items:stretch}
  .search-box{max-width:none}
  .modal{margin:12px;max-height:calc(100vh - 24px)}
}
@media(max-width:480px){
  .stats-grid{grid-template-columns:1fr}
  .login-card{margin:16px;padding:32px 24px}
}
</style>
</head>
<body>

<!-- Login View -->
<div id="loginView" class="active">
  <div class="login-bg">
    <div class="orb"></div>
    <div class="orb"></div>
    <div class="orb"></div>
  </div>
  <div class="login-card">
    <div class="login-logo">
      <div class="monogram">UE</div>
    </div>
    <h1>Welcome Back</h1>
    <p class="sub">Sign in to Usf-Edge admin panel</p>
    <div id="loginError" class="login-error">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      <span id="loginErrorMsg">Invalid password</span>
    </div>
    <div class="field-group">
      <label>Password</label>
      <div class="input-wrap">
        <input type="password" id="loginPassword" placeholder="Enter admin password" autocomplete="current-password">
        <button type="button" class="toggle-pw" onclick="toggleLoginPw()">
          <svg id="loginEyeOff" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
          <svg id="loginEyeOn" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <button class="btn btn-primary btn-full" id="loginBtn" onclick="handleLogin()">
      <span class="btn-text">Sign In</span>
      <div class="spinner"></div>
    </button>
  </div>
</div>

<!-- App -->
<div id="app">
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">UE</div>
      <div class="sidebar-brand">Usf-Edge<span>Panel Management</span></div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">Main</div>
        <a class="nav-item active" data-view="dashboard" onclick="navigate('dashboard')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Dashboard
        </a>
        <a class="nav-item" data-view="users" onclick="navigate('users')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Users
        </a>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">System</div>
        <a class="nav-item" data-view="settings" onclick="navigate('settings')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </a>
        <a class="nav-item" data-view="password" onclick="navigate('password')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Change Password
        </a>
      </div>
    </nav>
    <div class="sidebar-footer">
      <a class="nav-item logout" onclick="handleLogout()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </a>
    </div>
  </aside>

  <div class="main">
    <header class="topbar">
      <div class="topbar-left">
        <button class="hamburger" onclick="toggleSidebar()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <h2 id="pageTitle">Dashboard</h2>
      </div>
      <div class="topbar-right"></div>
    </header>

    <div class="content">
      <!-- Dashboard -->
      <div id="dashboardView" class="view active">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <div class="stat-value" id="statTotalUsers">0</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
            <div class="stat-value" id="statActiveUsers">0</div>
            <div class="stat-label">Active Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
            <div class="stat-value" id="statTotalTraffic">0 B</div>
            <div class="stat-label">Total Traffic</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg></div>
            <div class="stat-value" id="statActiveConn">0</div>
            <div class="stat-label">Active Connections</div>
          </div>
        </div>
        <div class="table-header">
          <h3 style="font-size:16px;font-weight:600">Recent Users</h3>
          <button class="btn btn-primary btn-sm" onclick="openUserModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </button>
        </div>
        <div class="table-wrap">
          <div class="table-scroll">
            <table>
              <thead><tr><th>Username</th><th>UUID</th><th>Volume Used</th><th>Status</th><th>Last Active</th></tr></thead>
              <tbody id="dashboardUsers"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Users Management -->
      <div id="usersView" class="view">
        <div class="table-header">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="userSearch" placeholder="Search users..." oninput="filterUsers()">
          </div>
          <button class="btn btn-primary btn-sm" onclick="openUserModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </button>
        </div>
        <div class="table-wrap">
          <div class="table-scroll">
            <table>
              <thead><tr><th>#</th><th>Username</th><th>UUID</th><th>Volume</th><th>Expiry</th><th>Connections</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody id="usersTableBody"></tbody>
            </table>
          </div>
          <div class="pagination">
            <span id="paginationInfo">Showing 0 of 0</span>
            <div class="pagination-btns" id="paginationBtns"></div>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div id="settingsView" class="view">
        <div class="settings-grid">
          <div class="form-row">
            <label>Protocol</label>
            <select id="setProtocol"><option value="vlx">VLX</option><option value="trj">TRJ</option></select>
          </div>
          <div class="form-row">
            <label>Transport</label>
            <select id="setTransport"><option value="ws">WebSocket</option><option value="grpc">gRPC</option><option value="xhttp">XHTTP</option></select>
          </div>
          <div class="form-row">
            <label>Path</label>
            <input type="text" id="setPath" value="/">
          </div>
          <div class="form-row">
            <label>Host</label>
            <input type="text" id="setHost" placeholder="auto-detected">
          </div>
          <div class="form-row">
            <label>Fingerprint</label>
            <select id="setFingerprint"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="random">Random</option></select>
          </div>
          <div class="form-row">
            <label>Subscription Name</label>
            <input type="text" id="setSubName" placeholder="My Subscription">
          </div>
          <div class="form-row">
            <label>Admin Path</label>
            <input type="text" id="setAdminPath" placeholder="/admin">
          </div>
          <div class="form-row">
            <label>Subscription Path</label>
            <input type="text" id="setSubPath" placeholder="/sub">
          </div>
          <div class="form-row full">
            <button class="btn btn-primary" onclick="saveSettings()" id="saveSettingsBtn">
              <span class="btn-text">Save Settings</span>
              <div class="spinner"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div id="passwordView" class="view">
        <div style="max-width:440px">
          <div class="form-row">
            <label>Current Password</label>
            <div class="input-wrap">
              <input type="password" id="pwCurrent" placeholder="Enter current password">
            </div>
          </div>
          <div class="form-row">
            <label>New Password</label>
            <div class="input-wrap">
              <input type="password" id="pwNew" placeholder="Enter new password" oninput="checkPwStrength()">
            </div>
            <div class="strength-bar" id="strengthBar">
              <div class="seg" id="seg1"></div>
              <div class="seg" id="seg2"></div>
              <div class="seg" id="seg3"></div>
              <div class="seg" id="seg4"></div>
            </div>
            <div class="strength-text" id="strengthText"></div>
          </div>
          <div class="form-row">
            <label>Confirm Password</label>
            <div class="input-wrap">
              <input type="password" id="pwConfirm" placeholder="Confirm new password">
            </div>
          </div>
          <button class="btn btn-primary" onclick="changePassword()" id="changePwBtn" style="margin-top:8px">
            <span class="btn-text">Update Password</span>
            <div class="spinner"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- User Modal -->
<div class="modal-overlay" id="userModal">
  <div class="modal">
    <div class="modal-header">
      <h3 id="userModalTitle">Add New User</h3>
      <button class="modal-close" onclick="closeUserModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <label>Username</label>
        <input type="text" id="modalUsername" placeholder="e.g. user1">
      </div>
      <div class="form-row">
        <label>Volume Limit</label>
        <div class="input-suffix">
          <input type="number" id="modalVolume" placeholder="0" min="0" value="0">
          <span class="suffix">GB</span>
        </div>
        <div class="hint">0 = unlimited</div>
      </div>
      <div class="form-row">
        <label>Expiry</label>
        <select id="modalExpiry" onchange="toggleCustomDate()">
          <option value="0">Never</option>
          <option value="7">7 Days</option>
          <option value="30" selected>30 Days</option>
          <option value="90">90 Days</option>
          <option value="365">365 Days</option>
          <option value="custom">Custom Date</option>
        </select>
        <div id="customDateWrap" style="display:none;margin-top:8px">
          <input type="date" id="modalCustomDate">
        </div>
      </div>
      <div class="form-row">
        <label>Connection Limit</label>
        <div class="input-suffix">
          <input type="number" id="modalConnLimit" placeholder="0" min="0" value="0">
        </div>
        <div class="hint">0 = unlimited</div>
      </div>
      <div class="form-row">
        <label>Note</label>
        <textarea id="modalNote" placeholder="Optional note..."></textarea>
      </div>
      <div id="modalNewUserResult" style="display:none;background:var(--accent-dim);border:1px solid rgba(6,182,212,0.3);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px">
        <div style="font-size:13px;color:var(--muted);margin-bottom:4px">Password (save it now):</div>
        <div style="display:flex;align-items:center;gap:8px">
          <code id="modalNewPw" style="font-size:15px;font-weight:600;color:var(--accent);flex:1;word-break:break-all"></code>
          <button class="btn-icon" onclick="copyText(document.getElementById('modalNewPw').textContent)" title="Copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="closeUserModal()">Cancel</button>
        <button class="btn btn-primary" id="modalSaveBtn" onclick="saveUser()">
          <span class="btn-text">Save</span>
          <div class="spinner"></div>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Confirm Modal -->
<div class="modal-overlay" id="confirmModal">
  <div class="modal" style="max-width:400px">
    <div class="modal-body">
      <div class="confirm-body">
        <div class="confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h3 id="confirmTitle" style="font-size:17px;font-weight:600">Are you sure?</h3>
        <p id="confirmMsg">This action cannot be undone.</p>
      </div>
      <div class="confirm-actions">
        <button class="btn btn-secondary" onclick="closeConfirm()">Cancel</button>
        <button class="btn btn-danger" id="confirmBtn" onclick="confirmAction()">Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- Toast Container -->
<div class="toast-container" id="toastContainer"></div>

<script>
const API = '__ADMIN_API__';
let token = sessionStorage.getItem('usf_token') || null;
let allUsers = [];
let filteredUsers = [];
let currentPage = 1;
const PER_PAGE = 10;
let editingUserId = null;
let pendingConfirmFn = null;

(function init() {
  if (token) {
    showApp();
    const hash = location.hash.replace('#', '') || 'dashboard';
    navigate(hash);
  }
  window.addEventListener('hashchange', function() {
    var h = location.hash.replace('#', '') || 'dashboard';
    navigate(h);
  });
  document.getElementById('loginPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') handleLogin(); });
})();

async function handleLogin() {
  var pw = document.getElementById('loginPassword').value.trim();
  if (!pw) { showLoginError('Please enter a password'); return; }
  var btn = document.getElementById('loginBtn');
  btn.classList.add('loading');
  btn.disabled = true;
  document.getElementById('loginError').classList.remove('show');
  try {
    var res = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Invalid password');
    token = data.token;
    sessionStorage.setItem('usf_token', token);
    if (data.admin_path) sessionStorage.setItem('usf_admin_path', data.admin_path);
    showApp();
    navigate('dashboard');
  } catch (e) {
    showLoginError(e.message || 'Login failed');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

function showLoginError(msg) {
  document.getElementById('loginErrorMsg').textContent = msg;
  document.getElementById('loginError').classList.add('show');
}

function handleLogout() {
  sessionStorage.removeItem('usf_token');
  sessionStorage.removeItem('usf_admin_path');
  token = null;
  document.getElementById('app').classList.remove('active');
  document.getElementById('loginView').classList.add('active');
  document.getElementById('loginPassword').value = '';
}

function showApp() {
  document.getElementById('loginView').classList.remove('active');
  document.getElementById('app').classList.add('active');
}

function toggleLoginPw() {
  var inp = document.getElementById('loginPassword');
  var off = document.getElementById('loginEyeOff');
  var on = document.getElementById('loginEyeOn');
  if (inp.type === 'password') { inp.type = 'text'; off.style.display = 'none'; on.style.display = 'block'; }
  else { inp.type = 'password'; off.style.display = 'block'; on.style.display = 'none'; }
}

function navigate(view) {
  var views = ['dashboard', 'users', 'settings', 'password'];
  if (views.indexOf(view) === -1) view = 'dashboard';
  location.hash = view;
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
  document.getElementById(view + 'View').classList.add('active');
  document.querySelectorAll('.nav-item[data-view]').forEach(function(n) {
    n.classList.toggle('active', n.dataset.view === view);
  });
  var titles = { dashboard: 'Dashboard', users: 'Users Management', settings: 'Settings', password: 'Change Password' };
  document.getElementById('pageTitle').textContent = titles[view] || 'Dashboard';
  closeSidebar();
  if (view === 'dashboard') loadDashboard();
  if (view === 'users') loadUsers();
  if (view === 'settings') loadSettings();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
}

async function api(path, opts) {
  opts = opts || {};
  var headers = { 'Content-Type': 'application/json' };
  if (opts.headers) Object.keys(opts.headers).forEach(function(k) { headers[k] = opts.headers[k]; });
  if (token) headers['Authorization'] = 'Bearer ' + token;
  var fetchOpts = { method: opts.method || 'GET', headers: headers };
  if (opts.body) fetchOpts.body = opts.body;
  var res = await fetch(API + path, fetchOpts);
  var data = await res.json();
  if (!res.ok) {
    if (res.status === 401) { handleLogout(); throw new Error('Unauthorized'); }
    throw new Error(data.message || data.error || 'Request failed');
  }
  return data;
}

async function loadDashboard() {
  try {
    var results = await Promise.all([api('/dashboard'), api('/users')]);
    var dash = results[0];
    var usersData = results[1];
    document.getElementById('statTotalUsers').textContent = dash.total_users || 0;
    document.getElementById('statActiveUsers').textContent = dash.active_users || 0;
    document.getElementById('statTotalTraffic').textContent = formatBytes(dash.total_traffic || 0);
    document.getElementById('statActiveConn').textContent = dash.active_connections || 0;
    allUsers = usersData.users || [];
    renderDashboardUsers();
  } catch (e) { toast(e.message, 'error'); }
}

function renderDashboardUsers() {
  var tbody = document.getElementById('dashboardUsers');
  var recent = allUsers.slice(0, 8);
  if (!recent.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:40px">No users yet</td></tr>'; return; }
  tbody.innerHTML = recent.map(function(u) {
    return '<tr>' +
      '<td style="font-weight:500">' + esc(u.username) + '</td>' +
      '<td><div class="uuid-cell"><span>' + truncUuid(u.uuid) + '</span><button class="copy-btn" onclick="copyText(\\'' + u.uuid + '\\')" title="Copy UUID"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div></td>' +
      '<td>' + formatBytes(u.volume_used || 0) + '</td>' +
      '<td>' + statusBadge(u.status === 'active' || u.enabled !== false) + '</td>' +
      '<td style="color:var(--muted);font-size:13px">' + formatDate(u.last_active || u.updated_at) + '</td>' +
    '</tr>';
  }).join('');
}

async function loadUsers() {
  try {
    var data = await api('/users');
    allUsers = data.users || [];
    filterUsers();
  } catch (e) { toast(e.message, 'error'); }
}

function filterUsers() {
  var q = (document.getElementById('userSearch').value || '').toLowerCase();
  filteredUsers = q ? allUsers.filter(function(u) { return (u.username || '').toLowerCase().indexOf(q) !== -1 || (u.uuid || '').toLowerCase().indexOf(q) !== -1; }) : allUsers.slice();
  currentPage = 1;
  renderUsersTable();
}

function renderUsersTable() {
  var tbody = document.getElementById('usersTableBody');
  var total = filteredUsers.length;
  var pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (currentPage > pages) currentPage = pages;
  var start = (currentPage - 1) * PER_PAGE;
  var slice = filteredUsers.slice(start, start + PER_PAGE);

  if (!total) {
    tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><p>No users found</p></div></td></tr>';
    document.getElementById('paginationInfo').textContent = 'Showing 0 of 0';
    document.getElementById('paginationBtns').innerHTML = '';
    return;
  }

  tbody.innerHTML = slice.map(function(u, i) {
    var used = u.volume_used || 0;
    var limit = u.volume_limit || 0;
    var pct = limit > 0 ? Math.min(100, (used / (limit * 1073741824)) * 100) : 0;
    var pClass = pct > 90 ? 'red' : pct > 70 ? 'yellow' : 'green';
    var volText = limit > 0 ? formatBytes(used) + ' / ' + limit + ' GB' : formatBytes(used) + ' / \\u221E';
    var aConn = u.active_connections || 0;
    var cLimit = u.connection_limit || 0;
    var connText = cLimit > 0 ? aConn + ' / ' + cLimit : aConn + ' / \\u221E';
    var exp = u.expire_at ? formatDate(u.expire_at) : 'Never';
    var en = u.status === 'active' || u.enabled !== false;
    var uid = u.id || u.uuid;
    return '<tr>' +
      '<td style="color:var(--muted)">' + (start + i + 1) + '</td>' +
      '<td style="font-weight:500">' + esc(u.username) + '</td>' +
      '<td><div class="uuid-cell"><span>' + truncUuid(u.uuid) + '</span><button class="copy-btn" onclick="copyText(\\'' + u.uuid + '\\')" title="Copy UUID"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div></td>' +
      '<td style="white-space:nowrap">' + volText + '<div class="progress-mini"><div class="fill ' + pClass + '" style="width:' + pct + '%"></div></div></td>' +
      '<td style="color:var(--muted);font-size:13px">' + exp + '</td>' +
      '<td style="font-size:13px">' + connText + '</td>' +
      '<td><label class="toggle"><input type="checkbox" ' + (en ? 'checked' : '') + ' onchange="toggleUserStatus(\\'' + uid + '\\', this.checked)"><span class="slider"></span></label></td>' +
      '<td><div class="actions-cell">' +
        '<button class="btn-icon" title="Edit" onclick="editUser(\\'' + uid + '\\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="btn-icon" title="Reset Traffic" onclick="resetTraffic(\\'' + uid + '\\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button>' +
        '<button class="btn-icon" title="Copy Sub Link" onclick="copySubLink(\\'' + u.uuid + '\\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>' +
        '<button class="btn-icon" title="Delete" onclick="confirmDelete(\\'' + uid + '\\', \\'' + esc(u.username).replace(/'/g, "\\\\'") + '\\')" style="color:var(--error)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
      '</div></td>' +
    '</tr>';
  }).join('');

  document.getElementById('paginationInfo').textContent = 'Showing ' + (start + 1) + '\\u2013' + Math.min(start + PER_PAGE, total) + ' of ' + total;
  renderPagination(pages);
}

function renderPagination(pages) {
  var container = document.getElementById('paginationBtns');
  if (pages <= 1) { container.innerHTML = ''; return; }
  var html = '<button ' + (currentPage === 1 ? 'disabled' : '') + ' onclick="goPage(' + (currentPage - 1) + ')">\\u2039</button>';
  var maxVisible = 5;
  var startP = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  var endP = Math.min(pages, startP + maxVisible - 1);
  if (endP - startP < maxVisible - 1) startP = Math.max(1, endP - maxVisible + 1);
  if (startP > 1) html += '<button onclick="goPage(1)">1</button><button disabled>\\u2026</button>';
  for (var i = startP; i <= endP; i++) {
    html += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  if (endP < pages) html += '<button disabled>\\u2026</button><button onclick="goPage(' + pages + ')">' + pages + '</button>';
  html += '<button ' + (currentPage === pages ? 'disabled' : '') + ' onclick="goPage(' + (currentPage + 1) + ')">\\u203A</button>';
  container.innerHTML = html;
}

function goPage(p) { currentPage = p; renderUsersTable(); }

function openUserModal() {
  editingUserId = null;
  document.getElementById('userModalTitle').textContent = 'Add New User';
  document.getElementById('modalUsername').value = '';
  document.getElementById('modalUsername').disabled = false;
  document.getElementById('modalVolume').value = 0;
  document.getElementById('modalExpiry').value = '30';
  document.getElementById('modalConnLimit').value = 0;
  document.getElementById('modalNote').value = '';
  document.getElementById('modalNewUserResult').style.display = 'none';
  document.getElementById('customDateWrap').style.display = 'none';
  document.getElementById('modalSaveBtn').querySelector('.btn-text').textContent = 'Save';
  document.getElementById('userModal').classList.add('active');
}

function editUser(id) {
  var u = null;
  for (var i = 0; i < allUsers.length; i++) { if ((allUsers[i].id || allUsers[i].uuid) === id) { u = allUsers[i]; break; } }
  if (!u) return;
  editingUserId = id;
  document.getElementById('userModalTitle').textContent = 'Edit User';
  document.getElementById('modalUsername').value = u.username || '';
  document.getElementById('modalUsername').disabled = true;
  document.getElementById('modalVolume').value = u.volume_limit || 0;
  document.getElementById('modalConnLimit').value = u.connection_limit || 0;
  document.getElementById('modalNote').value = u.note || '';
  document.getElementById('modalNewUserResult').style.display = 'none';
  if (!u.expire_at) {
    document.getElementById('modalExpiry').value = '0';
    document.getElementById('customDateWrap').style.display = 'none';
  } else {
    var exp = new Date(u.expire_at);
    var now = new Date();
    var diffDays = Math.round((exp - now) / 86400000);
    var sel = document.getElementById('modalExpiry');
    if ([7, 30, 90, 365].indexOf(diffDays) !== -1) {
      sel.value = String(diffDays);
      document.getElementById('customDateWrap').style.display = 'none';
    } else {
      sel.value = 'custom';
      document.getElementById('customDateWrap').style.display = 'block';
      document.getElementById('modalCustomDate').value = u.expire_at.split('T')[0];
    }
  }
  document.getElementById('modalSaveBtn').querySelector('.btn-text').textContent = 'Update';
  document.getElementById('userModal').classList.add('active');
}

function closeUserModal() { document.getElementById('userModal').classList.remove('active'); }

function toggleCustomDate() {
  var v = document.getElementById('modalExpiry').value;
  document.getElementById('customDateWrap').style.display = v === 'custom' ? 'block' : 'none';
}

async function saveUser() {
  var username = document.getElementById('modalUsername').value.trim();
  if (!username) { toast('Username is required', 'warning'); return; }
  var volume_limit = parseInt(document.getElementById('modalVolume').value) || 0;
  var conn_limit = parseInt(document.getElementById('modalConnLimit').value) || 0;
  var note = document.getElementById('modalNote').value.trim();
  var expire_days = document.getElementById('modalExpiry').value;
  var expire_date = null;
  if (expire_days === 'custom') {
    expire_date = document.getElementById('modalCustomDate').value;
    if (!expire_date) { toast('Please select a custom date', 'warning'); return; }
    expire_days = 'custom';
  } else {
    expire_days = parseInt(expire_days) || 0;
  }
  var btn = document.getElementById('modalSaveBtn');
  btn.classList.add('loading');
  btn.disabled = true;
  try {
    if (editingUserId) {
      var body = { volume_limit: volume_limit, connection_limit: conn_limit, note: note };
      if (expire_days === 'custom') { body.expire_date = expire_date; } else { body.expire_days = expire_days; }
      await api('/users/' + editingUserId, { method: 'PUT', body: JSON.stringify(body) });
      toast('User updated successfully', 'success');
      closeUserModal();
      loadUsers();
      loadDashboard();
    } else {
      var body2 = { username: username, volume_limit: volume_limit, connection_limit: conn_limit, note: note };
      if (expire_days === 'custom') { body2.expire_date = expire_date; } else { body2.expire_days = expire_days; }
      var data = await api('/users', { method: 'POST', body: JSON.stringify(body2) });
      if (data.password) {
        document.getElementById('modalNewPw').textContent = data.password;
        document.getElementById('modalNewUserResult').style.display = 'block';
        toast('User created. Save the password!', 'success');
      } else {
        toast('User created successfully', 'success');
        closeUserModal();
      }
      loadUsers();
      loadDashboard();
    }
  } catch (e) { toast(e.message, 'error'); }
  finally { btn.classList.remove('loading'); btn.disabled = false; }
}

async function toggleUserStatus(id, enabled) {
  try {
    await api('/users/' + id, { method: 'PUT', body: JSON.stringify({ enabled: enabled }) });
    toast(enabled ? 'User enabled' : 'User disabled', 'success');
    loadUsers();
    loadDashboard();
  } catch (e) { toast(e.message, 'error'); }
}

function confirmDelete(id, name) {
  document.getElementById('confirmTitle').textContent = 'Delete User';
  document.getElementById('confirmMsg').textContent = 'Are you sure you want to delete "' + name + '"? This cannot be undone.';
  document.getElementById('confirmBtn').textContent = 'Delete';
  pendingConfirmFn = async function() {
    try {
      await api('/users/' + id, { method: 'DELETE' });
      toast('User deleted', 'success');
      loadUsers();
      loadDashboard();
    } catch (e) { toast(e.message, 'error'); }
  };
  document.getElementById('confirmModal').classList.add('active');
}

function resetTraffic(id) {
  document.getElementById('confirmTitle').textContent = 'Reset Traffic';
  document.getElementById('confirmMsg').textContent = 'Reset traffic usage for this user?';
  document.getElementById('confirmBtn').textContent = 'Reset';
  pendingConfirmFn = async function() {
    try {
      await api('/users/' + id + '/reset-traffic', { method: 'POST' });
      toast('Traffic reset successfully', 'success');
      loadUsers();
      loadDashboard();
    } catch (e) { toast(e.message, 'error'); }
  };
  document.getElementById('confirmModal').classList.add('active');
}

function confirmAction() {
  if (pendingConfirmFn) pendingConfirmFn();
  closeConfirm();
}
function closeConfirm() { document.getElementById('confirmModal').classList.remove('active'); pendingConfirmFn = null; }

async function copySubLink(uuid) {
  try {
    var s = await api('/settings');
    var subPath = s.sub_path || '/sub';
    var host = location.origin;
    await copyText(host + subPath + '/' + uuid);
    toast('Subscription link copied', 'success');
  } catch (e) {
    await copyText(uuid);
  }
}

async function loadSettings() {
  try {
    var s = await api('/settings');
    document.getElementById('setProtocol').value = s.protocol || 'vlx';
    document.getElementById('setTransport').value = s.transport || 'ws';
    document.getElementById('setPath').value = s.path || '/';
    document.getElementById('setHost').value = s.host || location.hostname;
    document.getElementById('setFingerprint').value = s.fingerprint || 'chrome';
    document.getElementById('setSubName').value = s.sub_name || '';
    document.getElementById('setAdminPath').value = s.admin_path || '';
    document.getElementById('setSubPath').value = s.sub_path || '';
  } catch (e) { toast(e.message, 'error'); }
}

async function saveSettings() {
  var btn = document.getElementById('saveSettingsBtn');
  btn.classList.add('loading'); btn.disabled = true;
  try {
    await api('/settings', {
      method: 'PUT',
      body: JSON.stringify({
        protocol: document.getElementById('setProtocol').value,
        transport: document.getElementById('setTransport').value,
        path: document.getElementById('setPath').value,
        host: document.getElementById('setHost').value,
        fingerprint: document.getElementById('setFingerprint').value,
        sub_name: document.getElementById('setSubName').value,
        admin_path: document.getElementById('setAdminPath').value,
        sub_path: document.getElementById('setSubPath').value
      })
    });
    toast('Settings saved', 'success');
  } catch (e) { toast(e.message, 'error'); }
  finally { btn.classList.remove('loading'); btn.disabled = false; }
}

function checkPwStrength() {
  var pw = document.getElementById('pwNew').value;
  var score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  var segs = [document.getElementById('seg1'), document.getElementById('seg2'), document.getElementById('seg3'), document.getElementById('seg4')];
  var labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  var classes = ['', 'weak', 'fair', 'fair', 'strong'];
  var colors = ['', 'var(--error)', 'var(--warning)', 'var(--warning)', 'var(--success)'];
  for (var i = 0; i < 4; i++) { segs[i].className = 'seg' + (i < score ? ' ' + classes[score] : ''); }
  var txt = document.getElementById('strengthText');
  txt.textContent = pw ? labels[score] : '';
  txt.style.color = colors[score];
}

async function changePassword() {
  var cur = document.getElementById('pwCurrent').value;
  var nw = document.getElementById('pwNew').value;
  var cfm = document.getElementById('pwConfirm').value;
  if (!cur) { toast('Enter current password', 'warning'); return; }
  if (!nw) { toast('Enter new password', 'warning'); return; }
  if (nw !== cfm) { toast('Passwords do not match', 'error'); return; }
  if (nw.length < 6) { toast('Password must be at least 6 characters', 'warning'); return; }
  var btn = document.getElementById('changePwBtn');
  btn.classList.add('loading'); btn.disabled = true;
  try {
    await api('/change-password', { method: 'PUT', body: JSON.stringify({ old_password: cur, new_password: nw }) });
    toast('Password changed successfully', 'success');
    document.getElementById('pwCurrent').value = '';
    document.getElementById('pwNew').value = '';
    document.getElementById('pwConfirm').value = '';
    checkPwStrength();
  } catch (e) { toast(e.message, 'error'); }
  finally { btn.classList.remove('loading'); btn.disabled = false; }
}

function toast(msg, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  var icons = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };
  var el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.innerHTML = (icons[type] || icons.info) + '<span>' + esc(msg) + '</span>';
  container.appendChild(el);
  setTimeout(function() { el.classList.add('removing'); setTimeout(function() { el.remove(); }, 300); }, 4000);
}

function formatBytes(b) {
  if (!b || b === 0) return '0 B';
  var units = ['B', 'KB', 'MB', 'GB', 'TB'];
  var i = Math.min(Math.floor(Math.log(b) / Math.log(1024)), 4);
  return (b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
}

function truncUuid(uuid) {
  if (!uuid) return '\\u2014';
  return uuid.length > 12 ? uuid.substring(0, 8) + '\\u2026' + uuid.substring(uuid.length - 4) : uuid;
}

function formatDate(d) {
  if (!d) return '\\u2014';
  try {
    var dt = new Date(d);
    if (isNaN(dt.getTime())) return '\\u2014';
    var now = new Date();
    var diff = now - dt;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: dt.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  } catch (e) { return '\\u2014'; }
}

function statusBadge(active) {
  if (active) return '<span class="badge badge-success"><span class="badge-dot"></span>Active</span>';
  return '<span class="badge badge-error">Disabled</span>';
}

function esc(s) {
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied to clipboard', 'success');
  } catch (e) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    toast('Copied to clipboard', 'success');
  }
}

document.getElementById('userModal').addEventListener('click', function(e) { if (e.target === this) closeUserModal(); });
document.getElementById('confirmModal').addEventListener('click', function(e) { if (e.target === this) closeConfirm(); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeUserModal(); closeConfirm(); }
});
</script>
</body>
</html>`;
