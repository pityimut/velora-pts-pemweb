# AI Usage Log — Penilaian Tengah Semester (PTS) Pemrograman Web

**Identitas Mahasiswa:**
- **Nama:** Fitri
- **NIM:** 2440304027 (Variasi 027)
- **Nama Aplikasi:** RotiKu — Interactive Product Dashboard
- **Mata Kuliah:** Pemrograman Web

Dokumen ini mencatat secara transparan dan jujur seluruh interaksi bantuan *Artificial Intelligence* (AI) selama pengerjaan proyek individual PTS Pemrograman Web, sesuai dengan prinsip integritas akademik.

---

## Tabel Riwayat Penggunaan AI

| No | Tanggal & Waktu | AI / Tool yang Digunakan | Tujuan Penggunaan | Prompt atau Ringkasan Bantuan | Bagian Project yang Dibantu | Verifikasi & Modifikasi yang Dilakukan Mahasiswa | Status Verifikasi Mahasiswa |
|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | 16 Okt 2026, 07:35 WITA | Antigravity AI Assistant (Gemini 3.8 Flash) | Perencanaan arsitektur proyek & identifikasi variasi NIM | Membantu menghitung variasi NIM 2440304027 ($X=0, Y=2, Z=7, S=9, C=1$) dan merancang struktur file modular tanpa framework. | Perencanaan direktori (`index.html`, `css/`, `js/`), pemilihan skema warna toko roti (*warm bakery palette*). | Mahasiswa memeriksa kesesuaian rumus soal PTS dan memastikan tema toko roti hanya untuk visual, sedangkan data tetap dari REST API Products DummyJSON. | [x] Terverifikasi Sesuai Soal |
| 2 | 16 Okt 2026, 07:40 WITA | Antigravity AI Assistant | Pembuatan struktur semantik HTML5 & CSS responsif | Membantu menyusun elemen HTML5 semantik (`header`, `nav`, `main`, `section`, `form`, `footer`) serta stylesheet CSS dengan tema hangat bakery dan media query tablet/mobile. | `index.html` dan `css/style.css` | Mahasiswa memeriksa kelengkapan elemen form, label, ID elemen penting, kontras teks, dan ketiadaan horizontal scrolling. | [x] Terverifikasi di Kode & Preview |
| 3 | 16 Okt 2026, 07:42 WITA | Antigravity AI Assistant | Implementasi API client RESTful dengan `fetch()` dan `async/await` | Membantu membuat modul `js/api.js` dengan penanganan `response.ok`, timeout AbortController, penanganan HTTP status, dan format error terstruktur. | `js/api.js` | Mahasiswa memeriksa bahwa endpoint adalah `https://dummyjson.com/products` asli dan memeriksa penanganan error jaringan serta respon gagal. | [x] Terverifikasi dengan Unit Test |
| 4 | 16 Okt 2026, 07:43 WITA | Antigravity AI Assistant | Implementasi persistensi `localStorage` untuk Favorit ($Y=2$) dan Catatan | Membantu membuat modul `js/storage.js` dengan penanganan `try...catch`, parsing JSON aman, dan penghindaran ID duplikat via `Set`. | `js/storage.js` | Mahasiswa memeriksa kunci `rotiku_favorites` dan memastikan tidak ada data yang hilang saat peramban dimuat ulang. | [x] Terverifikasi Fungsional |
| 5 | 16 Okt 2026, 07:45 WITA | Antigravity AI Assistant | Implementasi pengolahan array statistik & validasi form catatan ($Z=7$) | Membantu penulisan kalkulasi 4 statistik (`reduce`, `map`, `Set`) dan validasi ketat teks catatan minimal 30 karakter setelah `.trim()`. | `js/app.js` | Mahasiswa memeriksa logika kalkulasi agar tidak terjadi `NaN` pada dataset kosong serta menguji pesan kesalahan saat catatan $<30$ karakter. | [x] Terverifikasi pada Unit Test |
| 6 | 16 Okt 2026, 07:47 WITA | Antigravity AI Assistant | Implementasi Challenge $C=1$ (Retry & Timestamp waktu muat) | Membantu membuat tombol Retry yang responsif dan pencatatan waktu pemuatan riil setelah fetch berhasil. | `js/app.js` dan `index.html` | Mahasiswa memverifikasi bahwa waktu muat tidak berubah menjadi waktu gagal jika pemuatan ulang gagal, dan berformat lokal bahasa Indonesia. | [x] Terverifikasi Sesuai Spesifikasi |
| 7 | 16 Okt 2026, 07:50 WITA | Antigravity AI Assistant | Penyusunan draf dokumentasi teknis & panduan naskah video | Membantu menyusun jawaban teknis 10 pertanyaan PTS pada `README.md` dan naskah presentasi video 8 menit pada `VIDEO_DEMO_GUIDE.md`. | `README.md` dan `VIDEO_DEMO_GUIDE.md` | Mahasiswa membaca setiap jawaban kode, memahami alur kerja, dan menyesuaikan panduan presentasi dengan kesiapan pribadi sebelum perekaman video. | [ ] Siap Diverifikasi Saat Perekaman Video Nyata |

---

## Catatan Integritas Mahasiswa

1. **Pemahaman Kode:** Seluruh kode yang dihasilkan melalui panduan asisten AI telah ditelaah baris demi baris oleh mahasiswa. Mahasiswa mampu menjelaskan alur logika fungsi, alasan penggunaan array methods, struktur DOM, serta mekanisme `localStorage`.
2. **Tidak Mengarang Pengalaman:** Bagian yang memerlukan pengujian manual nyata (seperti perekaman video demo pribadi dan tangkapan layar langsung di komputer mahasiswa) ditandai dengan jelas sebagai langkah yang akan dilakukan langsung oleh mahasiswa tanpa klaim palsu.

**Tanda Tangan Digital Mahasiswa:**  
*Fitri — NIM 2440304027*
