# Rencana Aksi Optimasi Performa Website

Berdasarkan diskusi, berikut adalah rencana aksi detail untuk mengoptimalkan performa website (React, Vite, Node.js API, Supabase/PostgreSQL), dengan fokus pada kelambatan galeri gambar dan animasi transisi halaman.

**Fase 1: Diagnosis & Benchmarking Awal**

1.  **Pengukuran Baseline:**
    *   Gunakan Google Lighthouse (di Chrome DevTools) dan/atau PageSpeed Insights untuk mengukur metrik performa *Core Web Vitals* (LCP, FID/INP, CLS) dan skor performa keseluruhan untuk halaman-halaman kunci:
        *   Halaman Utama (`index.tsx` atau serupa)
        *   Halaman Galeri Karya (`src/pages/KaryaKami.tsx`)
        *   Halaman Pengumuman (`src/pages/Pengumuman.tsx`)
    *   Catat skor awal sebagai *benchmark*.
2.  **Analisis Network:**
    *   Buka halaman Galeri Karya (`KaryaKami.tsx`) dan gunakan tab "Network" di Chrome DevTools (nonaktifkan cache).
    *   Identifikasi aset (terutama gambar) yang berukuran besar dan membutuhkan waktu lama untuk dimuat.
    *   Perhatikan jumlah total request HTTP dan ukuran total halaman.
3.  **Profiling Komponen & Animasi:**
    *   Gunakan React DevTools Profiler untuk menganalisis rendering komponen saat navigasi antar halaman (transisi). Identifikasi komponen yang re-render tidak perlu atau memakan waktu lama.
    *   Gunakan tab "Performance" di Chrome DevTools untuk merekam aktivitas saat transisi halaman. Cari *long tasks* atau *layout thrashing* yang menyebabkan animasi patah-patah.

**Fase 2: Optimasi Frontend**

1.  **Optimasi Aset (Build & Bundling):**
    *   **Verifikasi Build Vite:** Pastikan konfigurasi Vite (`vite.config.ts`) sudah optimal untuk production build (minifikasi CSS/JS/HTML otomatis oleh Vite).
    *   **Code Splitting:** Implementasikan *dynamic imports* (`import()`) untuk komponen halaman (Routes) atau komponen besar yang tidak langsung dibutuhkan saat load awal. Ini akan mengurangi ukuran bundle JavaScript awal.
        ```typescript
        // Contoh di routing
        const KaryaKamiPage = React.lazy(() => import('./pages/KaryaKami'));
        // ... gunakan dengan <React.Suspense>
        ```
2.  **Optimasi Gambar (Fokus Halaman Galeri):**
    *   **Lazy Loading:** Terapkan *native lazy loading* pada elemen `<img>` di galeri.
        ```html
        <img src="karya.jpg" loading="lazy" alt="..." width="300" height="200" />
        ```
    *   **Format Modern & Ukuran Responsif:**
        *   Gunakan format gambar modern seperti **WebP** atau **AVIF** yang menawarkan kompresi lebih baik. Pertimbangkan menggunakan fitur transformasi gambar Supabase Storage (jika tersedia di paket Anda) atau skrip build untuk mengonversi gambar saat upload/build.
        *   Sajikan ukuran gambar yang berbeda berdasarkan ukuran layar menggunakan `srcset` attribute atau elemen `<picture>`.
        ```html
        <picture>
          <source srcset="karya-large.webp" media="(min-width: 1024px)" type="image/webp">
          <source srcset="karya-medium.webp" media="(min-width: 640px)" type="image/webp">
          <source srcset="karya-small.webp" type="image/webp">
          <source srcset="karya-large.jpg" media="(min-width: 1024px)">
          <source srcset="karya-medium.jpg" media="(min-width: 640px)">
          <img src="karya-small.jpg" alt="..." loading="lazy" width="300" height="200">
        </picture>
        ```
    *   **Dimensi Eksplisit:** Selalu sertakan atribut `width` dan `height` pada `<img>` untuk mencegah *Cumulative Layout Shift* (CLS) saat gambar dimuat.
    *   **Placeholder:** Gunakan placeholder (SVG ringan seperti `public/placeholder.svg` atau LQIP) untuk mengisi ruang sebelum gambar asli dimuat.
3.  **Caching Browser:**
    *   Periksa header HTTP `Cache-Control` yang dikirim oleh Vercel (otomatis untuk aset statis) dan Node.js API Anda. Pastikan aset statis (CSS, JS, Font, Gambar) memiliki *cache lifetime* yang panjang.
4.  **Request HTTP:**
    *   Tinjau kembali panggilan API ke Node.js atau Supabase. Jika ada banyak request kecil yang bisa digabungkan menjadi satu, lakukan refactoring.
5.  **Optimasi Font Web:**
    *   Pastikan properti CSS `font-display: swap;` digunakan untuk font web agar teks tetap terlihat saat font sedang dimuat.
    *   Jika memungkinkan, *self-host* font daripada memuat dari layanan eksternal untuk mengurangi lookup DNS.

**Fase 3: Optimasi Backend & Server**

1.  **Caching Sisi Server (Node.js API):**
    *   Jika API Node.js Anda menyajikan data yang jarang berubah, implementasikan strategi caching (misalnya, in-memory cache sederhana atau Redis jika skala lebih besar) untuk mengurangi beban database dan mempercepat respons.
