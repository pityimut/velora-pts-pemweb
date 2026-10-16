/**
 * Velora — Main Application Controller
 * Author: Fitri (NIM: 2440304027)
 * Tugas PTS Pemrograman Web — Variasi 027
 * Interactive Product Dashboard — Minimalist White & Lavender
 */

(function (window, document) {
  'use strict';

  // Kurs konversi acuan USD ke Rupiah untuk menampilkan harga Rupiah dari API DummyJSON
  const USD_TO_IDR_RATE = 16000;

  // State Terpusat Aplikasi (Single Source of Truth)
  const state = {
    products: [],              // Data asli dari REST API DummyJSON
    filteredProducts: [],      // Data setelah pencarian/filter/sort
    categories: [],            // Daftar kategori unik dari API
    lastSuccessfulLoad: null,  // Timestamp keberhasilan terakhir (Challenge C=1)
    activeTab: 'all',          // 'all' atau 'favorites'
    searchQuery: '',
    selectedCategory: 'all',
    selectedSort: 'default',
    isLoading: false,
    errorMessage: null,
  };

  // Cache Elemen DOM
  const DOM = {
    // Status Bar & Challenge C=1
    apiStatusDot: document.getElementById('api-status-dot'),
    apiStatusText: document.getElementById('api-status-text'),
    lastUpdatedTime: document.getElementById('last-updated-time'),
    btnRetry: document.getElementById('btn-retry'),
    btnErrorRetry: document.getElementById('btn-error-retry'),
    connectionAlert: document.getElementById('connection-alert'),
    connectionAlertMsg: document.getElementById('connection-alert-message'),

    // Statistik Section
    statTotalProducts: document.getElementById('stat-total-products'),
    statAvgPrice: document.getElementById('stat-avg-price'),
    statMaxPrice: document.getElementById('stat-max-price'),
    statMaxName: document.getElementById('stat-max-name'),
    statUniqueCategories: document.getElementById('stat-unique-categories'),

    // Katalog & Toolbar
    tabAll: document.getElementById('tab-all-products'),
    tabFav: document.getElementById('tab-favorite-products'),
    countAllBadge: document.getElementById('count-all-badge'),
    countFavBadge: document.getElementById('count-fav-badge'),
    navFavBadge: document.getElementById('nav-fav-badge'),
    searchInput: document.getElementById('search-input'),
    categorySelect: document.getElementById('category-select'),
    sortSelect: document.getElementById('sort-select'),
    btnResetFilter: document.getElementById('btn-reset-filter'),

    // States Container
    catalogLoading: document.getElementById('catalog-loading'),
    catalogError: document.getElementById('catalog-error'),
    errorMessage: document.getElementById('error-message'),
    catalogEmpty: document.getElementById('catalog-empty'),
    catalogEmptyTitle: document.getElementById('catalog-empty-title'),
    emptyMessage: document.getElementById('empty-message'),
    productsGrid: document.getElementById('products-grid'),

    // Favorites Section
    favoritesGrid: document.getElementById('favorites-grid'),
    favoritesEmpty: document.getElementById('favorites-empty'),
    btnClearFavorites: document.getElementById('btn-clear-favorites'),

    // Notes Form Section
    noteForm: document.getElementById('note-form'),
    noteProductSelect: document.getElementById('note-product-select'),
    noteText: document.getElementById('note-text'),
    charCounterContainer: document.getElementById('char-counter-container'),
    charCount: document.getElementById('char-count'),
    noteFeedback: document.getElementById('note-feedback'),
    btnSaveNote: document.getElementById('btn-save-note'),
    btnResetNote: document.getElementById('btn-reset-note'),
    savedNotesList: document.getElementById('saved-notes-list'),
    savedNotesCount: document.getElementById('saved-notes-count'),

    // Toast Container
    toastContainer: document.getElementById('toast-container'),
  };

  /**
   * Helper: Format mata uang Rupiah (IDR)
   */
  const rupiahFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  /**
   * Helper: Format mata uang USD dengan Intl.NumberFormat
   */
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /**
   * Menampilkan pesan toast sementara di sudut layar
   * @param {string} message
   * @param {'info'|'success'|'error'} type
   */
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span aria-hidden="true">${icon}</span><span>${escapeHTML(message)}</span>`;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  /**
   * Mencegah XSS dengan meng-escape string HTML
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return String(str || '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Membuat representasi bintang untuk rating produk
   */
  function renderRatingStars(rating) {
    const num = Math.min(Math.max(Number(rating) || 0, 0), 5);
    const fullStars = Math.floor(num);
    const halfStar = num - fullStars >= 0.4 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '½';
    for (let i = 0; i < emptyStars; i++) starsHTML += '☆';
    return starsHTML;
  }

  /**
   * Render kartu produk individual ke elemen DOM
   * @param {Object} product
   * @param {boolean} isFav
   * @returns {HTMLElement}
   */
  function createProductCard(product, isFav = false) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    const title = typeof product.title === 'string' ? product.title : 'Produk Tanpa Nama';
    const category = typeof product.category === 'string' ? product.category : 'Lainnya';
    const priceUSD = Number(product.price) || 0;
    const priceIDR = priceUSD * USD_TO_IDR_RATE;
    const imageUrl = product.thumbnail || (Array.isArray(product.images) && product.images[0]) || '';

    const media = document.createElement('div');
    media.className = 'product-media-wrapper';
    const categoryTag = document.createElement('span');
    categoryTag.className = 'product-category-tag';
    categoryTag.textContent = category;
    media.appendChild(categoryTag);

    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.className = `btn-fav-toggle${isFav ? ' is-favorite' : ''}`;
    favoriteButton.dataset.id = product.id;
    favoriteButton.setAttribute('aria-label', `${isFav ? 'Hapus dari' : 'Tambahkan ke'} favorit: ${title}`);
    favoriteButton.setAttribute('aria-pressed', String(isFav));
    favoriteButton.title = isFav ? 'Hapus dari favorit' : 'Tambahkan ke favorit';
    favoriteButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>';
    media.appendChild(favoriteButton);

    const showImageFallback = () => {
      const fallback = document.createElement('div');
      fallback.className = 'image-fallback';
      fallback.textContent = 'Gambar tidak tersedia';
      return fallback;
    };

    if (imageUrl) {
      const image = document.createElement('img');
      image.className = 'product-thumbnail';
      image.src = imageUrl;
      image.alt = title;
      image.loading = 'lazy';
      image.addEventListener('error', () => image.replaceWith(showImageFallback()), { once: true });
      media.appendChild(image);
    } else {
      media.appendChild(showImageFallback());
    }

    const body = document.createElement('div');
    body.className = 'product-body';
    const heading = document.createElement('h3');
    heading.className = 'product-title';
    heading.textContent = title;

    const footer = document.createElement('div');
    footer.className = 'product-footer';
    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = rupiahFormatter.format(priceIDR);
    footer.append(price);

    body.append(heading, footer);
    card.append(media, body);

    return card;
  }

  /**
   * Render daftar produk ke dalam katalog grid
   */
  function renderProductsGrid() {
    if (!DOM.productsGrid) return;

    DOM.productsGrid.innerHTML = '';

    // Tentukan produk mana yang akan ditampilkan (All vs Favorites)
    let displayList = state.filteredProducts;
    if (state.activeTab === 'favorites') {
      const favIds = window.VeloraStorage.getFavorites();
      displayList = displayList.filter((p) => favIds.some((id) => String(id) === String(p.id)));
    }

    // Tangani Empty State
    if (displayList.length === 0) {
      DOM.productsGrid.style.display = 'none';
      DOM.catalogEmpty.hidden = false;
      const showingFavorites = state.activeTab === 'favorites';
      if (DOM.catalogEmptyTitle) {
        DOM.catalogEmptyTitle.textContent = showingFavorites ? 'Belum ada produk favorit' : 'Tidak ada produk ditemukan';
      }
      if (DOM.emptyMessage) {
        DOM.emptyMessage.textContent = showingFavorites
          ? 'Simpan produk dari katalog untuk melihatnya di sini.'
          : 'Coba ubah kata kunci pencarian atau sesuaikan pilihan filter kategori Anda.';
      }
      if (DOM.btnResetFilter) DOM.btnResetFilter.hidden = showingFavorites;
    } else {
      DOM.catalogEmpty.hidden = true;
      DOM.productsGrid.style.display = 'grid';
      if (DOM.btnResetFilter) DOM.btnResetFilter.hidden = false;

      const favIds = window.VeloraStorage.getFavorites();
      const fragment = document.createDocumentFragment();

      displayList.forEach((product) => {
        const isFav = favIds.some((id) => String(id) === String(product.id));
        const card = createProductCard(product, isFav);
        fragment.appendChild(card);
      });

      DOM.productsGrid.appendChild(fragment);
    }

    // Perbarui badge jumlah di toolbar tab
    updateCountBadges();
  }

  /**
   * Render bagian khusus favorit (#favorites-grid)
   * Mengambil data favorit dari localStorage via VeloraStorage
   */
  function renderFavoritesSection() {
    if (!DOM.favoritesGrid || !DOM.favoritesEmpty) return;

    const favIds = window.VeloraStorage.getFavorites();

    // Saring produk favorit dari data state.products yang sudah dimuat
    const favProducts = state.products.filter((p) => favIds.some((id) => String(id) === String(p.id)));

    DOM.favoritesGrid.innerHTML = '';

    if (favProducts.length === 0) {
      DOM.favoritesGrid.style.display = 'none';
      DOM.favoritesEmpty.hidden = false;
    } else {
      DOM.favoritesEmpty.hidden = true;
      DOM.favoritesGrid.style.display = 'grid';

      const fragment = document.createDocumentFragment();
      favProducts.forEach((product) => {
        const card = createProductCard(product, true);
        fragment.appendChild(card);
      });
      DOM.favoritesGrid.appendChild(fragment);
    }
  }

  /**
   * Menangani aksi klik toggle favorit (Tambah / Hapus)
   * Menyimpan ke localStorage dan memperbarui UI secara reaktif tanpa re-fetch API
   *
   * @param {number|string} productId
   */
  function handleFavoriteToggle(productId) {
    const product = state.products.find((p) => String(p.id) === String(productId));
    const title = product ? product.title : `Produk #${productId}`;

    const result = window.VeloraStorage.toggleFavorite(productId);

    if (result.success) {
      // 1. Update counter badges
      updateCountBadges();

      // 2. Perbarui visual tombol favorit di semua kartu yang ada di layar
      const favButtons = document.querySelectorAll(`.btn-fav-toggle[data-id="${productId}"]`);
      favButtons.forEach((btn) => {
        if (result.isFav) {
          btn.classList.add('is-favorite');
          btn.setAttribute('aria-pressed', 'true');
          btn.setAttribute('aria-label', `Hapus dari favorit: ${title}`);
          btn.setAttribute('title', 'Hapus dari favorit');
        } else {
          btn.classList.remove('is-favorite');
          btn.setAttribute('aria-pressed', 'false');
          btn.setAttribute('aria-label', `Tambahkan ke favorit: ${title}`);
          btn.setAttribute('title', 'Tambahkan ke favorit');
        }
      });

      // 3. Render ulang section favorit
      renderFavoritesSection();

      // 4. Jika pengguna sedang berada di tab 'Favorit Saya' pada katalog, render ulang grid katalog
      if (state.activeTab === 'favorites') {
        renderProductsGrid();
      }

      // 5. Beri feedback notifikasi toast yang ramah
      if (result.isFav) {
        showToast(`⭐ "${title}" ditambahkan ke favorit!`, 'success');
      } else {
        showToast(`🗑️ "${title}" dihapus dari favorit.`, 'info');
      }
    } else {
      showToast('Gagal memperbarui favorit di penyimpanan lokal.', 'error');
    }
  }

  /**
   * Filter, search, and sort logic
   */
  function applyFiltersAndSort() {
    let result = [...state.products];

    // 1. Filter Pencarian (nama produk atau deskripsi)
    if (state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const titleMatch = (p.title || '').toLowerCase().includes(query);
        const descMatch = (p.description || '').toLowerCase().includes(query);
        const categoryMatch = (p.category || '').toLowerCase().includes(query);
        return titleMatch || descMatch || categoryMatch;
      });
    }

    // 2. Filter Kategori
    if (state.selectedCategory !== 'all') {
      result = result.filter((p) => String(p.category).toLowerCase() === state.selectedCategory.toLowerCase());
    }

    // 3. Pengurutan (Sorting)
    switch (state.selectedSort) {
      case 'price-asc':
        result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'rating-desc':
        result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        // Kembalikan ke urutan asli dari API (berdasarkan ID)
        result.sort((a, b) => Number(a.id) - Number(b.id));
        break;
    }

    state.filteredProducts = result;
    renderProductsGrid();
  }

  /**
   * Menghitung dan merender 4 statistik produk secara dinamis menggunakan Array methods:
   * 1. Total produk: Array.length
   * 2. Rata-rata harga: reduce() dengan penanganan aman untuk array kosong (mencegah NaN)
   * 3. Produk harga tertinggi: reduce() untuk mencari produk termahal
   * 4. Jumlah kategori unik: map() + filter() + new Set()
   *
   * @param {Array<Object>} productsList
   */
  function calculateAndRenderStatistics(productsList = []) {
    const list = Array.isArray(productsList) ? productsList : [];
    const count = list.length;

    // 1. Total Produk
    if (DOM.statTotalProducts) {
      DOM.statTotalProducts.textContent = count.toLocaleString('id-ID');
    }

    // 2. Rata-rata Harga (menggunakan reduce, hindari pembagian 0)
    let avgPrice = 0;
    if (count > 0) {
      const totalPrice = list.reduce((accumulator, item) => {
        const priceNum = Number(item.price) || 0;
        return accumulator + priceNum;
      }, 0);
      avgPrice = totalPrice / count;
    }

    if (DOM.statAvgPrice) {
      DOM.statAvgPrice.textContent = rupiahFormatter.format(avgPrice * USD_TO_IDR_RATE);
      DOM.statAvgPrice.title = `Rata-rata: ${currencyFormatter.format(avgPrice)}`;
    }

    // 3. Produk dengan Harga Tertinggi (menggunakan reduce)
    let maxProduct = null;
    if (count > 0) {
      maxProduct = list.reduce((highest, current) => {
        const highestVal = Number(highest.price) || 0;
        const currentVal = Number(current.price) || 0;
        return currentVal > highestVal ? current : highest;
      }, list[0]);
    }

    if (DOM.statMaxPrice) {
      DOM.statMaxPrice.textContent = maxProduct ? rupiahFormatter.format((Number(maxProduct.price) || 0) * USD_TO_IDR_RATE) : 'Rp 0';
    }
    if (DOM.statMaxName) {
      const maxIdr = maxProduct ? rupiahFormatter.format((Number(maxProduct.price) || 0) * USD_TO_IDR_RATE) : '';
      const maxUsd = maxProduct ? currencyFormatter.format(Number(maxProduct.price) || 0) : '';
      DOM.statMaxName.textContent = maxProduct ? maxProduct.title || 'Produk' : 'Tidak ada produk';
      DOM.statMaxName.title = maxProduct ? `${maxProduct.title} (${maxIdr} / ${maxUsd})` : '';
    }

    // 4. Jumlah Kategori Unik (menggunakan map + filter + Set)
    const validCategories = list.map((p) => p.category).filter((cat) => typeof cat === 'string' && cat.trim() !== '');
    const uniqueCategoryCount = new Set(validCategories).size;

    if (DOM.statUniqueCategories) {
      DOM.statUniqueCategories.textContent = uniqueCategoryCount.toLocaleString('id-ID');
    }
  }

  /**
   * Mengisi dropdown opsi kategori di toolbar
   */
  function populateCategoryOptions() {
    if (!DOM.categorySelect) return;

    // Ambil kategori unik menggunakan Set
    const uniqueCats = Array.from(new Set(state.products.map((p) => p.category).filter(Boolean))).sort();
    state.categories = uniqueCats;

    DOM.categorySelect.innerHTML = '<option value="all">Semua Kategori</option>';
    uniqueCats.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      DOM.categorySelect.appendChild(opt);
    });
  }

  /**
   * Mengisi pilihan produk pada formulir catatan (Variasi Z = 7)
   * Disinkronkan langsung dari data REST API yang berhasil dimuat
   */
  function populateNoteProductDropdown() {
    if (!DOM.noteProductSelect) return;

    DOM.noteProductSelect.innerHTML = '<option value="">-- Silakan Pilih Produk dari Data API --</option>';

    if (state.products.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.disabled = true;
      opt.textContent = 'Belum ada produk termuat dari API';
      DOM.noteProductSelect.appendChild(opt);
      return;
    }

    state.products.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      const priceIdr = rupiahFormatter.format((Number(p.price) || 0) * USD_TO_IDR_RATE);
      opt.textContent = `${p.title} (ID: #${p.id} - ${priceIdr})`;
      DOM.noteProductSelect.appendChild(opt);
    });
  }

  /**
   * Menampilkan pesan umpan balik validasi formulir catatan (Error / Success)
   * Menggunakan container dengan atribut aria-live="polite" untuk aksesibilitas
   *
   * @param {'success'|'error'} type
   * @param {string} message
   */
  function setNoteFeedback(type, message) {
    if (!DOM.noteFeedback) return;

    DOM.noteFeedback.hidden = false;
    DOM.noteFeedback.className = `feedback-banner feedback-${type}`;
    const icon = type === 'success' ? '✅' : '⚠️';
    DOM.noteFeedback.innerHTML = `
      <span class="feedback-icon" aria-hidden="true">${icon}</span>
      <div class="feedback-text">
        <strong>${type === 'success' ? 'Berhasil:' : 'Validasi Gagal:'}</strong> ${escapeHTML(message)}
      </div>
    `;
  }

  /**
   * Membersihkan kotak umpan balik formulir catatan
   */
  function clearNoteFeedback() {
    if (!DOM.noteFeedback) return;
    DOM.noteFeedback.hidden = true;
    DOM.noteFeedback.innerHTML = '';
    DOM.noteFeedback.className = 'feedback-banner';
  }

  /**
   * Menghitung karakter secara real-time saat pengguna mengetik di textarea
   * Variasi Z = 7: Menghitung karakter bersih (setelah .trim())
   */
  function handleNoteTextareaInput() {
    if (!DOM.noteText || !DOM.charCount || !DOM.charCounterContainer) return;

    const raw = DOM.noteText.value || '';
    const cleanLength = raw.trim().length;

    DOM.charCount.textContent = cleanLength;

    if (cleanLength >= 30) {
      DOM.charCounterContainer.className = 'char-counter valid';
      DOM.charCounterContainer.innerHTML = `Karakter: <strong id="char-count">${cleanLength}</strong> / 30 minimal (✓ Memenuhi syarat)`;
    } else {
      DOM.charCounterContainer.className = 'char-counter invalid';
      const remaining = 30 - cleanLength;
      DOM.charCounterContainer.innerHTML = `Karakter: <strong id="char-count">${cleanLength}</strong> / 30 minimal (${remaining} lagi)`;
    }
  }

  /**
   * Merender daftar catatan produk tersimpan dari localStorage
   */
  function renderSavedNotes() {
    if (!DOM.savedNotesList) return;

    const notes = window.VeloraStorage.getNotes();

    if (DOM.savedNotesCount) {
      DOM.savedNotesCount.textContent = `${notes.length} Catatan`;
    }

    DOM.savedNotesList.innerHTML = '';

    if (notes.length === 0) {
      DOM.savedNotesList.innerHTML = `
        <div class="empty-notes-hint">
          <p>Belum ada catatan tersimpan.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    notes.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'note-item';
      card.setAttribute('data-note-id', item.id);

      const createdDate = item.createdAt
        ? new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
        : 'Waktu tidak tercatat';

      card.innerHTML = `
        <div class="note-item-header">
          <h4 class="note-item-product">${escapeHTML(item.productTitle)}</h4>
          <button 
            type="button" 
            class="btn-delete-note" 
            data-note-id="${item.id}"
            aria-label="Hapus catatan untuk ${escapeHTML(item.productTitle)}"
            title="Hapus catatan"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
        <p class="note-item-content">${escapeHTML(item.text)}</p>
        <div class="note-item-meta">
          <span>Panjang: <strong>${item.charCount}</strong> karakter</span>
          <time datetime="${item.createdAt}">${createdDate}</time>
        </div>
      `;
      fragment.appendChild(card);
    });

    DOM.savedNotesList.appendChild(fragment);
  }

  /**
   * Menangani pengiriman form catatan produk (Variasi Z = 7)
   * Melakukan validasi ketat:
   * 1. Produk wajib dipilih dari data API
   * 2. Catatan wajib minimal 30 karakter setelah di-trim()
   * 3. Jika tidak valid, gagalkan proses simpan dan tampilkan pesan kesalahan deskriptif
   *
   * @param {Event} e
   */
  function handleNoteFormSubmit(e) {
    e.preventDefault();
    clearNoteFeedback();

    const productId = DOM.noteProductSelect ? DOM.noteProductSelect.value : '';
    const rawText = DOM.noteText ? DOM.noteText.value : '';
    const cleanText = rawText.trim();

    // 1. Validasi Pemilihan Produk
    if (!productId) {
      setNoteFeedback('error', 'Silakan pilih salah satu produk dari data REST API terlebih dahulu.');
      if (DOM.noteProductSelect) DOM.noteProductSelect.focus();
      return;
    }

    // 2. Validasi Panjang Karakter Bersih Minimal 30 (Variasi Z = 7)
    if (cleanText.length < 30) {
      const remaining = 30 - cleanText.length;
      setNoteFeedback(
        'error',
        `Catatan harus berisi minimal 30 karakter setelah spasi di awal dan akhir dibersihkan. Saat ini baru berisi ${cleanText.length} karakter (kurang ${remaining} karakter).`
      );
      if (DOM.noteText) DOM.noteText.focus();
      return;
    }

    // Cari nama produk
    const product = state.products.find((p) => String(p.id) === String(productId));
    const productTitle = product ? product.title : `Produk #${productId}`;

    // 3. Simpan Catatan Valid ke Storage
    const saveSuccess = window.VeloraStorage.saveNote({
      productId,
      productTitle,
      text: cleanText,
      charCount: cleanText.length,
    });

    if (saveSuccess) {
      setNoteFeedback(
        'success',
        `Catatan untuk "${productTitle}" (${cleanText.length} karakter) berhasil divalidasi dan disimpan!`
      );

      // Reset form
      if (DOM.noteText) DOM.noteText.value = '';
      if (DOM.noteProductSelect) DOM.noteProductSelect.value = '';
      handleNoteTextareaInput();

      // Render ulang daftar catatan
      renderSavedNotes();

      showToast(`Catatan untuk "${productTitle}" berhasil disimpan!`, 'success');
    } else {
      setNoteFeedback('error', 'Terjadi kesalahan sistem saat menyimpan catatan ke penyimpanan lokal.');
      showToast('Gagal menyimpan catatan.', 'error');
    }
  }

  /**
   * Memperbarui angka counter pada tab dan navigasi
   */
  function updateCountBadges() {
    const totalCount = state.products.length;
    const favIds = window.VeloraStorage.getFavorites();
    const favCount = favIds.length;

    if (DOM.countAllBadge) DOM.countAllBadge.textContent = totalCount;
    if (DOM.countFavBadge) DOM.countFavBadge.textContent = favCount;
    if (DOM.navFavBadge) DOM.navFavBadge.textContent = favCount;
  }

  /**
   * Mengambil data produk dari API dengan state loading, success, error.
   * Menangani kondisi:
   * 1. Status sukses dan error banner tidak pernah muncul bersamaan.
   * 2. Jika pembaruan gagal tetapi data lama ada, pertahankan data lama dan beri tahu bahwa update gagal.
   * 3. Waktu terakhir sukses hanya diperbarui setelah respons berhasil diproses.
   * 4. Tombol Retry melakukan fetch ulang ke endpoint DummyJSON.
   */
  async function loadProducts(isRetry = false) {
    state.isLoading = true;
    state.errorMessage = null;
    if (DOM.productsGrid) DOM.productsGrid.setAttribute('aria-busy', 'true');

    const hasExistingData = Array.isArray(state.products) && state.products.length > 0;

    // Reset banner peringatan jaringan dan error katalog saat memulai pemuatan baru
    if (DOM.connectionAlert) {
      DOM.connectionAlert.hidden = true;
      DOM.connectionAlert.style.display = 'none';
    }
    if (DOM.catalogError) {
      DOM.catalogError.hidden = true;
      DOM.catalogError.style.display = 'none';
    }
    if (DOM.catalogEmpty) {
      DOM.catalogEmpty.hidden = true;
      DOM.catalogEmpty.style.display = 'none';
    }

    // Jika belum ada data sama sekali, tampilkan spinner loading penuh
    if (!hasExistingData) {
      if (DOM.catalogLoading) {
        DOM.catalogLoading.hidden = false;
        DOM.catalogLoading.style.display = 'block';
      }
      if (DOM.productsGrid) DOM.productsGrid.style.display = 'none';
    }

    // Perbarui Status Bar ke kondisi loading
    if (DOM.apiStatusDot) {
      DOM.apiStatusDot.className = 'status-dot status-loading';
    }
    if (DOM.apiStatusText) {
      if (isRetry) {
        DOM.apiStatusText.textContent = hasExistingData 
          ? 'Mencoba kembali memperbarui data dari REST API...' 
          : 'Mencoba kembali memuat data dari REST API...';
      } else {
        DOM.apiStatusText.textContent = hasExistingData
          ? 'Memperbarui data produk dari REST API...'
          : 'Memuat data dari REST API...';
      }
    }
    if (DOM.btnRetry) {
      DOM.btnRetry.hidden = true;
      DOM.btnRetry.style.display = 'none';
      DOM.btnRetry.disabled = true;
    }
    if (DOM.btnErrorRetry) {
      DOM.btnErrorRetry.disabled = true;
    }

    try {
      // Pastikan Fetch benar-benar memanggil endpoint API
      const data = await window.VeloraAPI.fetchProducts();

      // Simpan produk dalam state
      state.products = Array.isArray(data.products) ? data.products : [];
      state.filteredProducts = [...state.products];

      // Pastikan peringatan jaringan dan tombol retry benar-benar tertutup saat berhasil
      if (DOM.connectionAlert) {
        DOM.connectionAlert.hidden = true;
        DOM.connectionAlert.style.display = 'none';
      }
      if (DOM.btnRetry) {
        DOM.btnRetry.hidden = true;
        DOM.btnRetry.style.display = 'none';
      }

      // Sembunyikan loading
      if (DOM.catalogLoading) {
        DOM.catalogLoading.hidden = true;
        DOM.catalogLoading.style.display = 'none';
      }

      // Hitung dan render 4 statistik produk secara dinamis
      calculateAndRenderStatistics(state.products);

      // Populate filter kategori
      populateCategoryOptions();

      // Populate pilihan produk pada form catatan (Variasi Z = 7)
      populateNoteProductDropdown();

      // Render katalog
      applyFiltersAndSort();

      // Render bagian produk favorit tersimpan
      renderFavoritesSection();

      // Render daftar catatan kurasi produk tersimpan
      renderSavedNotes();

      // Catat waktu hanya setelah seluruh data berhasil diproses dan ditampilkan
      const now = new Date();
      state.lastSuccessfulLoad = now;
      if (DOM.lastUpdatedTime) {
        DOM.lastUpdatedTime.textContent = `${now.toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'medium',
          timeZone: 'Asia/Jakarta',
        })} WIB`;
      }
      if (DOM.apiStatusDot) DOM.apiStatusDot.className = 'status-dot status-success';
      if (DOM.apiStatusText) DOM.apiStatusText.textContent = `Berhasil (${state.products.length} produk termuat)`;
      if (DOM.productsGrid) DOM.productsGrid.setAttribute('aria-busy', 'false');

      if (isRetry) {
        showToast('Data produk berhasil diperbarui!', 'success');
      }
    } catch (err) {
      console.warn('[Velora App] Kesalahan saat mengambil produk:', err);
      state.errorMessage = err.message || 'Gagal memuat data dari server.';

      // Sembunyikan loading
      if (DOM.catalogLoading) {
        DOM.catalogLoading.hidden = true;
        DOM.catalogLoading.style.display = 'none';
      }

      // Cek apakah data lama masih tersedia
      const stillHasData = Array.isArray(state.products) && state.products.length > 0;

      if (stillHasData) {
        // DATA LAMA TETAP DIPERTAHANKAN
        if (DOM.productsGrid) DOM.productsGrid.style.display = 'grid';
        if (DOM.catalogError) {
          DOM.catalogError.hidden = true;
          DOM.catalogError.style.display = 'none';
        }

        // Status bar menjelaskan bahwa pembaruan gagal dan menampilkan data sebelumnya
        if (DOM.apiStatusDot) {
          DOM.apiStatusDot.className = 'status-dot status-error';
        }
        if (DOM.apiStatusText) {
          DOM.apiStatusText.textContent = 'Gagal memperbarui data';
        }

        // Tampilkan banner peringatan jaringan
        if (DOM.connectionAlert) {
          const alertTitle = document.getElementById('connection-alert-title');
          if (alertTitle) alertTitle.textContent = 'Gagal memuat ulang data:';
          if (DOM.connectionAlertMsg) {
            DOM.connectionAlertMsg.textContent = state.errorMessage;
          }
          DOM.connectionAlert.hidden = false;
          DOM.connectionAlert.style.display = 'flex';
        }

        // Tampilkan tombol Retry di status bar
        if (DOM.btnRetry) {
          DOM.btnRetry.hidden = false;
          DOM.btnRetry.style.display = 'inline-flex';
        }

        showToast('Gagal memperbarui data. Menampilkan data sebelumnya.', 'error');
      } else {
        // BELUM ADA DATA SEBELUMNYA SAMA SEKALI
        if (DOM.productsGrid) DOM.productsGrid.style.display = 'none';
        if (DOM.catalogError) {
          DOM.catalogError.hidden = false;
          DOM.catalogError.style.display = 'block';
          if (DOM.errorMessage) {
            DOM.errorMessage.textContent = state.errorMessage;
          }
        }

        // Perbarui Status Bar menjadi error
        if (DOM.apiStatusDot) {
          DOM.apiStatusDot.className = 'status-dot status-error';
        }
        if (DOM.apiStatusText) {
          DOM.apiStatusText.textContent = 'Koneksi API Gagal';
        }

        if (DOM.btnRetry) DOM.btnRetry.hidden = true;

        showToast(`Gagal memuat data: ${state.errorMessage}`, 'error');
      }
    } finally {
      state.isLoading = false;
      if (DOM.productsGrid) DOM.productsGrid.setAttribute('aria-busy', 'false');
      if (DOM.btnRetry) DOM.btnRetry.disabled = false;
      if (DOM.btnErrorRetry) DOM.btnErrorRetry.disabled = false;
    }
  }

  // Setup Event Listeners Awal
  function setupInitialListeners() {
    const navLinks = Array.from(document.querySelectorAll('.app-nav .nav-link'));
    const updateActiveNavigation = (hash) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === hash;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener('click', () => updateActiveNavigation(link.getAttribute('href')));
    });
    window.addEventListener('hashchange', () => updateActiveNavigation(window.location.hash));
    if (window.location.hash) updateActiveNavigation(window.location.hash);

    // Retry button di status bar & error state
    if (DOM.btnRetry) {
      DOM.btnRetry.addEventListener('click', () => loadProducts(true));
    }
    if (DOM.btnErrorRetry) {
      DOM.btnErrorRetry.addEventListener('click', () => loadProducts(true));
    }

    // Input Search dengan debounce ringan
    if (DOM.searchInput) {
      let debounceTimeout;
      DOM.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          state.searchQuery = e.target.value;
          applyFiltersAndSort();
        }, 200);
      });
    }

    // Filter Kategori
    if (DOM.categorySelect) {
      DOM.categorySelect.addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        applyFiltersAndSort();
      });
    }

    // Sort Dropdown
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.selectedSort = e.target.value;
        applyFiltersAndSort();
      });
    }

    // Tombol Reset Filter pada Empty State
    if (DOM.btnResetFilter) {
      DOM.btnResetFilter.addEventListener('click', () => {
        state.searchQuery = '';
        state.selectedCategory = 'all';
        state.selectedSort = 'default';
        if (DOM.searchInput) DOM.searchInput.value = '';
        if (DOM.categorySelect) DOM.categorySelect.value = 'all';
        if (DOM.sortSelect) DOM.sortSelect.value = 'default';
        applyFiltersAndSort();
      });
    }

    // Tab Filter (All vs Favorites)
    if (DOM.tabAll) {
      DOM.tabAll.addEventListener('click', () => {
        state.activeTab = 'all';
        DOM.tabAll.classList.add('active');
        DOM.tabAll.setAttribute('aria-pressed', 'true');
        DOM.tabFav.classList.remove('active');
        DOM.tabFav.setAttribute('aria-pressed', 'false');
        renderProductsGrid();
      });
    }

    if (DOM.tabFav) {
      DOM.tabFav.addEventListener('click', () => {
        state.activeTab = 'favorites';
        DOM.tabFav.classList.add('active');
        DOM.tabFav.setAttribute('aria-pressed', 'true');
        DOM.tabAll.classList.remove('active');
        DOM.tabAll.setAttribute('aria-pressed', 'false');
        renderProductsGrid();
      });
    }

    // Event Delegation: Toggle Favorit pada Katalog Grid
    if (DOM.productsGrid) {
      DOM.productsGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.btn-fav-toggle');
        if (favBtn) {
          const productId = favBtn.getAttribute('data-id');
          if (productId) {
            handleFavoriteToggle(productId);
          }
        }
      });
    }

    // Event Delegation: Toggle Favorit pada Section Favorit Grid
    if (DOM.favoritesGrid) {
      DOM.favoritesGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.btn-fav-toggle');
        if (favBtn) {
          const productId = favBtn.getAttribute('data-id');
          if (productId) {
            handleFavoriteToggle(productId);
          }
        }
      });
    }

    // Tombol Hapus Semua Favorit
    if (DOM.btnClearFavorites) {
      DOM.btnClearFavorites.addEventListener('click', () => {
        const currentFavs = window.VeloraStorage.getFavorites();
        if (currentFavs.length === 0) {
          showToast('Daftar favorit sudah dalam keadaan kosong.', 'info');
          return;
        }

        const confirmClear = window.confirm('Apakah Anda yakin ingin menghapus semua produk dari daftar favorit?');
        if (confirmClear) {
          window.VeloraStorage.clearAllFavorites();
          updateCountBadges();
          renderFavoritesSection();
          renderProductsGrid();
          showToast('Seluruh daftar favorit berhasil dibersihkan.', 'info');
        }
      });
    }

    // Formulir Catatan Produk (Variasi Z = 7)
    if (DOM.noteText) {
      DOM.noteText.addEventListener('input', handleNoteTextareaInput);
    }

    if (DOM.noteForm) {
      DOM.noteForm.addEventListener('submit', handleNoteFormSubmit);
    }

    if (DOM.btnResetNote) {
      DOM.btnResetNote.addEventListener('click', () => {
        clearNoteFeedback();
        setTimeout(handleNoteTextareaInput, 10);
      });
    }

    // Event Delegation: Hapus Catatan Tersimpan
    if (DOM.savedNotesList) {
      DOM.savedNotesList.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.btn-delete-note');
        if (delBtn) {
          const noteId = delBtn.getAttribute('data-note-id');
          if (noteId && window.confirm('Apakah Anda yakin ingin menghapus catatan produk ini?')) {
            window.VeloraStorage.deleteNote(noteId);
            renderSavedNotes();
            showToast('Catatan produk berhasil dihapus.', 'info');
          }
        }
      });
    }
  }

  // Inisialisasi Aplikasi saat DOM Siap
  document.addEventListener('DOMContentLoaded', () => {
    setupInitialListeners();
    handleNoteTextareaInput();
    renderSavedNotes();
    loadProducts();
  });

  // Ekspor internal state untuk keperluan pengujian
  const VeloraApp = {
    state,
    DOM,
    loadProducts,
    applyFiltersAndSort,
  };

  window.__VeloraApp = VeloraApp;
  // Alias backward-compatibility
  window.__RotiKuApp = VeloraApp;
})(window, document);
