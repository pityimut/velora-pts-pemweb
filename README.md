# Velora — Interactive Product Dashboard

> **Tugas Penilaian Tengah Semester (PTS) Pemrograman Web Individual**  
> **Dosen Pengampu:** Tim Dosen Pemrograman Web  
> **Nama Mahasiswa:** Fitri  
> **NIM:** 2440304027  
> **Tiga Digit Terakhir NIM:** 027  
> **Program Studi / Kelas:** Belum dicantumkan
> **Batas Pengumpulan:** Jumat, 16 Oktober 2026 pukul 23.59 WITA  

---

## 1. Identitas Project & Perhitungan Variasi

Aplikasi **Velora** dibangun secara spesifik berdasarkan ketentuan variasi NIM **2440304027**:

$$\text{NIM: } 2440304027 \implies \text{Digit Terakhir: } X=0, \; Y=2, \; Z=7$$

- **Digit $X = 0$ (Dataset REST API):**  
  Dataset wajib: **Products** dari endpoint [https://dummyjson.com/products?limit=0](https://dummyjson.com/products?limit=0), yang meminta seluruh item tersedia.
- **Digit $Y = 2$ (Fitur Bookmark/Favorit):**  
  Penyimpanan produk favorit secara persisten pada peramban menggunakan `localStorage` dengan kunci `velora_favorites` (dengan fallback kompatibilitas membaca kunci lama).
- **Digit $Z = 7$ (Fitur Validasi Formulir):**  
  Formulir catatan kurasi produk dengan validasi ketat teks wajib berisi **minimal 30 karakter bersih** (setelah spasi awal dan akhir dipotong dengan `.trim()`).
- **Kalkulasi Nilai $S$ dan Challenge $C$:**  
  $$S = X + Y + Z = 0 + 2 + 7 = 9$$  
  $$C = S \pmod 4 = 9 \pmod 4 = 1$$  
  **Challenge $C = 1$:**  
  1. Tombol **Retry** (Coba Lagi) yang muncul secara kontekstual ketika `fetch()` gagal atau koneksi terputus, dan benar-benar melakukan re-fetch ke API.  
  2. Informasi **waktu terakhir data berhasil dimuat** (*timestamp*) yang dicatat hanya setelah data API berhasil diterima dan diproses secara nyata (tidak terhapus bila fetch berikutnya gagal).

---

## 2. Konsep Aplikasi & Identitas Visual

**Velora** adalah katalog produk editorial dengan tata letak ringan, tipografi kontras, dan palet lavender lembut.

- **Palet Warna:**
  - Background: `#FAF9FC`; permukaan kartu: `#FFFFFF`.
  - Lavender: `#E8E0F5`; aksen: `#8B78AC`; teks utama: `#30283D`.
  - Teks sekunder: `#777181`; border: `#ECE7F2`.
- **Tipografi:** *DM Serif Display* untuk judul dan *DM Sans* untuk antarmuka.
- **Integritas Data:** Data produk bersumber dari `https://dummyjson.com/products?limit=0`. Harga API dikonversi ke Rupiah dengan kurs acuan tetap Rp 16.000 per USD, bukan kurs langsung.

---

## 3. Teknologi yang Digunakan

Proyek ini dibangun secara murni tanpa *framework* atau *library* pihak ketiga:

1. **HTML5 Semantik:** Penggunaan tag `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<form>`, `<label>`, dan `<footer>` secara hierarkis. Aksesibilitas dilengkapi atribut ARIA (`aria-label`, `aria-live`, `aria-required`, `role="status"`, `role="alert"`).
2. **Vanilla CSS3:** Arsitektur modular menggunakan *CSS Custom Properties (Variables)*, *CSS Grid*, dan *Flexbox*. Desain responsif diuji pada 3 *viewport*: Desktop ($\ge 1024\text{ px}$), Tablet ($\approx 768\text{ px}$), dan Mobile ($\le 480\text{ px}$) tanpa *horizontal scrolling*.
3. **Modern Vanilla JavaScript (ES6+):**
   - *Fetch API* dengan arsitektur `async/await` dan penanganan `try...catch...finally`.
   - *DOM Manipulation* & *Event Delegation* terstruktur.
   - *Array Methods* tingkat lanjut: `reduce()`, `map()`, `filter()`, `find()`, `sort()`, dan struktur data `Set`.
   - *Web Storage API* (`localStorage`) dengan *safe JSON parsing* dan proteksi duplikasi data.
4. **Version Control:** Git dan GitHub dengan *commit history* bertahap dan deskriptif.

---

## 4. Struktur Direktori Proyek

```text
velora/
├── index.html              # Struktur utama dashboard semantik Velora
├── css/
│   └── style.css           # Design system minimalis putih & lavender, grid, card, & media queries
├── js/
│   ├── api.js              # Modul VeloraAPI: Fetch API, response.ok, timeout, & error handling
│   ├── storage.js          # Modul VeloraStorage: localStorage untuk favorit & catatan (safe parsing)
│   └── app.js              # Controller utama: DOM, kalkulasi statistik, format Rupiah, form, & retry
├── assets/                 # Direktori untuk aset visual & tangkapan layar
│   ├── README.md           # Panduan penempatan screenshot
├── README.md               # Dokumentasi lengkap & jawaban 10 pertanyaan PTS
├── AI_USAGE_LOG.md         # Catatan transparan penggunaan alat bantu AI
├── TEST_REPORT.md          # Laporan verifikasi pengujian mandiri
└── VIDEO_DEMO_GUIDE.md     # Panduan dan naskah video demo 8 menit
```

---

## 5. Cara Menjalankan Aplikasi & Solusi Error Laragon 404

Aplikasi Velora merupakan *front-end website* statis (HTML, CSS, JS murni).

### Mengapa Laragon Sebelumnya Menghasilkan Error 404?

Jika Anda sebelumnya mencoba membuka project melalui Laragon dan mendapatkan halaman **404 Not Found**, berikut dua penyebab teknis utamanya:

1. **Nama Folder yang Diakses Tidak Cocok:**  
   Nama folder fisik di dalam direktori `www` adalah `velora`. Jika Anda mengakses `http://localhost/Web_ROTIKU/`, Apache tidak menemukan folder tersebut sehingga memunculkan error 404. URL yang benar adalah `http://localhost/velora/` atau `http://velora.test`.
2. **Perbedaan Partisi Drive / Lokasi DocumentRoot Apache:**  
   Secara default, Laragon terinstal di drive `C:` dengan `DocumentRoot` pada `C:\laragon\www`. Namun workspace project ini berada di drive `D:` (`D:\SEMESTER 5\Pemrograman Web\Web\laragon\www\velora`). Jika Apache Laragon membaca `C:\laragon\www`, Apache tidak otomatis melihat folder yang berada di drive `D:`.

### Panduan Solusi & Cara Menjalankan yang Benar:

#### Opsi 1: Menggunakan VS Code Live Server (Paling Cepat & Direkomendasikan)
Cara ini tidak tergantung pada konfigurasi web server pihak ketiga dan dijamin langsung berjalan:
1. Buka workspace folder `velora` di VS Code.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) terpasang.
3. Klik kanan pada file `index.html`, lalu pilih **"Open with Live Server"** (atau klik tombol *Go Live* di status bar kanan bawah).
4. Browser akan otomatis terbuka pada alamat: `http://127.0.0.1:5500/index.html`.

