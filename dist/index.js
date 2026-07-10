var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/html/admin.ts
var adminHTML = `<!DOCTYPE html>
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

/* \u2500\u2500 Login \u2500\u2500 */
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

/* \u2500\u2500 App Layout \u2500\u2500 */
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

/* \u2500\u2500 Overlay \u2500\u2500 */
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90;backdrop-filter:blur(2px)}
.sidebar-overlay.active{display:block}

/* \u2500\u2500 Stat Cards \u2500\u2500 */
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

/* \u2500\u2500 Table \u2500\u2500 */
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

/* \u2500\u2500 Toggle Switch \u2500\u2500 */
.toggle{position:relative;width:40px;height:22px;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0;position:absolute}
.toggle .slider{position:absolute;inset:0;background:rgba(148,163,184,0.2);border-radius:22px;cursor:pointer;transition:all .25s}
.toggle .slider::before{content:'';position:absolute;width:16px;height:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:all .25s}
.toggle input:checked+.slider{background:var(--accent)}
.toggle input:checked+.slider::before{transform:translateX(18px)}

/* \u2500\u2500 Modal \u2500\u2500 */
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

/* \u2500\u2500 Confirm Dialog \u2500\u2500 */
.confirm-body{text-align:center;padding:12px 0 8px}
.confirm-body .confirm-icon{width:56px;height:56px;border-radius:50%;background:var(--error-dim);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--error)}
.confirm-body .confirm-icon svg{width:28px;height:28px}
.confirm-body p{color:var(--muted);font-size:14px;margin-top:6px}
.confirm-actions{display:flex;gap:12px;justify-content:center;margin-top:24px}

/* \u2500\u2500 Toast \u2500\u2500 */
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

/* \u2500\u2500 Settings \u2500\u2500 */
.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:700px}
.settings-grid .full{grid-column:1/-1}

/* \u2500\u2500 Empty State \u2500\u2500 */
.empty-state{text-align:center;padding:60px 20px;color:var(--muted)}
.empty-state svg{width:64px;height:64px;margin-bottom:16px;opacity:.3}
.empty-state p{font-size:15px}

/* \u2500\u2500 Responsive \u2500\u2500 */
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
      <div class="sidebar-brand">Usf-Edge<span>Proxy Management</span></div>
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
            <select id="setProtocol"><option value="vless">VLESS</option><option value="trojan">Trojan</option></select>
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
    document.getElementById('setProtocol').value = s.protocol || 'vless';
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
<\/script>
</body>
</html>`;

