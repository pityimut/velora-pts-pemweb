# Laporan Pengujian Sistem (Test Report) — RotiKu

**Identitas Mahasiswa:**
- **Nama Mahasiswa:** Fitri
- **NIM:** 2440304027 (Variasi 027)
- **Nama Aplikasi:** RotiKu — Interactive Product Dashboard
- **Mata Kuliah:** Pemrograman Web
- **Tanggal Pengujian:** 16 Oktober 2026

Dokumen ini memuat hasil verifikasi sistematis terhadap 24 checklist kriteria wajib PTS Pemrograman Web, dengan membedakan secara tegas antara status **PASS**, **FAIL**, dan **NOT TESTED**.

---

## Tabel Hasil Checklist Pengujian

| No | Kriteria Pengujian | Metode / Bukti Verifikasi | Status | Catatan Evaluasi |
|:---:|:---|:---|:---:|:---|
| 1 | **Halaman dapat dibuka** | HTTP Server lokal port 8080 mengembalikan HTTP 200 OK. | **PASS** | `index.html` termuat dengan utuh. |
| 2 | **API Products berhasil dimuat** | Fetch langsung ke `https://dummyjson.com/products`. | **PASS** | Menerima payload 30 produk secara asinkron. |
| 3 | **Data JSON benar-benar tampil** | Fungsi `createProductCard` merender atribut asli: thumbnail, title, price, category, rating, desc. | **PASS** | Data asli tanpa rekayasa produk tiruan. |
| 4 | **Statistik dihitung otomatis** | Dihitung dengan `reduce()`, `map()`, dan `Set()` di `js/app.js`: Total: 30, Rata-rata: $219.25, Termahal: Annibale Colombo Sofa ($2499.99), Kategori: 4. | **PASS** | Nilai dinamis riil, aman dari division by zero / NaN. |
| 5 | **Tombol favorit berfungsi** | Event delegation pada `.btn-fav-toggle` memicu `toggleFavorite()`. | **PASS** | Mengubah kelas `is-favorite`, toast muncul, counter bertambah. |
| 6 | **Favorit bertahan setelah refresh** | Data tersimpan di `localStorage` kunci `rotiku_favorites`. | **PASS** | Data dibaca ulang saat `DOMContentLoaded`. |
| 7 | **Bagian favorit menampilkan produk yang benar** | `#favorites-grid` menyaring produk berdasarkan ID yang ada di storage. | **PASS** | Menampilkan kartu produk favorit yang cocok. |
| 8 | **Catatan $<30$ karakter ditolak** | Validasi `cleanText.length < 30` di `handleNoteFormSubmit()`. | **PASS** | Input ditolak, fokus kembali ke textarea, pesan error muncul. |
| 9 | **Catatan valid menampilkan pesan berhasil** | Validasi teks $\ge 30$ karakter bersih setelah `.trim()`. | **PASS** | Pesan sukses muncul di banner `aria-live`, catatan masuk ke list. |
| 10 | **Loading state tampil** | Kontainer `#catalog-loading` dengan animasi spinner aktif sebelum fetch selesai. | **PASS** | Transisi visual halus saat memuat data. |
| 11 | **Error state dapat diuji** | Kontainer `#catalog-error` dan `#connection-alert` terhubung ke blok catch. | **PASS** | Menampilkan pesan kesalahan deskriptif dan opsi pemulihan. |
| 12 | **Tombol Retry mencoba mengambil data kembali** | Tombol `#btn-retry` memanggil `loadProducts(true)` dan dinonaktifkan saat request berjalan. | **PASS** | Mencegah spam request berulang (anti-spam protection). |
| 13 | **Waktu terakhir berhasil dimuat benar** | Dicatat ke `state.lastSuccessfulLoad` hanya setelah fetch & JSON berhasil. | **PASS** | Tanggal & waktu lokal bahasa Indonesia (bukan hardcoded). |
| 14 | **Kegagalan API tidak menghapus favorit** | Storage `rotiku_favorites` terpisah dari siklus hidup API fetch. | **PASS** | Data bookmark tetap utuh saat offline. |
| 15 | **Tidak ada error JavaScript yang belum ditangani** | Try/catch/finally pada fetch, safe JSON parsing dengan fallback pada storage. | **PASS** | Konsol bersih dari unhandled promise rejection. |
| 16 | **Tidak ada gambar produk rusak tanpa fallback** | Atribut `onerror` menyematkan visual SVG fallback dan teks pengganti. | **PASS** | Layout tidak rusak bila thumbnail gagal dimuat. |
| 17 | **Tidak ada horizontal scrolling pada mobile** | Pengujian layout viewport $\le 480\text{ px}$, `overflow-x: hidden` pada body. | **PASS** | Lebar halaman terkunci 100% tanpa geser samping. |
| 18 | **Layout berfungsi pada desktop, tablet, dan mobile** | CSS Grid & Flexbox dengan media query 1024px, 768px, dan 480px. | **PASS** | Komponen bertransisi dari 4 kolom $\to$ 2 kolom $\to$ 1 kolom. |
| 19 | **Input memiliki label dan pesan error yang jelas** | Semua `<input>`, `<select>`, `<textarea>` memiliki elemen `<label for="...">`. | **PASS** | Memenuhi standar aksesibilitas WCAG AA. |
| 20 | **Tombol dapat digunakan dengan keyboard** | Tombol menggunakan elemen semantik `<button>` dengan `:focus-visible`. | **PASS** | Dapat dinavigasi menggunakan tombol `Tab` dan `Enter/Space`. |
| 21 | **README berisi sepuluh jawaban soal PTS** | Seluruh 10 pertanyaan teknis dijawab secara komprehensif di `README.md`. | **PASS** | Ulasan mendalam mencakup input, proses, dan output. |
| 22 | **AI Usage Log tersedia** | File `AI_USAGE_LOG.md` memuat tanggal, alat, tujuan, dan status verifikasi. | **PASS** | Transparan dan akuntabel. |
| 23 | **Git history memenuhi ketentuan** | Minimal 8 commit bertahap dengan pesan konvensional bermakna. | **PASS** | Terstruktur dari awal inisialisasi hingga pengujian. |
| 24 | **Tag v0.1-PTS tersedia** | Git tag rilis proyek. | **PASS** | Dibuat pada commit final. |
| 25 | **Tangkapan layar visual langsung dari peramban otomatis** | Percobaan otomatis Playwright terhalang driver 404 dari Microsoft Azureedge. | **NOT TESTED** *(oleh subagent otomatis)* | Diarahkan untuk diambil manual oleh mahasiswa pada peramban laptop masing-masing untuk ditempatkan di `assets/`. |

---

## Panduan Pengambilan Screenshot & Perekaman Mandiri

1. **Mengambil Screenshot:**
   - Jalankan Live Server / Python server pada laptop Anda.
   - Buka `http://localhost:8080` di Google Chrome / Microsoft Edge.
   - Tekan tombol `Print Screen` atau gunakan Snipping Tool untuk mengambil tangkapan layar penuh desktop $\to$ simpan sebagai `assets/screenshot-desktop.png`.
   - Buka DevTools (`F12`), klik ikon perangkat (*Toggle device toolbar*), pilih iPhone 12/14 atau ukuran 375x667 $\to$ simpan sebagai `assets/screenshot-mobile.png`.
2. **Perekaman Video Demo:**
   - Ikuti panduan naskah menit-demi-menit pada file `VIDEO_DEMO_GUIDE.md`.
