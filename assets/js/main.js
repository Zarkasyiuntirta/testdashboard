// assets/js/main.js - render table, submit, revisi using PHP+JSON endpoints
document.addEventListener('DOMContentLoaded', async () => {
  // simple auth guard
  if(!localStorage.getItem('siswa_token')){
    window.location.href = 'login.html';
    return;
  }

  const tableBody = document.getElementById('tableBody');
  const tanggalInput = document.getElementById('tanggalPertemuan');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnRevisi = document.getElementById('btnRevisi');
  const msg = document.getElementById('msg');

  // set default date today
  const today = new Date().toISOString().slice(0,10);
  tanggalInput.value = today;

  // load students from API (data/siswa.json)
  async function loadStudents(){
    try{
      const res = await fetch('api/getData.php?file=siswa');
      const data = await res.json();
      return data.data || [];
    }catch(e){
      console.error(e);
      return [];
    }
  }

  const students = await loadStudents();
  // initialize attendance
  const attendance = students.map((s,i) => ({no:i+1,nama:s.nama,nim:s.nim,status:'Hadir'}));

  function render(){
    tableBody.innerHTML = '';
    attendance.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.no}</td>
        <td>${r.nama}</td>
        <td>${r.nim}</td>
        <td>
          <select data-nim="${r.nim}">
            <option${r.status==='Hadir' ? ' selected' : ''}>Hadir</option>
            <option${r.status==='Izin' ? ' selected' : ''}>Izin</option>
            <option${r.status==='Sakit' ? ' selected' : ''}>Sakit</option>
            <option${r.status==='Tanpa Keterangan' ? ' selected' : ''}>Tanpa Keterangan</option>
          </select>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const nim = e.target.dataset.nim;
        const item = attendance.find(a=>a.nim===nim);
        if(item) item.status = e.target.value;
      });
    });
  }

  render();

  btnSubmit.addEventListener('click', async () => {
    const tanggal = tanggalInput.value;
    if(!tanggal){ msg.textContent = 'Pilih tanggal pertemuan.'; return; }
    // send to api saveAttendance.php
    try{
      const payload = {tanggal, data: attendance};
      const res = await fetch('api/postData.php?op=attendance', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const j = await res.json();
      if(j.success){
        msg.textContent = 'Data berhasil disimpan untuk ' + tanggal;
      } else {
        msg.textContent = 'Gagal menyimpan: ' + (j.message || '');
      }
    }catch(e){
      msg.textContent = 'Error: ' + e.message;
    }
  });

  btnRevisi.addEventListener('click', () => {
    msg.textContent = 'Mode revisi aktif — ubah status lalu tekan Submit.';
  });

  // logout
  const btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('siswa_token');
    window.location.href = 'login.html';
  });
});