// src/html/fake.ts
function getFakePageHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to nginx!</title>
<style>
body{width:35em;margin:0 auto;font-family:Tahoma,Verdana,Arial,sans-serif}
h1{background:#8e44ad;color:#fff;padding:10px 20px;border-radius:6px 6px 0 0;margin:0}
p{padding:20px;background:#f9f9f9;border:1px solid #ddd;border-top:none;border-radius:0 0 6px 6px;margin:0;line-height:1.7;color:#333}
a{color:#2980b9;text-decoration:none}
a:hover{text-decoration:underline}
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>`;
}
__name(getFakePageHTML, "getFakePageHTML");

// src/db.ts
async function getSetting(db, key) {
  const result = await db.prepare("SELECT value FROM settings WHERE key = ?").bind(key).first();
  return result?.value || "";
}
__name(getSetting, "getSetting");
async function getAllSettings(db) {
  const rows = await db.prepare("SELECT key, value FROM settings").all();
  const settings = {};
  for (const row of rows.results) {
    settings[row.key] = row.value;
  }
  return {
    protocol: settings.protocol || "vless",
    transport: settings.transport || "ws",
    path: settings.path || "/",
    host: settings.host || "",
    fingerprint: settings.fingerprint || "chrome",
    sub_name: settings.sub_name || "Usf-Edge",
    fake_page_url: settings.fake_page_url || "",
    admin_path: settings.admin_path || "usf-admin",
    sub_path: settings.sub_path || "s"
  };
}
__name(getAllSettings, "getAllSettings");
async function updateSetting(db, key, value) {
  await db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").bind(key, value).run();
}
__name(updateSetting, "updateSetting");
async function getUserByUUID(db, uuid) {
  return db.prepare("SELECT * FROM users WHERE uuid = ?").bind(uuid).first();
}
__name(getUserByUUID, "getUserByUUID");
async function getUserByUsername(db, username) {
  return db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
}
__name(getUserByUsername, "getUserByUsername");
async function getUserById(db, id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
}
__name(getUserById, "getUserById");
async function getAllUsers(db) {
  const result = await db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
  return result.results;
}
__name(getAllUsers, "getAllUsers");
async function createUser(db, uuid, username, password, volumeLimit, expireDays, connectionLimit) {
  const expireDate = expireDays > 0 ? new Date(Date.now() + expireDays * 864e5).toISOString() : null;
  await db.prepare(
    `INSERT INTO users (uuid, username, password, volume_limit, expire_date, connection_limit)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(uuid, username, password, volumeLimit, expireDate, connectionLimit).run();
  const user = await getUserByUsername(db, username);
  return user;
}
__name(createUser, "createUser");
async function updateUser(db, id, updates) {
  const setClauses = [];
  const values = [];
  if (updates.username !== void 0) {
    setClauses.push("username = ?");
    values.push(updates.username);
  }
  if (updates.volume_limit !== void 0) {
    setClauses.push("volume_limit = ?");
    values.push(updates.volume_limit);
  }
  if (updates.expire_date !== void 0) {
    setClauses.push("expire_date = ?");
    values.push(updates.expire_date);
  }
  if (updates.connection_limit !== void 0) {
    setClauses.push("connection_limit = ?");
    values.push(updates.connection_limit);
  }
  if (updates.enabled !== void 0) {
    setClauses.push("enabled = ?");
    values.push(updates.enabled);
  }
  if (updates.note !== void 0) {
    setClauses.push("note = ?");
    values.push(updates.note);
  }
  if (updates.password !== void 0) {
    setClauses.push("password = ?");
    values.push(updates.password);
  }
  if (setClauses.length === 0) return;
  setClauses.push("updated_at = datetime('now')");
  values.push(id);
  await db.prepare(`UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`).bind(...values).run();
}
__name(updateUser, "updateUser");
async function deleteUser(db, id) {
  await db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
}
__name(deleteUser, "deleteUser");
async function getUserTraffic(db, userId) {
  const result = await db.prepare(
    "SELECT COALESCE(SUM(upload), 0) as upload, COALESCE(SUM(download), 0) as download FROM traffic_logs WHERE user_id = ?"
  ).bind(userId).first();
  return {
    upload: result?.upload || 0,
    download: result?.download || 0,
    total: (result?.upload || 0) + (result?.download || 0)
  };
}
__name(getUserTraffic, "getUserTraffic");
async function addUserTraffic(db, userId, upload, download) {
  if (upload === 0 && download === 0) return;
  await db.prepare(
    "INSERT INTO traffic_logs (user_id, upload, download) VALUES (?, ?, ?)"
  ).bind(userId, upload, download).run();
  await db.prepare(
    "UPDATE users SET volume_used = volume_used + ?, updated_at = datetime('now') WHERE id = ?"
  ).bind(upload + download, userId).run();
}
__name(addUserTraffic, "addUserTraffic");
async function resetUserTraffic(db, userId) {
  await db.prepare("DELETE FROM traffic_logs WHERE user_id = ?").bind(userId).run();
  await db.prepare("UPDATE users SET volume_used = 0, updated_at = datetime('now') WHERE id = ?").bind(userId).run();
}
__name(resetUserTraffic, "resetUserTraffic");
async function addActiveConnection(db, userId, ip, ua) {
  const result = await db.prepare(
    "INSERT INTO active_connections (user_id, ip_address, user_agent) VALUES (?, ?, ?) RETURNING id"
  ).bind(userId, ip, ua).first();
  return result?.id || 0;
}
__name(addActiveConnection, "addActiveConnection");
async function removeActiveConnection(db, connId) {
  await db.prepare("DELETE FROM active_connections WHERE id = ?").bind(connId).run();
}
__name(removeActiveConnection, "removeActiveConnection");
async function getActiveConnections(db, userId) {
  const result = await db.prepare(
    "SELECT * FROM active_connections WHERE user_id = ? ORDER BY connected_at DESC"
  ).bind(userId).all();
  return result.results;
}
__name(getActiveConnections, "getActiveConnections");
async function countActiveConnections(db, userId) {
  const result = await db.prepare(
    "SELECT COUNT(*) as count FROM active_connections WHERE user_id = ?"
  ).bind(userId).first();
  return result?.count || 0;
}
__name(countActiveConnections, "countActiveConnections");
async function getDashboardStats(db) {
  const totalUsers = await db.prepare("SELECT COUNT(*) as count FROM users").first();
  const activeUsers = await db.prepare("SELECT COUNT(*) as count FROM users WHERE enabled = 1 AND (expire_date IS NULL OR expire_date > datetime('now'))").first();
  const totalTraffic = await db.prepare("SELECT COALESCE(SUM(upload + download), 0) as total FROM traffic_logs").first();
  const activeConns = await db.prepare("SELECT COUNT(*) as count FROM active_connections").first();
  return {
    total_users: totalUsers?.count || 0,
    active_users: activeUsers?.count || 0,
    total_traffic: totalTraffic?.total || 0,
    active_connections: activeConns?.count || 0
  };
}
__name(getDashboardStats, "getDashboardStats");
async function changeAdminPassword(db, oldPass, newPass) {
  const current = await getSetting(db, "admin_pass");
  if (current && current !== oldPass) return false;
  await updateSetting(db, "admin_pass", newPass);
  return true;
}
__name(changeAdminPassword, "changeAdminPassword");
async function validateUserAccess(db, uuid) {
  const user = await getUserByUUID(db, uuid);
  if (!user) return { user: null, allowed: false, reason: "User not found" };
  if (!user.enabled) return { user, allowed: false, reason: "User is disabled" };
  if (user.expire_date && new Date(user.expire_date) < /* @__PURE__ */ new Date()) return { user, allowed: false, reason: "User expired" };
  if (user.volume_limit > 0 && user.volume_used >= user.volume_limit) return { user, allowed: false, reason: "Volume limit reached" };
  const conns = await countActiveConnections(db, user.id);
  if (user.connection_limit > 0 && conns >= user.connection_limit) return { user, allowed: false, reason: "Connection limit reached" };
  return { user, allowed: true, reason: "OK" };
}
__name(validateUserAccess, "validateUserAccess");

// src/utils.ts
function generateUUID() {
  return crypto.randomUUID();
}
__name(generateUUID, "generateUUID");
function generatePassword(length = 16) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*";
  let password = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    password += chars[randomValues[i] % chars.length];
  }
  return password;
}
__name(generatePassword, "generatePassword");
function simpleHash(str) {
  let h1 = 3735928559;
  let h2 = 1103547991;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, "0");
}
__name(simpleHash, "simpleHash");
function hashPassword(password) {
  return simpleHash(password);
}
__name(hashPassword, "hashPassword");
function verifyAuth(cookie, adminPass) {
  if (!cookie) return false;
  const match = cookie.match(/usf_auth=([^;]+)/);
  if (!match) return false;
  return match[1] === hashPassword(adminPass);
}
__name(verifyAuth, "verifyAuth");
function bytesToUUID(bytes) {
  const hex = Array.from(bytes.slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
__name(bytesToUUID, "bytesToUUID");
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
__name(formatBytes, "formatBytes");
function daysRemaining(expireDate) {
  if (!expireDate) return -1;
  const diff = new Date(expireDate).getTime() - Date.now();
  return Math.ceil(diff / 864e5);
}
__name(daysRemaining, "daysRemaining");
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}
__name(jsonResponse, "jsonResponse");
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}
__name(corsHeaders, "corsHeaders");

