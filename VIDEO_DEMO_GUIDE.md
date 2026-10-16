# Panduan & Naskah Video Demonstrasi PTS (± 8 Menit)

**Identitas Mahasiswa:**
- **Nama Mahasiswa:** Fitri
- **NIM:** 2440304027
- **Tiga Digit Terakhir NIM:** 027
- **Nama Aplikasi:** Velora — Interactive Product Dashboard
- **Mata Kuliah:** Pemrograman Web

Panduan ini disusun secara runtut detik demi detik untuk membantu Anda merekam video demonstrasi berdurasi sekitar 8 menit sesuai ketentuan soal PTS.

---

## Ringkasan Alur Waktu (Timeline)

| Waktu | Durasi | Fokus Presentasi | Tindakan Visual Layar |
|:---|:---:|:---|:---|
| **00:00 – 00:30** | 30 dtk | Pembukaan & Identitas Mahasiswa | Kamera aktif menampilkan wajah penuh Anda |
| **00:30 – 01:15** | 45 dtk | Pengenalan Aplikasi & Perhitungan Variasi NIM | Beralih ke layar penuh aplikasi Velora |
| **01:15 – 02:15** | 60 dtk | Demonstrasi Katalog & 4 Kartu Statistik | Scroll ke bagian Overview & Katalog |
| **02:15 – 03:15** | 60 dtk | Demonstrasi Fitur Favorit & Persistensi localStorage | Klik bookmark hati, filter tab favorit, refresh browser |
| **03:15 – 04:15** | 60 dtk | Demonstrasi Form Catatan & Validasi $\ge 30$ Karakter | Uji input gagal ($<30$ char) dan input valid ($\ge 30$ char) |
| **04:15 – 05:15** | 60 dtk | Demonstrasi Loading, Error, Retry, & Waktu Muat Terakhir | Uji tombol Retry dan sorot indikator timestamp |
| **05:15 – 06:15** | 60 dtk | Demonstrasi Desain Responsif (Desktop & Mobile) | Buka Device Mode di DevTools (1024px $\to$ 768px $\to$ 375px) |
| **06:15 – 07:15** | 60 dtk | Inspeksi DevTools (Network & Application Tab) | Tab Network (HTTP 200 JSON) & Tab Application (localStorage) |
| **07:15 – 08:00** | 45 dtk | Git History & Penjelasan Kode Baris demi Baris | Terminal `git log --oneline` & file `js/app.js` |

---

## Naskah Lengkap & Petunjuk Teknis

### Bagian 1: Pembukaan & Identitas Mahasiswa (00:00 – 00:30)
> **Visual:** Kamera menyala, perlihatkan wajah Anda dengan pencahayaan jelas dan pakaian rapi.

**Contoh Kalimat:**  
*"Halo, selamat pagi/siang kepada Bapak/Ibu Dosen pengampu mata kuliah Pemrograman Web. Perkenalkan, nama saya **Fitri**, dengan NIM **2440304027**. Pada kesempatan kali ini, saya akan mendemonstrasikan hasil pengerjaan proyek Penilaian Tengah Semester (PTS) Pemrograman Web Individual saya, yaitu aplikasi dashboard interaktif bernama **Velora**."*

---

### Bagian 2: Pengenalan Aplikasi & Perhitungan Variasi NIM (00:30 – 01:15)
> **Visual:** Alihkan rekaman ke layar peramban (*screen share*) menampilkan halaman utama Velora.

**Contoh Kalimat:**  
*"Aplikasi Velora ini dirancang khusus berdasarkan tiga digit terakhir NIM saya, yaitu **027**, yang menghasilkan ketentuan variasi sebagai berikut:*  
- *Nilai $X = 0$, yaitu dataset wajib bersumber dari REST API **Products** di endpoint `https://dummyjson.com/products?limit=0`.*
- *Nilai $Y = 2$, yaitu implementasi fitur Bookmark atau Favorit menggunakan `localStorage`.*  
- *Nilai $Z = 7$, yaitu formulir catatan kurasi produk dengan validasi minimal 30 karakter bersih.*  
- *Serta total $S = 0 + 2 + 7 = 9$, sehingga $C = 9 \pmod 4 = 1$, yang menghasilkan tantangan khusus berupa tombol **Retry** saat fetch gagal dan penampil **waktu terakhir data berhasil dimuat**.*  

*Konsep visual Velora menggunakan gaya Soft Editorial Catalog, warna putih-lavender, dan tipografi serif-sans yang ringkas."*