#### Opsi 2: Menjalankan via Laragon (Jika Menggunakan Apache Laragon)
1. Periksa lokasi DocumentRoot Laragon Anda:
   - Jika Laragon Anda terinstal di `D:\SEMESTER 5\Pemrograman Web\Web\laragon`, klik tombol **Start All** pada panel Laragon.
   - Buka browser dan ketik alamat: `http://localhost/velora/` atau `http://velora.test`.
2. Jika Laragon Anda terinstal di `C:\laragon` sedangkan project berada di `D:`, Anda memiliki 2 pilihan mudah:
   - **Pilihan A (Symlink / Directory Junction):** Buka Command Prompt sebagai Administrator, lalu jalankan:
     ```cmd
     mklink /J "C:\laragon\www\velora" "D:\SEMESTER 5\Pemrograman Web\Web\laragon\www\velora"
     ```
     Setelah itu, buka `http://localhost/velora/` di browser.
   - **Pilihan B (Ganti Root Laragon):** Klik kanan panel Laragon $\to$ **Laragon** $\to$ **Root** $\to$ arahkan ke direktori `D:\SEMESTER 5\Pemrograman Web\Web\laragon\www`. Reload Apache dan buka `http://localhost/velora/`.

#### Opsi 3: Menggunakan Python Built-in Server
1. Buka terminal (PowerShell / Command Prompt) di dalam folder project `velora`.
2. Jalankan perintah:
   ```bash
   python -m http.server 8080
   ```
