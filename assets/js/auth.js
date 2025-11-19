// assets/js/auth.js - simple client-side demo auth
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnLogin');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMsg');
    if(u === 'ppkn' && p === '123'){
      // set token (demo)
      localStorage.setItem('siswa_token', 'demo-token');
      window.location.href = 'dashboard.html';
    } else {
      msg.textContent = 'Username atau password salah — coba ppkn / 123';
    }
  });
});
