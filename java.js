const PASSWORD = "rizal"; // Ganti dengan password yang diinginkan

function login() {
  const passwordInput = document.getElementById("password").value;
  if (passwordInput === PASSWORD) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
  } else {
    alert("Password salah!");
  }
}

function tambahHutang() {
  const kode = document.getElementById("kode").value;
  const nama = document.getElementById("nama").value;
  const jumlah = document.getElementById("jumlah").value;
  const tanggal = document.getElementById("tanggal").value;
  const namaBarang = document.getElementById("namaBarang").value;

  if (kode && nama && jumlah && tanggal && namaBarang) {
    const hutang = { kode, nama, jumlah, tanggal, namaBarang };
    let daftarHutang = JSON.parse(localStorage.getItem("daftarHutang")) || [];
    daftarHutang.push(hutang);
    localStorage.setItem("daftarHutang", JSON.stringify(daftarHutang));
    tampilkanHutang();
    document.getElementById("kode").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("jumlah").value = "";
    document.getElementById("tanggal").value = "";
    document.getElementById("namaBarang").value = "";
  } else {
    alert("Semua kolom harus diisi!");
  }
}

function tampilkanHutang() {
  const daftarHutang = JSON.parse(localStorage.getItem("daftarHutang")) || [];
  const daftarHutangElement = document.getElementById("daftar-hutang");
  daftarHutangElement.innerHTML = "";

  daftarHutang.forEach((hutang, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${hutang.kode}</td>
                        <td>${hutang.nama}</td>
                        <td>${hutang.jumlah}</td>
                        <td>${hutang.tanggal}</td>
                        <td>${hutang.namaBarang}</td>
                        <td>
                            <button onclick="editHutang(${index})">Edit</button>
                            <button onclick="hapusHutang(${index})">Hapus</button>
                        </td>`;
    daftarHutangElement.appendChild(tr);
  });
}

function editHutang(index) {
  if (confirm("Masukkan password untuk mengedit:")) {
    const password = prompt("Password:");
    if (password === PASSWORD) {
      const daftarHutang =
        JSON.parse(localStorage.getItem("daftarHutang")) || [];
      const hutang = daftarHutang[index];
      const kode = prompt("Edit Kode:", hutang.kode);
      const nama = prompt("Edit Nama:", hutang.nama);
      const jumlah = prompt("Edit Jumlah:", hutang.jumlah);
      const tanggal = prompt("Edit Tanggal:", hutang.tanggal);
      const namaBarang = prompt("Edit Nama Barang:", hutang.namaBarang);

      if (kode && nama && jumlah && tanggal && namaBarang) {
        daftarHutang[index] = { kode, nama, jumlah, tanggal, namaBarang };
        localStorage.setItem("daftarHutang", JSON.stringify(daftarHutang));
        tampilkanHutang();
      }
    } else {
      alert("Password salah!");
    }
  }
}

function hapusHutang(index) {
  if (confirm("Masukkan password untuk menghapus:")) {
    const password = prompt("Password:");
    if (password === PASSWORD) {
      let daftarHutang = JSON.parse(localStorage.getItem("daftarHutang")) || [];
      daftarHutang.splice(index, 1);
      localStorage.setItem("daftarHutang", JSON.stringify(daftarHutang));
      tampilkanHutang();
    } else {
      alert("Password salah!");
    }
  }
}

function cariHutang() {
  const search = document.getElementById("search").value.toLowerCase();
  const daftarHutang = JSON.parse(localStorage.getItem("daftarHutang")) || [];
  const daftarHutangElement = document.getElementById("daftar-hutang");
  daftarHutangElement.innerHTML = "";

  daftarHutang
    .filter((hutang) => hutang.nama.toLowerCase().includes(search))
    .forEach((hutang, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${hutang.kode}</td>
                        <td>${hutang.nama}</td>
                        <td>${hutang.jumlah}</td>
                        <td>${hutang.tanggal}</td>
                        <td>${hutang.namaBarang}</td>
                        <td>
                            <button onclick="editHutang(${index})">Edit</button>
                            <button onclick="hapusHutang(${index})">Hapus</button>
                        </td>`;
      daftarHutangElement.appendChild(tr);
    });
}

// Tampilkan hutang saat halaman pertama kali dibuka
tampilkanHutang();