3. Buka peramban pada alamat: `http://localhost:8080`.

---

## 6. Panduan Pengujian Fitur (Testing Guide)

| No | Fitur yang Diuji | Langkah Pengujian | Hasil yang Diharapkan |
|:---|:---|:---|:---|
| 1 | **Koneksi API & Loading** | Buka halaman web pertama kali. | Spinner *loading* muncul sementara, indikator status API berubah hijau "Berhasil", dan data katalog tampil. |
| 2 | **Waktu Terakhir Dimuat (C=1)** | Amati kotak "Waktu Terakhir Data Berhasil Dimuat" di *status bar*. | Menampilkan tanggal dan jam riil saat fetch berhasil (contoh: *16 Oktober 2026, 15:30 WIB*). Nilai ini tidak hardcoded. |
| 3 | **Kalkulasi Statistik Otomatis** | Periksa 4 ringkasan statistik setelah API berhasil. | Total, rata-rata harga, produk termahal, dan kategori unik dihitung dari seluruh item yang diterima, bukan dari angka tetap. |
| 4 | **Pencarian & Filter Kategori** | Ketik kata kunci pada kotak pencarian atau pilih kategori pada dropdown. | Grid katalog memfilter produk secara real-time. Jika tidak ada yang cocok, *empty state* muncul beserta tombol reset. |
| 5 | **Simulasi Error & Retry (C=1)** | Matikan koneksi internet (atau matikan Wi-Fi) lalu klik tombol "Coba Lagi (Retry)". | Muncul banner error deskriptif, indikator merah "Koneksi API Gagal", tombol Retry aktif, dan waktu keberhasilan sebelumnya **tidak terhapus**. Nyalakan kembali internet dan klik Retry; data termuat normal kembali. |
| 6 | **Fitur Favorit / Bookmark (Y=2)** | Klik tombol Tambah Favorit pada salah satu kartu produk. | Tombol berubah menjadi Hapus Favorit, counter bertambah, produk muncul pada tampilan favorit, dan ID tersimpan di `localStorage` (`velora_favorites`). |
| 7 | **Persistensi Favorit** | Muat ulang (*refresh*) browser (F5). | Status favorit pada produk yang telah ditandai tetap aktif dan produk tetap ada di daftar favorit. |
| 8 | **Validasi Catatan $<30$ Karakter (Z=7)** | Pilih produk pada formulir catatan, ketik teks pendek (misal: "Bagus sekali"), lalu klik "Simpan Catatan Produk". | Formulir **menolak** penyimpanan, *counter* karakter menunjukkan warna merah (invalid), dan kotak umpan balik (`aria-live`) menampilkan pesan kesalahan: *"Catatan harus berisi minimal 30 karakter setelah spasi di awal/akhir dibersihkan"*. |
| 9 | **Validasi Catatan Valid $\ge 30$ Karakter (Z=7)** | Ketik catatan evaluasi lebih dari 30 karakter bersih, lalu klik "Simpan Catatan Produk". | Formulir **menerima** input, pesan sukses hijau muncul, form di-reset, dan catatan baru muncul pada riwayat catatan tersimpan. |
| 10 | **Responsivitas Layar** | Buka DevTools (F12) lalu ubah resolusi desktop, tablet, dan mobile. | Kartu tersusun responsif, kontrol tetap mudah digunakan, serta **tidak ada horizontal scrollbar**. |

---

## 7. Screenshot Aplikasi

Belum ada berkas screenshot yang disimpan di project. Jika screenshot diminta untuk pengumpulan, ambil langsung dari browser setelah menjalankan aplikasi.

---

## 8. Jawaban Sepuluh Pertanyaan Penjelasan Kode PTS

