/**
 * RotiKu — Storage Layer (localStorage Manager)
 * Author: Fitri (NIM: 2440304027)
 * Tugas PTS Pemrograman Web — Variasi 027
 * Y = 2: Favorite/Bookmark menggunakan localStorage (Kunci: rotiku_favorites)
 * Fitur Tambahan: Penyimpanan catatan terkurasi (Kunci: rotiku_notes)
 */

(function (window) {
  'use strict';

  const STORAGE_KEYS = {
    FAVORITES: 'rotiku_favorites',
    NOTES: 'rotiku_notes',
  };

  /**
   * Helper internal untuk membaca dan mem-parse JSON dari localStorage secara aman.
   * Menangani kondisi penyimpanan kosong, kuota penuh, atau data JSON rusak/korup.
   *
   * @param {string} key - Kunci localStorage
   * @param {any} fallback - Nilai kembalian jika parsing gagal atau data null
   * @returns {any}
   */
  function safeGetItem(key, fallback = []) {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return fallback;
      }
      const parsed = JSON.parse(serialized);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch (err) {
      console.warn(`[RotiKu Storage] Gagal membaca kunci "${key}" dari localStorage. Menggunakan fallback.`, err);
      return fallback;
    }
  }

  /**
   * Helper internal untuk menyimpan data ke localStorage secara aman dengan try/catch.
   *
   * @param {string} key - Kunci localStorage
   * @param {any} value - Data yang akan diserialisasi menjadi JSON
   * @returns {boolean} - True jika berhasil disimpan, false jika gagal (misal kuota penuh)
   */
  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[RotiKu Storage] Gagal menyimpan kunci "${key}" ke localStorage.`, err);
      return false;
    }
  }

  // =========================================================================
  // MANAJEMEN FAVORIT / BOOKMARK (Variasi Y = 2)
  // =========================================================================

  /**
   * Mengambil daftar ID produk favorit dari localStorage.
   * Memastikan hasil selalu berupa array unik angka/ID produk valid.
   *
   * @returns {Array<number|string>}
   */
  function getFavorites() {
    const raw = safeGetItem(STORAGE_KEYS.FAVORITES, []);
    if (!Array.isArray(raw)) {
      return [];
    }
    // Pastikan tidak ada duplikasi ID (menggunakan Set)
    return Array.from(new Set(raw));
  }

  /**
   * Memeriksa apakah ID produk tertentu sudah menjadi favorit.
   *
   * @param {number|string} productId
   * @returns {boolean}
   */
  function isFavorite(productId) {
    const list = getFavorites();
    return list.some((id) => String(id) === String(productId));
  }

  /**
   * Menambahkan ID produk ke dalam daftar favorit di localStorage.
   *
   * @param {number|string} productId
   * @returns {boolean} - Status keberhasilan penyimpanan
   */
  function addFavorite(productId) {
    const list = getFavorites();
    const stringId = String(productId);
    if (!list.some((id) => String(id) === stringId)) {
      list.push(typeof productId === 'number' ? productId : Number(productId) || productId);
      return safeSetItem(STORAGE_KEYS.FAVORITES, list);
    }
    return true; // Sudah ada
  }

  /**
   * Menghapus ID produk dari daftar favorit di localStorage.
   *
   * @param {number|string} productId
   * @returns {boolean} - Status keberhasilan penyimpanan
   */
  function removeFavorite(productId) {
    const list = getFavorites();
    const stringId = String(productId);
    const updated = list.filter((id) => String(id) !== stringId);
    return safeSetItem(STORAGE_KEYS.FAVORITES, updated);
  }

  /**
   * Melakukan toggle (tambah jika belum ada, hapus jika sudah ada) status favorit.
   *
   * @param {number|string} productId
   * @returns {{ isFav: boolean, success: boolean }}
   */
  function toggleFavorite(productId) {
    const exists = isFavorite(productId);
    let success = false;
    if (exists) {
      success = removeFavorite(productId);
      return { isFav: false, success };
    } else {
      success = addFavorite(productId);
      return { isFav: true, success };
    }
  }

  /**
   * Menghapus seluruh data favorit dari localStorage.
   *
   * @returns {boolean}
   */
  function clearAllFavorites() {
    return safeSetItem(STORAGE_KEYS.FAVORITES, []);
  }

  // =========================================================================
  // MANAJEMEN CATATAN KURASI PRODUK (Variasi Z = 7)
  // =========================================================================

  /**
   * Mengambil seluruh catatan kurasi produk yang tersimpan di localStorage.
   *
   * @returns {Array<Object>}
   */
  function getNotes() {
    const notes = safeGetItem(STORAGE_KEYS.NOTES, []);
    return Array.isArray(notes) ? notes : [];
  }

  /**
   * Menyimpan catatan baru untuk suatu produk.
   *
   * @param {Object} noteData - { productId, productTitle, text, charCount }
   * @returns {boolean}
   */
  function saveNote(noteData) {
    const notes = getNotes();
    const newNote = {
      id: 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      productId: noteData.productId,
      productTitle: noteData.productTitle,
      text: noteData.text,
      charCount: noteData.charCount,
      createdAt: new Date().toISOString(),
    };
    // Letakkan catatan terbaru di paling atas
    notes.unshift(newNote);
    return safeSetItem(STORAGE_KEYS.NOTES, notes);
  }

  /**
   * Menghapus catatan berdasarkan ID catatan.
   *
   * @param {string} noteId
   * @returns {boolean}
   */
  function deleteNote(noteId) {
    const notes = getNotes();
    const updated = notes.filter((n) => n.id !== noteId);
    return safeSetItem(STORAGE_KEYS.NOTES, updated);
  }

  // Publikasikan modul Storage ke global window
  window.RotiKuStorage = {
    KEYS: STORAGE_KEYS,
    getFavorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites,
    getNotes,
    saveNote,
    deleteNote,
  };
})(window);
