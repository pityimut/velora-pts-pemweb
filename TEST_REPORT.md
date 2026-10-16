# Laporan Pengujian Sistem (Test Report) — Velora

**Identitas Mahasiswa:**
- **Nama Mahasiswa:** Fitri
- **NIM:** 2440304027 (Variasi 027)
- **Nama Aplikasi:** Velora — Interactive Product Dashboard
- **Mata Kuliah:** Pemrograman Web
- **Tanggal Pengujian:** 16 Oktober 2026

Dokumen ini mencatat pemeriksaan yang benar-benar dijalankan pada browser terintegrasi selama sesi 16 Oktober 2026. Simulasi kegagalan jaringan dilakukan dengan membatalkan request API; pengujian ini tidak menggantikan pemeriksaan pada browser/perangkat mahasiswa.

---

## Tabel Hasil Checklist Pengujian

| No | Pemeriksaan | Hasil yang diamati |
|:---:|:---|:---|
| 1 | Loading, fetch awal, dan render data | **Teruji:** indikator loading terlihat selama request; endpoint `https://dummyjson.com/products?limit=0` memberi `total: 194` dan 194 objek pada `products`; seluruh 194 kartu tampil. Simulasi delay melewati timeout 12 detik dan masuk ke error state. |
| 2 | Statistik | **Teruji:** UI cocok dengan agregasi semua 194 produk: rata-rata Rp 25.121.646, tertinggi Rp 591.999.840 (Durango SXT RWD), 24 kategori. |
| 3 | Favorit dan persistensi | **Teruji:** ikon hati memperbarui `aria-pressed`/counter, ID tersimpan pada `velora_favorites`, dan bertahan setelah refresh. |
| 4 | Filter/empty state favorit | **Teruji:** filter hanya menampilkan favorit dan menunjukkan pesan khusus ketika kosong. |
| 5 | Storage kosong/rusak | **Teruji:** JSON rusak pada kunci favorit dan catatan kembali ke keadaan kosong tanpa menghentikan halaman. |
| 6 | Validasi catatan | **Teruji:** teks 29 karakter bersih ditolak tanpa disimpan; teks tepat 30 karakter untuk produk ID 194 berhasil disimpan. |
| 7 | Error awal dan Retry | **Teruji:** request endpoint baru dibatalkan, pesan error dan Retry tampil, statistik tetap `--`, timestamp awal tetap “Belum ada data yang berhasil dimuat”; Retry memuat 194 produk. |
| 8 | Gagal saat data sudah tersedia | **Teruji:** status berubah menjadi gagal, 194 kartu tetap tampil, timestamp tidak berubah; tombol Retry memuat ulang 194 produk. |
| 9 | Gambar gagal | **Teruji:** placeholder muncul dan tombol favorit tetap tersedia. |
| 10 | Viewport | **Teruji:** 1440, 1024, 768, 480, 390, dan 360 px; tidak ditemukan horizontal overflow. Screenshot hanya dilihat di browser, tidak disimpan di repository. |
| 11 | Runtime dan diagnostics | **Teruji:** tidak ada `pageerror` atau console error pada pemuatan sukses; pemeriksaan editor bersih pada file inti. Pemblokiran network/gambar dalam simulasi menghasilkan pesan resource gagal yang memang disengaja. |

---

## Yang Belum Dilakukan

- Pengujian keyboard manual di browser mahasiswa belum dilakukan.
- Screenshot belum disimpan sebagai file project.
- Perekaman video demo belum dilakukan.
- Pengujian langsung melalui instalasi Laragon/Apache mahasiswa belum dilakukan; konfigurasi server tidak diubah.