// src/admin-api.ts
async function handleAdminAPI(request, env, path) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }
  if (path === "/api/auth/login" && request.method === "POST") {
    return handleLogin(request, env);
  }
  const cookie = request.headers.get("Cookie");
  const authHeader = request.headers.get("Authorization");
  let authenticated = false;
  let adminPass = env.ADMIN_PASS;
  try {
    const storedPass = await getSetting(env.DB, "admin_pass");
    if (storedPass) adminPass = storedPass;
  } catch (e) {
  }
  if (authHeader && authHeader.startsWith("Bearer ")) {
    authenticated = authHeader.slice(7) === hashPassword(adminPass);
  } else {
    authenticated = verifyAuth(cookie, adminPass);
  }
  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
  if (path === "/api/dashboard" && request.method === "GET") {
    return handleDashboard(env);
  }
  if (path === "/api/users" && request.method === "GET") {
    return handleGetUsers(env);
  }
  if (path === "/api/users" && request.method === "POST") {
    return handleCreateUser(request, env);
  }
  const userMatch = path.match(/^\/api\/users\/(\d+)(\/.*)?$/);
  if (userMatch) {
    const userId = parseInt(userMatch[1]);
    const subPath = userMatch[2] || "";
    if (subPath === "" && request.method === "PUT") return handleUpdateUser(request, env, userId);
    if (subPath === "" && request.method === "DELETE") return handleDeleteUser(env, userId);
    if (subPath === "/reset-traffic" && request.method === "POST") return handleResetTraffic(env, userId);
    if (subPath === "/connections" && request.method === "GET") return handleGetConnections(env, userId);
  }
  if (path === "/api/settings" && request.method === "GET") {
    return handleGetSettings(env);
  }
  if (path === "/api/settings" && request.method === "PUT") {
    return handleUpdateSettings(request, env);
  }
  if (path === "/api/change-password" && request.method === "PUT") {
    return handleChangePassword(request, env);
  }
  return jsonResponse({ error: "Not found" }, 404);
}
__name(handleAdminAPI, "handleAdminAPI");
async function handleLogin(request, env) {
  try {
    const body = await request.json();
    let adminPass = env.ADMIN_PASS;
    try {
      const storedPass = await getSetting(env.DB, "admin_pass");
      if (storedPass) adminPass = storedPass;
    } catch (e) {
    }
    if (body.password === adminPass) {
      const token = hashPassword(adminPass);
      const adminPath = await getSetting(env.DB, "admin_path") || "usf-admin";
      return jsonResponse({ token, admin_path: adminPath }, 200);
    }
    return jsonResponse({ error: "Invalid password" }, 401);
  } catch (e) {
    return jsonResponse({ error: "Bad request" }, 400);
  }
}
__name(handleLogin, "handleLogin");
async function handleDashboard(env) {
  try {
    const stats = await getDashboardStats(env.DB);
    const users = await getAllUsers(env.DB);
    const recentUsers = users.slice(0, 10).map((u) => ({
      id: u.id,
      username: u.username,
      uuid: u.uuid,
      volume_used: u.volume_used,
      volume_limit: u.volume_limit,
      enabled: u.enabled,
      expire_date: u.expire_date,
      updated_at: u.updated_at
    }));
    return jsonResponse({ ...stats, recent_users: recentUsers });
  } catch (e) {
    return jsonResponse({ total_users: 0, active_users: 0, total_traffic: 0, active_connections: 0, recent_users: [], error: e.message }, 200);
  }
}
__name(handleDashboard, "handleDashboard");
async function handleGetUsers(env) {
  try {
    const users = await getAllUsers(env.DB);
    return jsonResponse({ users });
  } catch (e) {
    return jsonResponse({ users: [], error: e.message }, 200);
  }
}
__name(handleGetUsers, "handleGetUsers");
async function handleCreateUser(request, env) {
  try {
    const body = await request.json();
    if (!body.username || body.username.length < 3) {
      return jsonResponse({ error: "Username must be at least 3 characters" }, 400);
    }
    const existing = await getUserByUsername(env.DB, body.username);
    if (existing) {
      return jsonResponse({ error: "Username already exists" }, 409);
    }
    const uuid = generateUUID();
    const password = generatePassword(16);
    const volumeLimit = (body.volume_limit || 0) * 1073741824;
    const user = await createUser(
      env.DB,
      uuid,
      body.username,
      password,
      volumeLimit,
      body.expire_days || 0,
      body.connection_limit || 0
    );
    if (body.note) {
      await updateUser(env.DB, user.id, { note: body.note });
    }
    return jsonResponse({
      user: { ...user, volume_limit: user.volume_limit / 1073741824 },
      password,
      sub_link: `/${await getSetting(env.DB, "sub_path") || "s"}/${uuid}`
    }, 201);
  } catch (e) {
    return jsonResponse({ error: e.message || "Failed to create user" }, 500);
  }
}
__name(handleCreateUser, "handleCreateUser");
async function handleUpdateUser(request, env, userId) {
  try {
    const body = await request.json();
    const updates = {};
    if (body.username !== void 0) updates.username = body.username;
    if (body.volume_limit !== void 0) updates.volume_limit = body.volume_limit * 1073741824;
    if (body.expire_days !== void 0) {
      if (body.expire_days === 0) {
        updates.expire_date = null;
      } else {
        const user = await getUserById(env.DB, userId);
        const base = user ? new Date(user.created_at) : /* @__PURE__ */ new Date();
        updates.expire_date = new Date(base.getTime() + body.expire_days * 864e5).toISOString();
      }
    }
    if (body.connection_limit !== void 0) updates.connection_limit = body.connection_limit;
    if (body.enabled !== void 0) updates.enabled = body.enabled ? 1 : 0;
    if (body.note !== void 0) updates.note = body.note;
    await updateUser(env.DB, userId, updates);
    return jsonResponse({ success: true });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleUpdateUser, "handleUpdateUser");
async function handleDeleteUser(env, userId) {
  try {
    await deleteUser(env.DB, userId);
    return jsonResponse({ success: true });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleDeleteUser, "handleDeleteUser");
async function handleResetTraffic(env, userId) {
  try {
    await resetUserTraffic(env.DB, userId);
    return jsonResponse({ success: true });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleResetTraffic, "handleResetTraffic");
async function handleGetConnections(env, userId) {
  try {
    const connections = await getActiveConnections(env.DB, userId);
    return jsonResponse({ connections });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleGetConnections, "handleGetConnections");
async function handleGetSettings(env) {
  const settings = await getAllSettings(env.DB);
  return jsonResponse(settings);
}
__name(handleGetSettings, "handleGetSettings");
async function handleUpdateSettings(request, env) {
  try {
    const body = await request.json();
    for (const [key, value] of Object.entries(body)) {
      await updateSetting(env.DB, key, value);
    }
    return jsonResponse({ success: true });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleUpdateSettings, "handleUpdateSettings");
async function handleChangePassword(request, env) {
  try {
    const body = await request.json();
    const success = await changeAdminPassword(env.DB, body.old_password, body.new_password);
    if (success) {
      return jsonResponse({ success: true });
    }
    return jsonResponse({ error: "Current password is incorrect" }, 403);
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(handleChangePassword, "handleChangePassword");

// src/html/subscription.ts
var subscriptionHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__SUB_NAME__ \u2014 Usf-Edge</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"><\/script>
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
      <h1>Welcome, __USERNAME__ <span>\xB7 __SUB_NAME__</span></h1>
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
  // \u2500\u2500 Placeholders (replaced at runtime) \u2500\u2500
  const STATUS = '__STATUS__';
  const VOLUME_USED = '__VOLUME_USED__';
  const VOLUME_LIMIT = '__VOLUME_LIMIT__';
  const VOLUME_PERCENT = parseFloat('__VOLUME_PERCENT__') || 0;
  const DAYS_REMAINING = parseInt('__DAYS_REMAINING__', 10);
  const EXPIRE_DATE = '__EXPIRE_DATE__';
  const ACTIVE_CONNS = parseInt('__ACTIVE_CONNS__', 10) || 0;
  const CONN_LIMIT = '__CONN_LIMIT__';
  const CONNECTIONS_JSON = '__CONNECTIONS_JSON__';

  // \u2500\u2500 Status Badge \u2500\u2500
  const badgeEl = document.getElementById('statusBadge');
  const statusMap = {
    active:   { cls:'badge-active',   label:'Active' },
    expired:  { cls:'badge-expired',  label:'Expired' },
    limited:  { cls:'badge-limited',  label:'Limited' },
    disabled: { cls:'badge-disabled', label:'Disabled' },
  };
  const st = statusMap[STATUS] || statusMap.active;
  badgeEl.innerHTML = '<div class="badge '+st.cls+'"><span class="badge-dot"></span>'+st.label+'</div>';

  // \u2500\u2500 Volume Ring \u2500\u2500
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
    document.getElementById('volumeSub').innerHTML = '<span style="font-size:1.4rem">\u221E</span> Unlimited';
  }

  // \u2500\u2500 Time Remaining \u2500\u2500
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

  // \u2500\u2500 Connections \u2500\u2500
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
      const ua = (c.ua || 'Unknown').length > 40 ? (c.ua || 'Unknown').substring(0, 40) + '\u2026' : (c.ua || 'Unknown');
      return '<div class="conn-item">' + deviceSvg +
        '<div style="min-width:0;flex:1"><span class="conn-ip">' + (c.ip || '?') + '</span>' +
        (ua !== 'Unknown' ? '<span class="conn-ua">' + escapeHtml(ua) + '</span>' : '') +
        '</div><span class="conn-time">' + (c.time || '') + '</span></div>';
    }).join('');
  }

  // \u2500\u2500 Tab Switching (Subscription Links) \u2500\u2500
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

  // \u2500\u2500 Tab Switching (How-to) \u2500\u2500
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

  // \u2500\u2500 Copy to Clipboard \u2500\u2500
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

  // \u2500\u2500 QR Code Toggle \u2500\u2500
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

  // \u2500\u2500 How-to Collapsible \u2500\u2500
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

  // \u2500\u2500 Toast \u2500\u2500
  var toastTimer;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2000);
  }

  // \u2500\u2500 Escape HTML \u2500\u2500
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // \u2500\u2500 Animate counters on load \u2500\u2500
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
<\/script>
</body>
</html>`;

// src/sub.ts
async function handleSubscriptionPage(token, env, request) {
  const user = await getUserByUUID(env.DB, token);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  const url = new URL(request.url);
  const host = url.hostname;
  const protocol = url.protocol === "https:" ? "wss" : "ws";
  const settings = await getAllSettings(env.DB);
  const transport = settings.transport || "ws";
  const path = settings.path || "/";
  const subName = settings.subName || "Usf-Edge";
  const subPath = settings.sub_path || "s";
  const fingerprint = settings.fingerprint || "chrome";
  const proto = settings.protocol || "vless";
  const traffic = await getUserTraffic(env.DB, user.id);
  const totalUsed = user.volume_used || traffic.total;
  const volumeLimit = user.volume_limit;
  const isUnlimited = volumeLimit <= 0;
  const volumePercent = isUnlimited ? 0 : Math.min(100, totalUsed / volumeLimit * 100);
  const remaining = isUnlimited ? 0 : Math.max(0, volumeLimit - totalUsed);
  const daysLeft = daysRemaining(user.expire_date);
  const isExpired = daysLeft !== -1 && daysLeft <= 0;
  const isNever = daysLeft === -1;
  const activeConns = await countActiveConnections(env.DB, user.id);
  const connLimit = user.connection_limit;
  const isConnUnlimited = connLimit <= 0;
  let status = "active";
  if (!user.enabled) status = "disabled";
  else if (isExpired) status = "expired";
  else if (!isUnlimited && volumePercent >= 100) status = "limited";
  const baseURL = `${url.protocol}//${host}`;
  const subLink = `${baseURL}/${subPath}/${user.uuid}`;
  const subClash = `${subLink}?format=clash`;
  const subSingbox = `${subLink}?format=singbox`;
  const subV2ray = `${subLink}?format=v2ray`;
  const connections = await getActiveConnections(env.DB, user.id);
  const connectionsJSON = JSON.stringify(connections.slice(0, 5).map((c) => ({
    ip: c.ip_address,
    time: c.connected_at,
    ua: c.user_agent || "Unknown"
  })));
  let html = subscriptionHTML;
  html = html.replace(/__USERNAME__/g, user.username);
  html = html.replace(/__SUB_NAME__/g, subName);
  html = html.replace(/__SUB_LINK__/g, subLink);
  html = html.replace(/__SUB_CLASH__/g, subClash);
  html = html.replace(/__SUB_SINGBOX__/g, subSingbox);
  html = html.replace(/__SUB_V2RAY__/g, subV2ray);
  html = html.replace(/__VOLUME_USED__/g, formatBytes(totalUsed));
  html = html.replace(/__VOLUME_LIMIT__/g, isUnlimited ? "Unlimited" : formatBytes(volumeLimit));
  html = html.replace(/__VOLUME_PERCENT__/g, volumePercent.toFixed(1));
  html = html.replace(/__DAYS_REMAINING__/g, isNever ? "-1" : String(Math.max(0, daysLeft)));
  html = html.replace(/__EXPIRE_DATE__/g, isNever ? "Never" : user.expire_date ? new Date(user.expire_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Never");
  html = html.replace(/__ACTIVE_CONNS__/g, String(activeConns));
  html = html.replace(/__CONN_LIMIT__/g, isConnUnlimited ? "Unlimited" : String(connLimit));
  html = html.replace(/__STATUS__/g, status);
  html = html.replace(/__CONNECTIONS_JSON__/g, connectionsJSON);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(handleSubscriptionPage, "handleSubscriptionPage");
async function handleSubscriptionData(token, env, request) {
  const user = await getUserByUUID(env.DB, token);
  if (!user) {
    return new Response("Not found", { status: 404 });
  }
  const validation = await validateUserAccess(env.DB, user.uuid);
  if (!validation.allowed) {
    return new Response("Subscription expired or disabled", { status: 403 });
  }
  const url = new URL(request.url);
  const format = url.searchParams.get("format") || "";
  const ua = request.headers.get("User-Agent") || "";
  const host = url.hostname;
  const isTLS = url.protocol === "https:";
  const settings = await getAllSettings(env.DB);
  const proto = settings.protocol || "vless";
  const transport = settings.transport || "ws";
  const path = settings.path || "/";
  const fingerprint = settings.fingerprint || "chrome";
  const subName = settings.subName || "Usf-Edge";
  let outputFormat = format;
  if (!outputFormat) {
    const uaLower = ua.toLowerCase();
    if (uaLower.includes("clash") || uaLower.includes("mihomo") || uaLower.includes("meta")) outputFormat = "clash";
    else if (uaLower.includes("sing-box") || uaLower.includes("sfm") || uaLower.includes("sfa")) outputFormat = "singbox";
    else outputFormat = "v2ray";
  }
  const wsPath = path.startsWith("/") ? path : `/${path}`;
  const port = 443;
  if (outputFormat === "clash") {
    return generateClashConfig(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  }
  if (outputFormat === "singbox") {
    return generateSingboxConfig(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  }
  const link = generateVLESSLink(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  const b64 = btoa(link);
  const traffic = await getUserTraffic(env.DB, user.id);
  const totalUsed = user.volume_used || traffic.total;
  return new Response(b64, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${subName}.txt"`,
      "Subscription-Userinfo": `upload=${Math.floor(totalUsed / 2)}; download=${Math.floor(totalUsed / 2)}; total=${user.volume_limit > 0 ? user.volume_limit : 0}; expire=${user.expire_date ? new Date(user.expire_date).getTime() / 1e3 : 0}`,
      "Profile-Update-Interval": "6",
      "Profile-Title": subName
    }
  });
}
__name(handleSubscriptionData, "handleSubscriptionData");
function generateVLESSLink(user, host, port, proto, transport, path, fingerprint, isTLS, subName) {
  if (proto === "trojan") {
    const pass = user.uuid;
    const sni = host;
    let network = transport;
    if (transport === "ws") network = "ws";
    else if (transport === "grpc") network = "grpc";
    const params2 = new URLSearchParams({
      type: transport,
      security: "tls",
      fingerprint,
      sni,
      path
    });
    if (transport === "grpc") {
      params2.set("serviceName", "grpc");
      params2.delete("path");
    }
    return `trojan://${pass}@${host}:${port}?${params2.toString()}#${encodeURIComponent(subName + " - " + user.username)}`;
  }
  const params = new URLSearchParams({
    type: transport,
    security: "tls",
    fingerprint,
    sni: host,
    path
  });
  if (transport === "grpc") {
    params.set("serviceName", "grpc");
    params.delete("path");
  }
  return `vless://${user.uuid}@${host}:${port}?${params.toString()}#${encodeURIComponent(subName + " - " + user.username)}`;
}
__name(generateVLESSLink, "generateVLESSLink");
function generateClashConfig(user, host, port, proto, transport, path, fingerprint, isTLS, subName) {
  let proxyLines = [`- name: "${subName} - ${user.username}"`];
  if (proto === "trojan") {
    proxyLines.push(`  type: trojan`);
    proxyLines.push(`  server: ${host}`);
    proxyLines.push(`  port: ${port}`);
    proxyLines.push(`  password: "${user.uuid}"`);
  } else {
    proxyLines.push(`  type: vless`);
    proxyLines.push(`  server: ${host}`);
    proxyLines.push(`  port: ${port}`);
    proxyLines.push(`  uuid: "${user.uuid}"`);
  }
  if (isTLS) {
    proxyLines.push(`  tls: true`);
    proxyLines.push(`  servername: ${host}`);
    proxyLines.push(`  client-fingerprint: ${fingerprint}`);
  }
  if (transport === "ws") {
    proxyLines.push(`  network: ws`);
    proxyLines.push(`  ws-opts:`);
    proxyLines.push(`    path: ${path}`);
    proxyLines.push(`    headers:`);
    proxyLines.push(`      Host: ${host}`);
  } else if (transport === "grpc") {
    proxyLines.push(`  network: grpc`);
    proxyLines.push(`  grpc-opts:`);
    proxyLines.push(`    grpc-service-name: grpc`);
  }
  const proxyConfig = proxyLines.join("\n");
  const config = `proxies:
${proxyConfig}
`;
  return new Response(config, {
    headers: {
      "Content-Type": "text/yaml; charset=utf-8",
      "Content-Disposition": `attachment; filename="${subName}.yaml"`,
      "Subscription-Userinfo": `upload=0; download=0; total=${user.volume_limit > 0 ? user.volume_limit : 0}`
    }
  });
}
__name(generateClashConfig, "generateClashConfig");
function generateSingboxConfig(user, host, port, proto, transport, path, fingerprint, isTLS, subName) {
  let transportConfig = "";
  if (transport === "ws") {
    transportConfig = `
      "transport": {
        "type": "ws",
        "path": "${path}",
        "headers": {
          "Host": "${host}"
        }
      }`;
  } else if (transport === "grpc") {
    transportConfig = `
      "transport": {
        "type": "grpc",
        "service_name": "grpc"
      }`;
  }
  const tlsConfig = isTLS ? `
    "tls": {
      "enabled": true,
      "server_name": "${host}",
      "utls": {
        "enabled": true,
        "fingerprint": "${fingerprint}"
      }
    }` : "";
  let outbound = "";
  if (proto === "trojan") {
    outbound = `{
      "type": "trojan",
      "tag": "${subName} - ${user.username}",
      "server": "${host}",
      "server_port": ${port},
      "password": "${user.uuid}"${tlsConfig}${transportConfig}
    }`;
  } else {
    outbound = `{
      "type": "vless",
      "tag": "${subName} - ${user.username}",
      "server": "${host}",
      "server_port": ${port},
      "uuid": "${user.uuid}"${tlsConfig}${transportConfig}
    }`;
  }
  const config = JSON.stringify({
    outbounds: [JSON.parse(outbound)]
  }, null, 2);
  return new Response(config, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${subName}.json"`,
      "Subscription-Userinfo": `upload=0; download=0; total=${user.volume_limit > 0 ? user.volume_limit : 0}`
    }
  });
}
__name(generateSingboxConfig, "generateSingboxConfig");

// src/tunnel.ts
async function handleVLESSStream(ws, env, clientIP, ua) {
  let ctx = null;
  try {
    const firstMessage = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timeout")), 15e3);
      ws.addEventListener("message", (event) => {
        clearTimeout(timeout);
        const data = event.data instanceof ArrayBuffer ? new Uint8Array(event.data) : new TextEncoder().encode(event.data);
        resolve(data);
      }, { once: true });
      ws.addEventListener("close", () => {
        clearTimeout(timeout);
        reject(new Error("closed"));
      }, { once: true });
    });
    if (firstMessage.length < 50) {
      ws.close(1002, "Bad header");
      return;
    }
    let offset = 0;
    offset++;
    const uuidStr = bytesToUUID(firstMessage.slice(offset, offset + 16));
    offset += 16;
    const validation = await validateUserAccess(env.DB, uuidStr);
    if (!validation.allowed) {
      ws.close(1002, validation.reason);
      return;
    }
    const user = validation.user;
    const connId = await addActiveConnection(env.DB, user.id, clientIP, ua);
    ctx = { env, userId: user.id, connId, upBytes: 0, downBytes: 0, ws };
    const addLen = firstMessage[offset++];
    offset += addLen;
    offset++;
    const destType = firstMessage[offset++];
    let destAddr;
    let destPort;
    if (destType === 1) {
      destAddr = `${firstMessage[offset]}.${firstMessage[offset + 1]}.${firstMessage[offset + 2]}.${firstMessage[offset + 3]}`;
      offset += 4;
    } else if (destType === 2) {
      const len = firstMessage[offset++];
      destAddr = new TextDecoder().decode(firstMessage.slice(offset, offset + len));
      offset += len;
    } else if (destType === 3) {
      const parts = [];
      for (let i = 0; i < 8; i++) parts.push((firstMessage[offset + i * 2] << 8 | firstMessage[offset + i * 2 + 1]).toString(16));
      destAddr = parts.join(":");
      offset += 16;
    } else {
      ws.close(1002, "Bad addr");
      return;
    }
    destPort = firstMessage[offset] << 8 | firstMessage[offset + 1];
    offset += 2;
    const remaining = firstMessage.slice(offset);
    const tcpConn = connect({ hostname: destAddr, port: destPort });
    const writer = tcpConn.writable.getWriter();
    const reader = tcpConn.readable.getReader();
    if (remaining.length > 0) {
      ctx.upBytes += remaining.length;
      await writer.write(remaining);
    }
    ws.addEventListener("message", async (ev) => {
      try {
        const d = ev.data instanceof ArrayBuffer ? new Uint8Array(ev.data) : new TextEncoder().encode(ev.data);
        ctx.upBytes += d.byteLength;
        await writer.write(d);
      } catch (e) {
        try {
          ws.close();
        } catch (ex) {
        }
      }
    });
    const cleanup = /* @__PURE__ */ __name(async () => {
      try {
        writer.close();
        reader.cancel();
      } catch (e) {
      }
      if (ctx) {
        await addUserTraffic(env.DB, ctx.userId, ctx.upBytes, ctx.downBytes).catch(() => {
        });
        await removeActiveConnection(env.DB, ctx.connId).catch(() => {
        });
      }
    }, "cleanup");
    ws.addEventListener("close", cleanup);
    ws.addEventListener("error", cleanup);
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      ctx.downBytes += value.byteLength;
      try {
        ws.send(value);
      } catch (e) {
        break;
      }
    }
    ws.close();
    await cleanup();
  } catch (e) {
    try {
      ws.close();
    } catch (ex) {
    }
    if (ctx) {
      await addUserTraffic(env.DB, ctx.userId, ctx.upBytes, ctx.downBytes).catch(() => {
      });
      await removeActiveConnection(env.DB, ctx.connId).catch(() => {
      });
    }
  }
}
__name(handleVLESSStream, "handleVLESSStream");
async function handleTunnel(request, env) {
  if (request.headers.get("Upgrade") !== "websocket") return null;
  const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
  const ua = request.headers.get("User-Agent") || "";
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  server.accept();
  handleVLESSStream(server, env, clientIP, ua);
  return new Response(null, { status: 101, webSocket: client });
}
__name(handleTunnel, "handleTunnel");