Berikut adalah jawaban lengkap, terperinci, dan teknis atas 10 pertanyaan evaluasi kode pada soal PTS:

### 1. Jelaskan alur halaman dibuka sampai data REST API tampil, beserta nama fungsi yang digunakan!
**Jawaban:**
1. Pengguna membuka `index.html`. Peramban membaca dokumen HTML dan memuat stylesheet `css/style.css`.
2. Script `js/storage.js`, `js/api.js`, dan `js/app.js` dimuat secara berurutan.
3. Event `DOMContentLoaded` terpicu pada objek `document`, yang mengeksekusi fungsi inisialisasi:
   - `setupInitialListeners()`: Memasang pendengar event pada form, input pencarian, filter kategori, tab, dan tombol retry.
   - `handleNoteTextareaInput()`: Menginisialisasi counter karakter catatan.
   - `renderSavedNotes()`: Membaca dan menampilkan catatan yang tersimpan dari `localStorage`.
   - `loadProducts()`: Memulai alur pemuatan data REST API.
4. Di dalam `loadProducts()`, status UI diubah menjadi *loading* (menampilkan elemen `#catalog-loading` dan animasi spinner lavender).
5. Fungsi `loadProducts()` memanggil `window.VeloraAPI.fetchProducts()` yang berada di `js/api.js`.
6. Fungsi `fetchProducts()` memanggil `fetch('https://dummyjson.com/products?limit=0')`.
7. Setelah respons server diterima, program memeriksa properti `response.ok`. Jika bernilai `true`, payload JSON dibaca melalui `await response.json()`.
8. Data JSON dikembalikan ke `loadProducts()`:
   - Properti `data.products` disimpan ke variabel `state.products`.
   - Waktu berhasil dimuat dicatat ke `state.lastSuccessfulLoad` dan dirender ke `#last-updated-time`.
   - Fungsi `calculateAndRenderStatistics(state.products)` dipanggil untuk menghitung 4 metrik statistik dalam format Rupiah.
   - Fungsi `populateCategoryOptions()` dipanggil untuk mengisi pilihan kategori unik.
   - Fungsi `populateNoteProductDropdown()` dipanggil untuk mengisi pilihan produk pada form catatan.
   - Fungsi `applyFiltersAndSort()` dipanggil, yang kemudian memicu `renderProductsGrid()` untuk membuat elemen kartu produk DOM dan menyematkannya ke `#products-grid`.
   - Fungsi `renderFavoritesSection()` dipanggil untuk merender produk yang tersimpan di bookmark.
9. Indikator *loading* disembunyikan, dan katalog produk Velora berhasil tampil di hadapan pengguna.

---

### 2. Mengapa harus memeriksa `response.ok` setelah `fetch()`? Berikan contoh kasus aplikasi!
**Jawaban:**
Fungsi bawaan `fetch()` pada JavaScript memiliki karakteristik unik: **Promise yang dihasilkan oleh `fetch()` tidak akan pernah di-*reject* hanya karena server mengembalikan status error HTTP** (seperti status 404 Not Found, 401 Unauthorized, atau 500 Internal Server Error). `fetch()` hanya akan di-*reject* jika terjadi kegagalan jaringan fisik (*network failure*), DNS lookup gagal, atau permintaan dibatalkan oleh `AbortController`.

Oleh karena itu, pengembang **wajib** memeriksa properti boolean `response.ok` (yang bernilai `true` hanya jika status kode HTTP berada pada rentang 200–299).

**Contoh Kasus Nyata pada Aplikasi Velora:**  
Jika endpoint diubah menjadi `https://dummyjson.com/productssss` (typo URL yang menghasilkan HTTP 404), server DummyJSON tetap mengirimkan paket respons HTTP yang valid secara transmisi TCP/IP. Jika kita tidak memeriksa `response.ok`:
```javascript
// CONTOH KELIRU:
const response = await fetch(url);
const data = await response.json(); // Akan membaca { message: "Product with id '...' not found" }
renderProducts(data.products);       // CRASH! data.products bernilai undefined -> TypeError
```
Dengan memeriksa `response.ok`:
```javascript
// IMPLEMENTASI BENAR PADA Velora (js/api.js):
if (!response.ok) {
  throw new Error(`Gagal mengambil data dari server (HTTP ${response.status}: ${response.statusText})`);
}
```
Aplikasi dapat menangkap kesalahan ini secara anggun (*graceful*), menampilkan banner pesan kesalahan yang ramah kepada pengguna, serta mengaktifkan tombol *Retry*.