---

### Bagian 3: Demonstrasi Katalog & 4 Kartu Statistik (01:15 – 02:15)
> **Visual:** Sorot bagian ringkasan statistik (Overview) kemudian gulir ke katalog produk.

**Contoh Kalimat:**  
*"Di bagian atas dashboard, kita dapat melihat 4 kartu statistik yang dihitung secara otomatis menggunakan JavaScript tingkat lanjut dari payload API asli, bukan angka hardcoded:*  
1. ***Total Produk:** Jumlah mengikuti panjang array hasil API; saat pemeriksaan terakhir, 194 produk diterima.*
2. ***Rata-rata Harga:** Dihitung menggunakan `reduce()` dari seluruh produk dan ditampilkan dalam format Rupiah dengan kurs acuan.*
3. ***Produk Termahal:** Ditemukan dengan `reduce()`; saat pemeriksaan terakhir, Durango SXT RWD menjadi produk tertinggi.*
4. ***Kategori Unik:** Dihitung dengan `map()` dan `Set()`; saat pemeriksaan terakhir terdapat 24 kategori.*

*Di bawahnya terdapat katalog responsif dengan gambar API, fallback gambar, nama, kategori, harga Rupiah, dan tombol hati. Kategori, pencarian, pengurutan, serta tampilan favorit tetap bekerja pada seluruh data."*

---

### Bagian 4: Demonstrasi Favorit & Persistensi localStorage (02:15 – 03:15)
> **Visual:** Klik tombol ikon hati pada 2 produk. Tunjukkan badge counter berubah. Beralih ke tab 'Favorit Saya' dan scroll ke section `#favorites`. Lakukan refresh browser.

**Contoh Kalimat:**  
*"Sekarang kita demonstrasikan fitur wajib digit $Y = 2$, yaitu Bookmark/Favorit.*  
*Ketika saya mengklik ikon hati pada kartu produk, ikon menjadi terisi lavender, muncul notifikasi, dan counter favorit bertambah.*
*Jika saya mengklik tab 'Favorit Saya', katalog hanya menampilkan produk yang telah saya bookmark. Di bagian bawah juga terdapat section khusus 'Daftar Produk Favorit Tersimpan'.*  
*Sekarang, mari kita buktikan persistensinya: saya tekan tombol **Refresh (F5)** pada browser. Dapat kita lihat, setelah halaman dimuat ulang, status produk favorit tetap tersimpan rapi karena ID produk disimpan di `localStorage` dengan kunci `velora_favorites` tanpa mengambil ulang API secara berulang."*

---

### Bagian 5: Demonstrasi Form Catatan & Validasi Minimal 30 Karakter (03:15 – 04:15)
> **Visual:** Arahkan layar ke bagian 'Form Catatan Kurasi Produk' (`#notes`).

**Contoh Kalimat:**  
*"Selanjutnya adalah fitur wajib digit $Z = 7$, yaitu formulir catatan kurasi dengan validasi minimal 30 karakter bersih.*  
*Dropdown produk ini otomatis mengambil daftar nama produk dari data API.*  
*Pertama, mari kita coba kasus **input tidak valid**: saya pilih satu produk, lalu saya ketik kalimat pendek: 'Barang ini bagus'. Perhatikan indikator counter karakter di kanan atas: tertulis 16 dari 30 minimal dengan indikator merah. Saat saya klik 'Simpan Catatan Produk', sistem menolak input tersebut dan memunculkan kotak peringatan bertuliskan: Catatan harus berisi minimal 30 karakter setelah spasi dibersihkan.*  
*Kedua, mari kita coba kasus **input valid**: saya ketik ulasan mendalam: 'Produk ini memiliki kualitas material yang sangat halus dan cocok untuk rekomendasi katalog unggulan kami.' Panjangnya kini 88 karakter dan counter berubah hijau. Ketika saya klik 'Simpan', muncul banner hijau bertanda sukses, form dibersihkan, dan ulasan langsung tercatat di tabel riwayat sebelah kanan."*

---

### Bagian 6: Demonstrasi Loading, Error, Retry, & Waktu Muat Terakhir (04:15 – 05:15)
> **Visual:** Sorot status bar di bawah hero section. Tunjukkan teks waktu terakhir dimuat.