// src/index.ts
var index_default = {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      let adminPath = "usf-admin";
      let subPath = "s";
      try {
        const ap = await getSetting(env.DB, "admin_path");
        if (ap) adminPath = ap;
        const sp = await getSetting(env.DB, "sub_path");
        if (sp) subPath = sp;
      } catch (e) {
      }
      const pathname = url.pathname;
      if (request.headers.get("Upgrade") === "websocket") {
        return handleTunnel(request, env);
      }
      if (pathname === `/${adminPath}` || pathname === `/${adminPath}/`) {
        const html = adminHTML.replace(/__ADMIN_API__/g, `/${adminPath}`);
        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
      if (pathname.startsWith(`/${adminPath}/api/`)) {
        const apiPath = pathname.slice(`/${adminPath}`.length);
        return handleAdminAPI(request, env, apiPath);
      }
      const subRegex = new RegExp(`^/${subPath}/([a-f0-9-]{36})$`);
      const subMatch = pathname.match(subRegex);
      if (subMatch) {
        if (url.searchParams.has("format")) {
          return handleSubscriptionData(subMatch[1], env, request);
        }
        return handleSubscriptionPage(subMatch[1], env, request);
      }
      if (pathname === "/version") {
        return new Response(JSON.stringify({ name: "Usf-Edge", version: "1.0.0" }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(getFakePageHTML(), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message || "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