---

### 3. Pilih satu data JSON dan jelaskan bagaimana diubah menjadi elemen DOM!
**Jawaban:**
Misalkan respons API mengembalikan satu objek produk berikut:
```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
  "category": "beauty",
  "price": 9.99,
  "rating": 2.56,
  "stock": 99,
  "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
}
```

Transformasi menjadi elemen DOM dilakukan di fungsi `createProductCard(product, isFav)` pada `js/app.js`:
1. **Pembuatan Elemen Pembungkus:**  
   `const card = document.createElement('article');` dibuat dan diberikan class `product-card` serta atribut data `card.setAttribute('data-id', product.id)`.
2. **Penyusunan Elemen DOM:** Kategori dan nama produk diisikan melalui `textContent`. Thumbnail ditetapkan pada elemen `<img>` dengan `alt` dan `loading="lazy"`; jika gambar gagal, hanya elemen gambar yang diganti placeholder.
3. **Harga dan Favorit:** Harga API dikonversi ke IDR memakai kurs acuan Rp 16.000 per USD. Tombol berlabel **Tambah Favorit** atau **Hapus Favorit** ditentukan dari status `isFav` dan diperbarui tanpa membuat ulang permintaan API.
4. Elemen `<article>` yang telah utuh ini kemudian disisipkan ke dalam `DocumentFragment` sebelum digabungkan ke kontainer DOM `#products-grid`.

---

### 4. Jelaskan penanganan internet terputus, endpoint salah, dan HTTP 404/500!
**Jawaban:**
Pada arsitektur Velora, penanganan skenario kegagalan dibagi secara sistematis di dalam `js/api.js` dan direfleksikan ke UI melalui `js/app.js`:

1. **Internet Terputus (Offline / Network Disconnection):**
   - Sebelum melakukan request, `js/api.js` memeriksa status `navigator.onLine`. Jika bernilai `false`, sistem langsung melempar `OfflineError`.
   - Jika koneksi terputus saat request sedang berjalan, `fetch()` akan melempar `TypeError: Failed to fetch`. Blok `catch` menangkap error ini dan membungkusnya menjadi `NetworkError` dengan pesan informatif: *"Terjadi kegagalan jaringan saat menghubungi API. Periksa URL atau koneksi internet."*
  - Saat pemuatan awal gagal, UI menampilkan `#catalog-error` dan tombol Retry. Jika pembaruan gagal setelah data pernah berhasil dimuat, data lama tetap tampil bersama `#connection-alert` dan tombol Retry.
2. **Endpoint Salah / Typo URL:**
   - Jika domain endpoint tidak valid (misalnya `https://dummyjson-salah.com`), `fetch()` mengalami kegagalan resolusi DNS dan memicu blok `catch` `NetworkError`.
   - Jika path salah pada domain yang benar (misalnya `https://dummyjson.com/endpoint_salah`), server DummyJSON mengembalikan HTTP 404.
3. **HTTP 404 (Not Found) dan HTTP 500 (Internal Server Error):**
   - Respon diterima dengan `response.ok === false`.
   - Program membaca kode status numerik via `response.status` dan deskripsi via `response.statusText`.
   - Program mencoba membaca detail pesan JSON dari body server jika tersedia (`errorJson.message`).
   - Program melempar `HttpError` terstruktur: *"Gagal mengambil data dari server (HTTP 404: Not Found)"*.
   - Pada layer aplikasi (`js/app.js`), status dot berubah merah, area error `#catalog-error` ditampilkan dengan tombol pemulihan, dan data favorit yang sudah tersimpan di `localStorage` **tetap aman dan tidak dihapus**.

---

### 5. Jelaskan fitur favorit berdasarkan digit Y beserta nama fungsi/event!
**Jawaban:**
Variasi mahasiswa **Y = 2** mewajibkan implementasi fitur Favorite/Bookmark menggunakan `localStorage`.