**Contoh Kalimat:**  
*"Sekarang kita masuk ke pembuktian Challenge $C = 1$.*  
*Di bagian status bar, terdapat informasi 'Waktu Terakhir Data Berhasil Dimuat'. Waktu ini dicatat secara dinamis menggunakan objek `Date()` JavaScript pada saat parsing data JSON berhasil, berformat waktu lokal Indonesia lengkap dengan tanggal dan jam.*  
*Bila koneksi internet terputus atau server API mengalami gangguan, aplikasi tidak akan crash. Indikator status akan berubah merah menampilkan pesan kegagalan, dan tombol **Coba Lagi (Retry)** akan muncul.*  
*Yang terpenting: waktu keberhasilan sebelumnya **tidak akan dihapus atau diganti**, dan data favorit di localStorage tetap aman. Ketika tombol Retry diklik setelah koneksi kembali, sistem menampilkan indikator loading dan berhasil memuat ulang katalog secara mulus."*

---

### Bagian 7: Demonstrasi Desain Responsif Desktop & Mobile (05:15 – 06:15)
> **Visual:** Buka DevTools (`Ctrl + Shift + I` atau `F12`), aktifkan Toggle Device Toolbar (`Ctrl + Shift + M`).

**Contoh Kalimat:**  
*"Mari kita uji responsivitas antarmuka Velora pada berbagai ukuran layar:*  
- *Pada tampilan **Desktop** di atas 1024px, katalog tertata dalam 3 hingga 4 kolom grid yang lega.*  
- *Ketika saya ubah ke ukuran **Tablet (768px)**, statistik berubah menjadi 2 kolom, dan navigasi menyesuaikan secara fleksibel.*  
- *Dan ketika saya ubah ke ukuran **Mobile (375px atau 480px)**, kartu produk dan formulir beralih menjadi 1 kolom vertikal yang ramah sentuhan jempol.*  
*Dapat kita perhatikan: tidak ada horizontal scrolling, ukuran teks tetap nyaman dibaca, dan tombol-tombol memiliki area sentuh yang ergonomis."*

---

### Bagian 8: Inspeksi Developer Tools (Network & Application) (06:15 – 07:15)
> **Visual:** DevTools tetap terbuka. Klik tab **Network**, lalu klik tab **Application**.

**Contoh Kalimat:**  
*"Sekarang kita buktikan implementasi teknis di balik layar:*  
*1. Pada tab **Network**, request HTTP GET menuju `https://dummyjson.com/products?limit=0`; periksa status HTTP serta jumlah aktual pada `total` dan panjang array `products`.*
*2. Pada tab **Application**, di bagian **Local Storage**, kita dapat melihat dua kunci utama:*  
   - *`velora_favorites`: berisi array ID produk yang kita favoritkan.*  
   - *`velora_notes`: berisi array objek catatan yang baru saja kita simpan.*  
*Hal ini membuktikan bahwa data dikelola secara murni di peramban tanpa backend tambahan."*

---

### Bagian 9: Git History & Penjelasan Kode Baris demi Baris (07:15 – 08:00)
> **Visual:** Buka terminal/VS Code, jalankan `git log --oneline`, lalu buka file `js/app.js` pada fungsi `calculateAndRenderStatistics`.

**Contoh Kalimat:**  
*"Sebagai penutup, mari kita lihat riwayat commit Git pada repository ini.*  
*(Jalankan perintah `git log --oneline`)*  
*Dapat dilihat seluruh proses pengembangan dilakukan secara bertahap dan bermakna: mulai dari inisialisasi struktur, layout semantik, styling tema minimalis responsif, endpoint DummyJSON, kalkulasi statistik, persistensi favorit, hingga validasi formulir catatan.*  

*Di file `js/app.js`, fungsi `calculateAndRenderStatistics` menggunakan metode `reduce()` untuk menjumlahkan harga:*  
`const totalPrice = list.reduce((acc, item) => acc + (Number(item.price) || 0), 0);`  
*Kemudian dibagi dengan `list.length` dengan proteksi pembagian nol agar tidak terjadi error `NaN`.*  

*Demikian presentasi demonstrasi aplikasi Velora untuk memenuhi tugas PTS Pemrograman Web. Terima kasih atas perhatian Bapak/Ibu Dosen."*

---

## Tips Sukses Perekaman:
1. Rekam menggunakan software seperti **OBS Studio**, **Loom**, atau bawaan Windows Game Bar (`Win + G`).
2. Pastikan mikrofon bersih dari suara bising latar belakang.
3. Jaga tempo bicara agar tidak terlalu cepat dan pas dengan durasi 8 menit.
