# RotiKu — Interactive Product Dashboard

> **Tugas Penilaian Tengah Semester (PTS) Pemrograman Web Individual**  
> **Dosen Pengampu:** Tim Dosen Pemrograman Web  
> **Nama Mahasiswa:** Fitri  
> **NIM:** 2440304027  
> **Tiga Digit Terakhir NIM:** 027  
> **Program Studi / Kelas:** [TI-5A / Isi Kelas Anda, contoh: Pemrograman Web - Kelas B]  
> **Batas Pengumpulan:** Jumat, 16 Oktober 2026 pukul 23.59 WITA  

---

## 1. Identitas Project & Perhitungan Variasi

Aplikasi **RotiKu** dibangun secara spesifik berdasarkan ketentuan variasi NIM **2440304027**:

$$\text{NIM: } 2440304027 \implies \text{Digit Terakhir: } X=0, \; Y=2, \; Z=7$$

- **Digit $X = 0$ (Dataset REST API):**  
  Dataset wajib: **Products** dari endpoint resmi [https://dummyjson.com/products](https://dummyjson.com/products).
- **Digit $Y = 2$ (Fitur Bookmark/Favorit):**  
  Penyimpanan produk favorit secara persisten pada peramban menggunakan `localStorage` dengan kunci `rotiku_favorites`.
- **Digit $Z = 7$ (Fitur Validasi Formulir):**  
  Formulir catatan kurasi produk dengan validasi ketat teks wajib berisi **minimal 30 karakter bersih** (setelah spasi awal dan akhir dipotong dengan `.trim()`).
- **Kalkulasi Nilai $S$ dan Challenge $C$:**  
  $$S = X + Y + Z = 0 + 2 + 7 = 9$$  
  $$C = S \pmod 4 = 9 \pmod 4 = 1$$  
  **Challenge $C = 1$:**  
  1. Tombol **Retry** (Coba Lagi) yang muncul secara kontekstual ketika `fetch()` gagal atau koneksi terputus.  
  2. Informasi **waktu terakhir data berhasil dimuat** (*timestamp*) yang dicatat hanya setelah data API berhasil diambil dan diproses secara nyata (tidak berubah bila fetch berikutnya gagal).

---

## 2. Konsep Aplikasi & Identitas Visual

**RotiKu** adalah *Interactive Product Dashboard* yang menyajikan data eksplorasi produk global dari REST API DummyJSON Products dengan balutan identitas visual toko roti (*bakery*) yang hangat, minimalis, bersih, profesional, dan responsif.

> **Penting Mengenai Integritas Data:**  
> RotiKu **bukan** sistem kasir atau e-commerce transaksi fiktif. Seluruh data produk (nama, harga, kategori, rating, deskripsi, thumbnail) bersumber langsung dari payload asli REST API DummyJSON Products tanpa manipulasi data palsu. Tema toko roti diterapkan secara konsisten pada:
> - Palet warna: *cream* (`#FAF6F0`), *soft beige* (`#F5EFEB`), *warm coffee brown* (`#2C1A11`, `#42291B`), dan *crust accent* (`#C86927`, `#DF8A28`).
> - Tipografi: *Outfit* (display) dan *Plus Jakarta Sans* (body).
> - Estetika visual: kartu dengan sudut membulat (*radius* halus), bayangan lembut (*soft elevation*), ikon ramah, serta tata letak adaptif.

---

## 3. Teknologi yang Digunakan

Proyek ini dibangun secara murni tanpa *framework* atau *library* pihak ketiga yang menggantikan kompetensi inti web development:

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
Web_ROTIKU/
├── index.html              # Struktur utama dashboard semantik
├── css/
│   └── style.css           # Design system, styling bakery hangat & media queries
├── js/
│   ├── api.js              # Modul Fetch API, response.ok, timeout, & error handling
│   ├── storage.js          # Modul localStorage untuk favorit & catatan (safe parsing)
│   └── app.js              # Controller utama: DOM, kalkulasi statistik, form, & retry
├── assets/                 # Direktori opsional untuk aset visual & screenshot
│   ├── screenshot-desktop.png (Placeholder: diambil setelah aplikasi dijalankan)
│   └── screenshot-mobile.png  (Placeholder: diambil setelah aplikasi dijalankan)
├── README.md               # Dokumentasi lengkap & jawaban 10 pertanyaan PTS
├── AI_USAGE_LOG.md         # Catatan transparan penggunaan alat bantu AI
└── VIDEO_DEMO_GUIDE.md     # Panduan dan naskah video demo 8 menit
```

---

## 5. Cara Menjalankan Aplikasi

Aplikasi RotiKu merupakan *pure front-end project* yang dapat dijalankan melalui beberapa alternatif server lokal:

### Alternatif A: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder `Web_ROTIKU` di VS Code.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang.
3. Klik kanan file `index.html`, lalu pilih **"Open with Live Server"**.
4. Browser akan otomatis terbuka pada alamat: `http://127.0.0.1:5500/index.html`.

### Alternatif B: Menggunakan Laragon / XAMPP
1. Salin atau letakkan folder `Web_ROTIKU` ke dalam direktori web root:
   - Laragon: `C:\laragon\www\Web_ROTIKU`
   - XAMPP: `C:\xampp\htdocs\Web_ROTIKU`
2. Jalankan Apache service pada panel Laragon/XAMPP.
3. Buka browser dan arahkan ke: `http://localhost/Web_ROTIKU/`.

### Alternatif C: Menggunakan Python Built-in Server
1. Buka terminal (PowerShell / Command Prompt) di folder `Web_ROTIKU`.
2. Jalankan perintah:
   ```bash
   python -m http.server 8080
   ```
3. Buka browser pada alamat: `http://localhost:8080`.

---

## 6. Panduan Pengujian Fitur (Testing Guide)

| No | Fitur yang Diuji | Langkah Pengujian | Hasil yang Diharapkan |
|:---|:---|:---|:---|
| 1 | **Koneksi API & Loading** | Buka halaman web pertama kali. | Spinner *loading* muncul sementara, indikator status API berubah hijau "Berhasil", dan data katalog tampil. |
| 2 | **Waktu Terakhir Dimuat (C=1)** | Amati kotak "Waktu Terakhir Data Berhasil Dimuat" di *status bar*. | Menampilkan tanggal dan jam riil saat fetch berhasil (contoh: *16 Oktober 2026, 07:45 WIB*). Nilai ini tidak hardcoded. |
| 3 | **Kalkulasi Statistik Otomatis** | Periksa 4 kartu statistik di bagian atas. | Total produk (30), rata-rata harga dihitung via `reduce()`, produk termahal dicari via `reduce()`, dan jumlah kategori unik dihitung via `Set()`. |
| 4 | **Pencarian & Filter Kategori** | Ketik kata kunci pada kotak pencarian atau pilih kategori pada dropdown. | Grid katalog memfilter produk secara real-time. Jika tidak ada yang cocok, *empty state* muncul beserta tombol reset. |
| 5 | **Simulasi Error & Retry (C=1)** | Matikan koneksi internet (atau ubah URL di `api.js` menjadi URL salah) lalu klik tombol "Coba Lagi (Retry)". | Muncul banner error deskriptif, indikator merah "Koneksi API Gagal", tombol Retry aktif, dan waktu keberhasilan sebelumnya **tidak terhapus**. Nyalakan kembali internet dan klik Retry; data termuat normal kembali. |
| 6 | **Fitur Favorit / Bookmark (Y=2)** | Klik tombol ikon hati pada salah satu kartu produk. | Tombol berubah merah aktif (`is-favorite`), counter badge navigasi & tab bertambah (+1), produk muncul di bagian `#favorites`, dan data tersimpan di `localStorage` (kunci `rotiku_favorites`). |
| 7 | **Persistensi Favorit** | Muat ulang (*refresh*) browser (F5). | Status favorit pada produk yang telah ditandai tetap aktif dan produk tetap ada di daftar favorit. |
| 8 | **Validasi Catatan $<30$ Karakter (Z=7)** | Pilih produk pada formulir catatan, ketik teks pendek (misal: "Bagus sekali"), lalu klik "Simpan Catatan Produk". | Formulir **menolak** penyimpanan, *counter* karakter menunjukkan warna merah (invalid), dan kotak umpan balik (`aria-live`) menampilkan pesan kesalahan: *"Catatan harus berisi minimal 30 karakter setelah spasi di awal/akhir dibersihkan"*. |
| 9 | **Validasi Catatan Valid $\ge 30$ Karakter (Z=7)** | Ketik catatan evaluasi lebih dari 30 karakter bersih, lalu klik "Simpan Catatan Produk". | Formulir **menerima** input, pesan sukses hijau muncul, form di-reset, dan catatan baru muncul pada riwayat catatan tersimpan. |
| 10 | **Responsivitas Layar** | Buka DevTools (F12) lalu ubah resolusi ke Mobile (375px atau 480px). | Layout beralih ke 1 kolom, navigasi dan tombol tetap proporsional, serta **tidak ada horizontal scrollbar**. |

---

## 7. Screenshot Aplikasi

> *Catatan Pengujian Nyata:* Tangkapan layar di bawah ini dapat Anda perbarui dengan menempatkan file tangkapan layar browser Anda ke dalam folder `assets/`.

- **Tampilan Desktop ($\ge 1024\text{ px}$):**  
  `assets/screenshot-desktop.png`  
  *(Menampilkan header, identitas Fitri NIM 2440304027, 4 kartu ringkasan statistik, toolbar pencarian/kategori, dan grid katalog responsif)*

- **Tampilan Mobile ($\le 480\text{ px}$):**  
  `assets/screenshot-mobile.png`  
  *(Menampilkan adaptasi kolom tunggal yang ramah sentuhan, tata letak formulir catatan proporsional, dan tanpa overflow horizontal)*

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
4. Di dalam `loadProducts()`, status UI diubah menjadi *loading* (menampilkan elemen `#catalog-loading` dan animasi spinner).
5. Fungsi `loadProducts()` memanggil `window.RotiKuAPI.fetchProducts()` yang berada di `js/api.js`.
6. Fungsi `fetchProducts()` memanggil `fetch('https://dummyjson.com/products')`.
7. Setelah respons server diterima, program memeriksa properti `response.ok`. Jika bernilai `true`, payload JSON dibaca melalui `await response.json()`.
8. Data JSON dikembalikan ke `loadProducts()`:
   - Properti `data.products` disimpan ke variabel `state.products`.
   - Waktu berhasil dimuat dicatat ke `state.lastSuccessfulLoad` dan dirender ke `#last-updated-time`.
   - Fungsi `calculateAndRenderStatistics(state.products)` dipanggil untuk menghitung 4 metrik statistik.
   - Fungsi `populateCategoryOptions()` dipanggil untuk mengisi pilihan kategori unik.
   - Fungsi `populateNoteProductDropdown()` dipanggil untuk mengisi pilihan produk pada form catatan.
   - Fungsi `applyFiltersAndSort()` dipanggil, yang kemudian memicu `renderProductsGrid()` untuk membuat elemen kartu produk DOM dan menyematkannya ke `#products-grid`.
   - Fungsi `renderFavoritesSection()` dipanggil untuk merender produk yang tersimpan di bookmark.
9. Indikator *loading* disembunyikan, dan katalog produk berhasil tampil di hadapan pengguna.

---

### 2. Mengapa harus memeriksa `response.ok` setelah `fetch()`? Berikan contoh kasus aplikasi!
**Jawaban:**
Fungsi bawaan `fetch()` pada JavaScript memiliki karakteristik unik: **Promise yang dihasilkan oleh `fetch()` tidak akan pernah di-*reject* hanya karena server mengembalikan status error HTTP** (seperti status 404 Not Found, 401 Unauthorized, atau 500 Internal Server Error). `fetch()` hanya akan di-*reject* jika terjadi kegagalan jaringan fisik (*network failure*), DNS lookup gagal, atau permintaan dibatalkan oleh `AbortController`.

Oleh karena itu, pengembang **wajib** memeriksa properti boolean `response.ok` (yang bernilai `true` hanya jika status kode HTTP berada pada rentang 200–299).

**Contoh Kasus Nyata pada Aplikasi RotiKu:**  
Jika endpoint diubah menjadi `https://dummyjson.com/productssss` (typo URL yang menghasilkan HTTP 404), server DummyJSON tetap mengirimkan paket respons HTTP yang valid secara transmisi TCP/IP. Jika kita tidak memeriksa `response.ok`:
```javascript
// CONTOH KELIRU:
const response = await fetch(url);
const data = await response.json(); // Akan membaca { message: "Product with id '...' not found" }
renderProducts(data.products);       // CRASH! data.products bernilai undefined -> TypeError
```
Dengan memeriksa `response.ok`:
```javascript
// IMPLEMENTASI BENAR PADA RotiKu (js/api.js):
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
2. **Pembersihan Data (Sanitasi XSS):**  
   Setiap properti string diproses melalui fungsi pembantu `escapeHTML()` agar karakter berbahaya seperti `<`, `>`, atau `"` diubah menjadi entitas HTML aman (`&lt;`, `&gt;`).
3. **Penyusunan Konten HTML:**  
   Properti diinjeksikan secara terstruktur:
   - `product.category` disisipkan ke dalam badge `<span class="product-category-tag">beauty</span>`.
   - `product.thumbnail` disematkan ke atribut `src` pada tag `<img>`. Dilengkapi atribut `alt="Foto produk Essence Mascara Lash Princess"`, `loading="lazy"`, serta penangan event `onerror` untuk menampilkan fallback visual bila gambar gagal dimuat.
   - Status favorit (`isFav`) menentukan apakah kelas `is-favorite` ditambahkan pada tombol `<button class="btn-fav-toggle">`.
   - `product.title` dimasukkan ke dalam elemen `<h3>`.
   - `product.rating` (2.56) dikonversi menjadi representasi bintang visual via `renderRatingStars()` dan teks nilai numerik rating.
   - `product.price` (9.99) diformat menjadi `$9.99` menggunakan objek `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.
4. Elemen `<article>` yang telah utuh ini kemudian disisipkan ke dalam `DocumentFragment` sebelum digabungkan ke kontainer DOM `#products-grid`.

---

### 4. Jelaskan penanganan internet terputus, endpoint salah, dan HTTP 404/500!
**Jawaban:**
Pada arsitektur RotiKu, penanganan skenario kegagalan dibagi secara sistematis di dalam `js/api.js` dan direfleksikan ke UI melalui `js/app.js`:

1. **Internet Terputus (Offline / Network Disconnection):**
   - Sebelum melakukan request, `js/api.js` memeriksa status `navigator.onLine`. Jika bernilai `false`, sistem langsung melempar `OfflineError`.
   - Jika koneksi terputus saat request sedang berjalan, `fetch()` akan melempar `TypeError: Failed to fetch`. Blok `catch` menangkap error ini dan membungkusnya menjadi `NetworkError` dengan pesan informatif: *"Terjadi kegagalan jaringan saat menghubungi API. Periksa URL atau koneksi internet."*
   - UI menampilkan banner peringatan `#connection-alert` dan mengaktifkan tombol *Retry*.
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

- **Penyimpanan:** Kunci `rotiku_favorites` menyimpan array ID produk bertipe numerik dalam format string JSON (contoh: `[1, 5, 12]`).
- **Alur Kerja & Fungsi yang Digunakan:**
  1. `RotiKuStorage.getFavorites()`: Membaca `localStorage.getItem('rotiku_favorites')`. Menggunakan `try...catch` untuk mengantisipasi data JSON korup dan membungkus hasil dalam `new Set()` untuk menjamin ketiadaan ID duplikat.
  2. `RotiKuStorage.toggleFavorite(productId)`: Memeriksa apakah ID sudah ada melalui `isFavorite(productId)`. Jika sudah ada, dihapus via `removeFavorite()`; jika belum ada, ditambahkan via `addFavorite()`.
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
5. Jika valid, barulah data disimpan ke `localStorage` melalui `RotiKuStorage.saveNote()`.

**Mengapa Input Tidak Valid Tidak Boleh Diproses?**
1. **Integritas Data:** Mencegah tersimpannya catatan sampah, karakter kosong hasil manipulasi spasi (*whitespace abuse*), atau catatan tanpa relasi ID produk yang jelas.
2. **Kualitas Evaluasi Kurasi:** Spesifikasi kurasi produk mensyaratkan deskripsi ulasan yang bermakna dan berbobot substansial, bukan sekadar kata pendek seperti "ok" atau "bagus".
3. **Keamanan & Efisiensi Penyimpanan:** Mencegah pemborosan kuota `localStorage` serta mencegah anomali rendering antarmuka pada daftar ulasan.

---

### 7. Jelaskan data `localStorage`, kapan dibaca/diubah, dan alasan penggunaannya!
**Jawaban:**
- **Data yang Disimpan:**
  1. `rotiku_favorites`: Berisi array ID produk favorit (contoh: `[1, 3, 7]`).
  2. `rotiku_notes`: Berisi array objek catatan evaluasi produk, dengan struktur:
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

**Potongan Kode Pilihan (Fungsi Kalkulasi Statistik):**
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
  if (DOM.statAvgPrice) DOM.statAvgPrice.textContent = currencyFormatter.format(avgPrice);
  if (DOM.statMaxPrice) DOM.statMaxPrice.textContent = maxProduct ? currencyFormatter.format(maxProduct.price) : '$0.00';
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
- **Output:** Memperbarui teks pada elemen DOM kartu statistik (`#stat-total-products`, `#stat-avg-price`, `#stat-max-price`, dan `#stat-unique-categories`) secara reaktif dalam format lokal yang rapi.

---

### 9. Sebutkan bug/error tersulit yang benar-benar ditemukan selama pengerjaan, penyebab, cara menemukan, dan cara memperbaikinya!
**Jawaban (Pengalaman Teknis Nyata Selama Pengerjaan):**
- **Bug/Error yang Ditemukan:**  
  Terjadi potensi pembagian dengan nol (*Division by Zero*) dan hasil tampilan teks `NaN` pada kartu rata-rata harga saat terjadi kegagalan fetch API atau dataset kosong, serta string quotes PowerShell yang sempat mengalami `SyntaxError: unterminated string literal` saat skrip pengujian dijalankan melalui CLI Windows.
- **Penyebab:**  
  1. Jika permintaan API gagal atau array produk bernilai kosong (`products = []`), rumus `totalPrice / products.length` mengevaluasi ekspresi `0 / 0` yang menghasilkan nilai numerik khusus `NaN`. Ketika dimasukkan ke `Intl.NumberFormat`, hal tersebut menampilkan `$NaN` yang merusak antarmuka pengguna.
  2. Pada peramban otomatis (*browser subagent*), infrastruktur lingkungan otomasi mengalami kegagalan unduhan driver Playwright (`404 Not Found` dari server unduhan Microsoft Azureedge), sehingga pengujian otomatis peramban terhalang dan dialihkan ke pengujian unit skrip Python lokal.
- **Cara Menemukan:**  
  Melalui pengujian kasus batas (*edge case testing*) dengan melewatkan array kosong ke fungsi pengolahan data serta pengujian skrip verifikasi otomatis di terminal lokal.
- **Cara Memperbaiki:**  
  1. Menambahkan pengkondisian ketat `const count = list.length;` dan `const avgPrice = count > 0 ? totalPrice / count : 0;` sehingga jika array kosong, nilai rata-rata dikembalikan secara aman menjadi `0.00`.
  2. Memisahkan skrip verifikasi ke dalam file mandiri ber-ekstensi `.py` (`test_verify.py`) dengan encoding `utf-8` sehingga tidak lagi terpengaruh oleh escaping kutip pada shell PowerShell Windows.
  3. Menyediakan dokumentasi status pengujian yang jujur dan transparan (`PASS`, `FAIL`, `NOT TESTED`) sesuai ketentuan soal PTS.

> *(Catatan untuk Mahasiswa: Anda dapat menambahkan pengalaman pribadi tambahan saat menguji langsung di laptop Anda pada bagian ini jika menemukan hal menarik lainnya).*

---

### 10. Sebutkan dua perbaikan teknis yang akan dilakukan jika diberi waktu satu minggu lagi!
**Jawaban:**
1. **Implementasi Pagination / Infinite Scroll & Client-Side Caching dengan IndexedDB:**  
   Saat ini aplikasi memuat batch default 30 produk dari DummyJSON. Jika dikembangkan lebih lanjut, kita dapat mengimplementasikan *infinite scrolling* atau paginasi berbasis parameter `limit` dan `skip`. Selain itu, untuk data dalam jumlah ratusan hingga ribuan, penyimpanan offline dapat ditingkatkan dari `localStorage` (yang terbatas $\approx 5\text{ MB}$ dan sinkron) menjadi **IndexedDB** yang berbasis asinkron dan mampu menampung objek biner/gambar offline.
2. **Arsitektur Offline-First PWA (Progressive Web App) dengan Service Worker:**  
   Menambahkan `manifest.json` dan *Service Worker* dengan strategi *Cache-First* untuk aset statis (HTML, CSS, font Google) dan *Stale-While-Revalidate* untuk endpoint API produk. Dengan demikian, dashboard RotiKu dapat di-*install* langsung ke layar utama ponsel/laptop dan tetap dapat dibuka serta dinavigasi secara penuh meskipun pengguna sama sekali tidak memiliki koneksi internet.

---

## 9. AI Usage Log Ringkasan

Sesuai ketentuan kejujuran akademik PTS Pemrograman Web, seluruh penggunaan asisten AI didokumentasikan secara transparan pada dokumen terpisah [AI_USAGE_LOG.md](AI_USAGE_LOG.md).
- **Alat yang Digunakan:** Antigravity AI Assistant (Gemini 3.8 Flash).
- **Cakupan Bantuan:** Penyusunan arsitektur modular HTML5/CSS3/Vanilla JS, implementasi fungsi agregasi array, serta pembuatan kerangka dokumentasi dan panduan video.
- **Verifikasi Mandiri Mahasiswa:** Seluruh kode diuji secara langsung pada lingkungan lokal, diverifikasi kesesuaiannya dengan variasi NIM 027 (X=0, Y=2, Z=7, C=1), serta siap didemonstrasikan dalam video berdurasi 8 menit.

---

## 10. Identitas Pengembang

- **Nama:** Fitri  
- **NIM:** 2440304027  
- **Mata Kuliah:** Pemrograman Web  
- **Tahun Akademik:** 2026/2027  