- **Penyimpanan:** Kunci `velora_favorites` menyimpan array ID produk bertipe numerik dalam format string JSON (contoh: `[1, 5, 12]`), dengan fallback membaca data lama jika ada.
- **Alur Kerja & Fungsi yang Digunakan:**
  1. `VeloraStorage.getFavorites()`: Membaca `localStorage.getItem('velora_favorites')`. Menggunakan `try...catch` untuk mengantisipasi data JSON korup dan membungkus hasil dalam `new Set()` untuk menjamin ketiadaan ID duplikat.
  2. `VeloraStorage.toggleFavorite(productId)`: Memeriksa apakah ID sudah ada melalui `isFavorite(productId)`. Jika sudah ada, dihapus via `removeFavorite()`; jika belum ada, ditambahkan via `addFavorite()`.
  3. **Event Listener:** Menggunakan teknik **Event Delegation** pada kontainer `#products-grid` dan `#favorites-grid` untuk menangkap event `click`:
     ```javascript
     DOM.productsGrid.addEventListener('click', (e) => {
       const favBtn = e.target.closest('.btn-fav-toggle');
       if (favBtn) {
         const productId = favBtn.getAttribute('data-id');
         handleFavoriteToggle(productId);
       }
     });
     ```
  4. `handleFavoriteToggle(productId)`: Memperbarui kelas CSS tombol (`is-favorite`), memperbarui atribut `aria-label`, memperbarui angka badge pada tab dan navigasi (`updateCountBadges()`), memicu `renderFavoritesSection()`, dan menampilkan notifikasi toast tanpa melakukan *re-fetch* API.
  5. Pengguna juga dapat berpindah ke tab *"Favorit Saya"* pada katalog atau menggulir ke bagian koleksi khusus `#favorites`.

---

### 6. Jelaskan validasi catatan minimal 30 karakter dan mengapa input tidak valid tidak boleh diproses!
**Jawaban:**
Variasi mahasiswa **Z = 7** mewajibkan validasi catatan minimal 30 karakter bersih.

**Implementasi Validasi:**
1. Event `input` pada textarea memicu `handleNoteTextareaInput()`. Fungsi ini menghitung panjang teks bersih:  
   `const cleanLength = (DOM.noteText.value || '').trim().length;`  
   Counter visual diperbarui secara real-time (`valid` jika $\ge 30$, `invalid` jika $< 30$).
2. Saat tombol simpan diklik, event `submit` pada `#note-form` dicegat menggunakan `e.preventDefault()` di fungsi `handleNoteFormSubmit(e)`.
3. Validasi memeriksa dua kondisi:
   - Apakah produk telah dipilih (`!productId`).
   - Apakah panjang teks bersih kurang dari 30 karakter (`cleanText.length < 30`).
4. Jika salah satu kondisi gagal, eksekusi **dihentikan seketika (`return`)**. Kotak umpan balik `#note-feedback` menampilkan pesan kesalahan eksplisit (didukung `aria-live="polite"`), kursor difokuskan kembali ke input yang keliru, dan **tidak ada data yang disimpan**.
5. Jika valid, barulah data disimpan ke `localStorage` melalui `VeloraStorage.saveNote()`.

**Mengapa Input Tidak Valid Tidak Boleh Diproses?**
1. **Integritas Data:** Mencegah tersimpannya catatan sampah, karakter kosong hasil manipulasi spasi (*whitespace abuse*), atau catatan tanpa relasi ID produk yang jelas.
2. **Kualitas Evaluasi Kurasi:** Spesifikasi kurasi produk mensyaratkan deskripsi ulasan yang bermakna dan berbobot substansial, bukan sekadar kata pendek seperti "ok" atau "bagus".
3. **Keamanan & Efisiensi Penyimpanan:** Mencegah pemborosan kuota `localStorage` serta mencegah anomali rendering antarmuka pada daftar ulasan.

---

### 7. Jelaskan data `localStorage`, kapan dibaca/diubah, dan alasan penggunaannya!
**Jawaban:**
- **Data yang Disimpan:**
  1. `velora_favorites`: Berisi array ID produk favorit (contoh: `[1, 3, 7]`).
  2. `velora_notes`: Berisi array objek catatan evaluasi produk, dengan struktur:
     `{ id: "note_...", productId: 1, productTitle: "...", text: "...", charCount: 42, createdAt: "2026-10-16T..." }`.
