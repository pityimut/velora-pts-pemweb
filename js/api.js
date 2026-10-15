/**
 * RotiKu — API Layer (REST API Client)
 * Author: Fitri (NIM: 2440304027)
 * Tugas PTS Pemrograman Web — Variasi 027 (X = 0: Dataset Products)
 * Endpoint: https://dummyjson.com/products
 */

(function (window) {
  'use strict';

  // Endpoint API Wajib sesuai spesifikasi PTS Pemrograman Web
  const API_CONFIG = {
    DEFAULT_ENDPOINT: 'https://dummyjson.com/products',
    TIMEOUT_MS: 12000, // Timeout perlindungan 12 detik
  };

  /**
   * Mengambil data produk dari REST API DummyJSON Products.
   * Menggunakan Fetch API, async/await, serta penanganan error komprehensif:
   * 1. Deteksi status offline navigator.onLine
   * 2. Timeout abort controller untuk koneksi lambat/tergantung
   * 3. Validasi ketat `response.ok` sebelum mem-parsing JSON
   * 4. Penanganan HTTP status (404, 500, dll.)
   * 5. Penanganan kegagalan parsing JSON
   * 6. Struktur try...catch...finally yang aman
   *
   * @param {string} [customEndpoint] - URL kustom untuk pengujian retry atau simulasi error
   * @returns {Promise<{ products: Array, total: number, skip: number, limit: number }>}
   */
  async function fetchProducts(customEndpoint = null) {
    const targetUrl = customEndpoint || API_CONFIG.DEFAULT_ENDPOINT;

    // 1. Periksa ketersediaan koneksi sebelum melakukan fetch
    if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
      const offlineError = new Error('Koneksi internet Anda terputus. Pastikan perangkat Anda terhubung ke internet.');
      offlineError.name = 'OfflineError';
      offlineError.statusCode = 0;
      throw offlineError;
    }

    // 2. Setup AbortController untuk timeout fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, API_CONFIG.TIMEOUT_MS);

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      // 3. Wajib memeriksa response.ok sebelum parsing JSON
      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorJson = await response.json();
          errorDetails = errorJson.message || '';
        } catch {
          // Jika response body bukan JSON, gunakan statusText
          errorDetails = response.statusText || 'Kesalahan pada server API';
        }

        const httpError = new Error(
          `Gagal mengambil data dari server (HTTP ${response.status}: ${response.statusText || 'Error'}). ${errorDetails}`
        );
        httpError.name = 'HttpError';
        httpError.statusCode = response.status;
        throw httpError;
      }

      // 4. Parsing JSON respons
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        const parseError = new Error('Format data yang diterima dari server tidak valid (Gagal membaca JSON).');
        parseError.name = 'JsonParseError';
        parseError.originalError = jsonErr;
        throw parseError;
      }

      // 5. Validasi struktur data payload yang diharapkan
      if (!data || !Array.isArray(data.products)) {
        const formatError = new Error('Struktur data dari API tidak sesuai: properti "products" tidak ditemukan atau bukan array.');
        formatError.name = 'InvalidPayloadError';
        throw formatError;
      }

      return data;
    } catch (err) {
      // Tangani kasus timeout pembatalan controller
      if (err.name === 'AbortError') {
        const timeoutError = new Error(`Permintaan ke API melebihi batas waktu (${API_CONFIG.TIMEOUT_MS / 1000} detik). Koneksi server lambat.`);
        timeoutError.name = 'TimeoutError';
        throw timeoutError;
      }

      // Teruskan error yang sudah terformat atau bentuk error jaringan generik
      if (!err.statusCode && err.name === 'TypeError') {
        const networkError = new Error('Terjadi kegagalan jaringan saat menghubungi API. Periksa URL atau koneksi internet.');
        networkError.name = 'NetworkError';
        networkError.originalError = err;
        throw networkError;
      }

      throw err;
    } finally {
      // Bersihkan timer timeout
      clearTimeout(timeoutId);
    }
  }

  // Publikasikan API client ke window
  window.RotiKuAPI = {
    fetchProducts,
    DEFAULT_ENDPOINT: API_CONFIG.DEFAULT_ENDPOINT,
  };
})(window);