2.  **Optimasi Database (Supabase/PostgreSQL):**
    *   **Analisis Query Galeri:** Periksa query SQL yang digunakan untuk mengambil data karya dari Supabase. Gunakan `EXPLAIN ANALYZE` di Supabase SQL Editor untuk melihat rencana eksekusi.
    *   **Indexing:** Pastikan ada *index* pada kolom yang sering digunakan untuk *filtering* (misalnya, `category_id`) atau *sorting* (misalnya, `created_at`, `title`) di tabel karya Anda.
    *   **Pagination:** Implementasikan pagination yang efisien (misalnya, *cursor-based pagination* jika memungkinkan) pada query galeri untuk memuat data secara bertahap, bukan sekaligus.
3.  **Konfigurasi Server/Hosting (Vercel):**
    *   Vercel secara default menggunakan CDN global. Pastikan tidak ada konfigurasi khusus yang menghambat ini. Umumnya, Vercel sudah sangat teroptimasi.

**Fase 4: Peningkatan Kelancaran & User Experience (Fokus Transisi)**

1.  **Optimasi Animasi Transisi:**
    *   **Prioritaskan CSS:** Jika memungkinkan, gunakan CSS Transitions atau Animations untuk efek transisi halaman karena lebih efisien (berjalan di *compositor thread*).
    *   **JS Animation:** Jika menggunakan library JS (seperti Framer Motion), pastikan:
        *   Animasi tidak terlalu kompleks (hindari animasi pada properti yang memicu *layout* seperti `width`, `height`, `top`, `left`). Animasikan `transform` dan `opacity`.
        *   Gunakan `will-change` property CSS dengan bijak pada elemen yang akan dianimasikan.
        *   Pastikan library menggunakan `requestAnimationFrame` secara internal.
    *   **Sederhanakan:** Pertimbangkan untuk menyederhanakan atau mempercepat durasi animasi jika masih terasa berat.
2.  **Hindari Layout Thrashing:**
    *   Saat memanipulasi DOM atau style dalam JavaScript selama transisi, hindari pola membaca properti layout (seperti `element.offsetHeight`) segera setelah mengubah style. Kelompokkan pembacaan dan penulisan DOM secara terpisah.
3.  **Rendering React yang Efisien:**
    *   Gunakan `React.memo` untuk membungkus komponen yang tidak perlu re-render jika props-nya tidak berubah.
    *   Gunakan `useCallback` untuk memoize fungsi callback yang diteruskan ke komponen anak (terutama jika fungsi tersebut adalah dependency dari `useEffect` atau diteruskan ke komponen yang di-memoize).
    *   Gunakan `useMemo` untuk memoize hasil komputasi yang mahal.
    *   Pastikan *data fetching* atau komputasi berat tidak terjadi di tengah-tengah animasi transisi yang dapat memblokir *main thread*.

**Fase 5: Kompatibilitas & Pengujian**

1.  **Pengujian Lintas Browser:** Uji website secara menyeluruh di versi terbaru Chrome, Firefox, Safari, dan Edge.
2.  **Pengujian Lintas Perangkat:** Uji di berbagai ukuran layar (desktop, tablet, mobile) menggunakan DevTools dan perangkat fisik jika memungkinkan.
3.  **Iterasi:** Setelah menerapkan perubahan, ulangi Fase 1 (Diagnosis & Benchmarking) untuk mengukur dampaknya dan identifikasi area optimasi lebih lanjut jika diperlukan.

**Visualisasi Rencana (Mermaid Diagram):**

```mermaid
graph TD
    A[Fase 1: Diagnosis & Benchmarking] --> B(Ukur Baseline - Lighthouse);
    A --> C(Analisis Network - DevTools);
    A --> D(Profiling Komponen/Animasi - React DevTools/Performance Tab);

    B & C & D --> E[Fase 2: Optimasi Frontend];
    E --> F(Aset: Build Vite & Code Splitting);
    E --> G(Gambar: Lazy Load, Format Modern, Ukuran Responsif, Placeholder);
    E --> H(Caching Browser: Cache-Control);
    E --> I(Request HTTP: Konsolidasi API Call);
    E --> J(Font: font-display: swap);

    C & D --> K[Fase 3: Optimasi Backend & Server];
    K --> L(Server Cache: Node.js API);
    K --> M(Database: Indexing, Pagination, Query Analysis - Supabase);
    K --> N(Hosting: Cek Konfigurasi CDN - Vercel);

    D --> O[Fase 4: Peningkatan Kelancaran UX];
    O --> P(Animasi: Prioritaskan CSS, Optimasi JS Anim, Sederhanakan);
    O --> Q(Hindari Layout Thrashing);
    O --> R(Rendering React: memo, useCallback, useMemo);

    F & G & H & I & J & L & M & N & P & Q & R --> S[Fase 5: Kompatibilitas & Pengujian];
    S --> T(Tes Lintas Browser & Perangkat);
    S --> U(Ukur Ulang & Iterasi);

    U --> V{Selesai?};
    V -- Tidak --> A;
    V -- Ya --> W[Implementasi Selesai];

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#ccf,stroke:#333,stroke-width:2px
    style K fill:#cfc,stroke:#333,stroke-width:2px
    style O fill:#ffc,stroke:#333,stroke-width:2px
    style S fill:#fcc,stroke:#333,stroke-width:2px