- **Kapan Dibaca (`Read`):**
  - Saat aplikasi pertama kali dimuat (`DOMContentLoaded`).
  - Saat kartu produk dirender di katalog untuk menentukan status awal tombol favorit.
  - Saat bagian `#favorites` atau tab *"Favorit Saya"* ditampilkan.
  - Saat daftar catatan kurasi dirender ke `#saved-notes-list`.
- **Kapan Diubah (`Write / Update / Delete`):**
  - Saat pengguna mengklik tombol hati pada kartu produk (`toggleFavorite`).
  - Saat pengguna menekan tombol *"Hapus Semua Favorit"*.
  - Saat pengguna berhasil mengirimkan catatan valid minimal 30 karakter (`saveNote`).
  - Saat pengguna menghapus item catatan individual (`deleteNote`).
- **Alasan Penggunaannya:**
  - `localStorage` menyediakan penyimpanan persisten di sisi klien (*client-side persistence*) tanpa memerlukan server backend atau database eksternal.
  - Data tetap bertahan meskipun halaman di-refresh, tab ditutup, atau peramban dimatikan kembali.
  - Operasi bersifat sinkron, cepat, dan memiliki kapasitas yang memadai ($\approx 5\text{ MB}$) untuk data JSON dashboard.

---

### 8. Pilih satu fungsi JavaScript penting, lampirkan maksimal 15 baris kode, lalu jelaskan input, proses, dan output!
**Jawaban:**

**Potongan Kode Pilihan (Fungsi Kalkulasi Statistik dalam Rupiah):**
```javascript
function calculateAndRenderStatistics(productsList = []) {
  const list = Array.isArray(productsList) ? productsList : [];
  const count = list.length;
  const totalPrice = list.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const avgPrice = count > 0 ? totalPrice / count : 0;
  const maxProduct = count > 0 ? list.reduce((max, cur) => 
    (Number(cur.price) || 0) > (Number(max.price) || 0) ? cur : max, list[0]) : null;
  const uniqueCategoryCount = new Set(list.map((p) => p.category).filter(Boolean)).size;

  if (DOM.statTotalProducts) DOM.statTotalProducts.textContent = count.toLocaleString('id-ID');
  if (DOM.statAvgPrice) DOM.statAvgPrice.textContent = rupiahFormatter.format(avgPrice * USD_TO_IDR_RATE);
  if (DOM.statMaxPrice) DOM.statMaxPrice.textContent = maxProduct ? rupiahFormatter.format(maxProduct.price * USD_TO_IDR_RATE) : 'Rp 0';
  if (DOM.statUniqueCategories) DOM.statUniqueCategories.textContent = uniqueCategoryCount.toLocaleString('id-ID');
}
```

- **Input:** Parameter `productsList` berupa Array of Objects yang berisi seluruh objek produk dari REST API DummyJSON.
- **Proses:**
  1. Melakukan validasi tipe data array untuk mencegah error eksekusi.
  2. Menghitung total harga kumulatif menggunakan metode fungsional `reduce()`.
  3. Menghitung rata-rata harga dengan perlindungan percabangan `count > 0` (mencegah pembagian dengan nol atau tampilan `NaN`).
  4. Menemukan objek produk termahal menggunakan `reduce()` dengan membandingkan nilai numerik `price`.
  5. Menghitung kategori unik menggunakan transformasi `map()`, pembersihan nilai kosong `filter()`, dan struktur data `Set`.
  6. Mengonversi nilai mata uang ke format Rupiah (IDR) menggunakan `rupiahFormatter`.
- **Output:** Memperbarui teks pada elemen DOM kartu statistik (`#stat-total-products`, `#stat-avg-price`, `#stat-max-price`, dan `#stat-unique-categories`) secara reaktif dalam format Rupiah dan lokal yang rapi.

---

### 9. Sebutkan bug/error tersulit yang benar-benar ditemukan selama pengerjaan, penyebab, cara menemukan, dan cara memperbaikinya!
**Jawaban (Pengalaman Teknis Nyata Selama Pengerjaan):**
- **Bug/Error yang Ditemukan:**  
  1. Halaman web menghasilkan error **404 Not Found** saat dicoba dibuka melalui web server Laragon.
  2. Tampilan harga rata-rata sempat berisiko menghasilkan `NaN` jika dataset kosong, serta inkonsistensi branding lama pada antarmuka.
- **Penyebab:**  
  1. Folder project dinamai `velora` dan berada pada drive `D:` (`D:\SEMESTER 5\Pemrograman Web\Web\laragon\www\velora`). Jika diakses menggunakan URL lama yang keliru (`/Web_ROTIKU/`) atau server Apache Laragon membaca DocumentRoot default di `C:\laragon\www`, Apache tidak dapat menemukan folder project tersebut dan menghasilkan HTTP 404.
  2. Kurangnya validasi panjang array sebelum pembagian rata-rata berpotensi memicu ekspresi `0 / 0` (`NaN`), dan penggunaan hardcoded styling warna cokelat lama yang belum tersinkronisasi ke desain modern putih-lavender.
- **Cara Menemukan:**  
  Menguji alur pembukaan URL di web server lokal Laragon, memeriksa riwayat log browser, serta menjalankan pemeriksaan silang teks branding di seluruh file project.
- **Cara Memperbaiki:**  
  1. Mengoreksi dokumentasi URL server ke `http://localhost/velora/` atau `http://velora.test`, memberikan panduan pembuatan Directory Junction (`mklink /J`) atau pemindahan DocumentRoot jika instalasi Laragon berada di partisi `C:`, serta merekomendasikan VS Code Live Server sebagai alternatif tanpa risiko konfigurasi server.
  2. Menambahkan guard clause `count > 0 ? totalPrice / count : 0` untuk kalkulasi rata-rata, konversi Rupiah, dan palet Soft Editorial (`#FAF9FC`, `#E8E0F5`, `#8B78AC`, `#30283D`).

---

### 10. Sebutkan dua perbaikan teknis yang akan dilakukan jika diberi waktu satu minggu lagi!
**Jawaban:**
1. **Implementasi Pagination / Infinite Scroll & Client-Side Caching dengan IndexedDB:**  
  Aplikasi saat ini meminta seluruh produk yang tersedia melalui `limit=0` dan merender hasil respons. Jika dataset kelak jauh lebih besar, virtualisasi tampilan dapat mengurangi beban DOM tanpa membatasi data yang dipakai untuk statistik. Penyimpanan offline juga dapat ditingkatkan menjadi **IndexedDB**.
2. **Arsitektur Offline-First PWA (Progressive Web App) dengan Service Worker:**  
   Menambahkan `manifest.json` dan *Service Worker* dengan strategi *Cache-First* untuk aset statis (HTML, CSS, font Google) dan *Stale-While-Revalidate* untuk endpoint API produk. Dengan demikian, dashboard Velora dapat di-*install* langsung ke layar utama ponsel/laptop dan tetap dapat dibuka serta dinavigasi secara penuh meskipun pengguna sama sekali tidak memiliki koneksi internet.

---

## 9. AI Usage Log Ringkasan

Sesuai ketentuan kejujuran akademik PTS Pemrograman Web, seluruh penggunaan asisten AI didokumentasikan secara transparan pada dokumen terpisah [AI_USAGE_LOG.md](AI_USAGE_LOG.md).
- **Alat yang Digunakan:** Antigravity AI Assistant (tercatat pada bagian sebelumnya) dan GitHub Copilot untuk perubahan serta pemeriksaan pada sesi ini.
- **Cakupan Bantuan:** Penyusunan struktur HTML5/CSS3/Vanilla JavaScript, penyederhanaan dashboard, render kartu produk yang aman, fitur favorit/catatan, dan dokumentasi.
- **Verifikasi pada sesi ini:** Browser memuat endpoint Products, menguji favorit, validasi catatan, error/retry, timestamp, gambar fallback, storage rusak, statistik, dan viewport desktop/tablet/mobile. Screenshot tidak disimpan sebagai berkas project; demonstrasi/video belum direkam.

---

## 10. Identitas Pengembang

- **Nama:** Fitri  
- **NIM:** 2440304027  
- **Mata Kuliah:** Pemrograman Web  
- **Tahun Akademik:** 2026/2027  
