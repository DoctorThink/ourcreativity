```markdown
# OUR CREATIVITY - Website Repository

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- Add other badges as needed: build status, deployment status, etc. -->
<!-- ![Build Status](...) -->

**Dimana imajinasi bertemu dengan inovasi.**

Selamat datang di repositori resmi untuk website **OUR CREATIVITY**. Platform digital ini dirancang sebagai wadah bagi para kreator muda Indonesia untuk belajar, berdiskusi, berkolaborasi, dan menampilkan karya mereka.

**[Link to Live Site]** <!-- Ganti dengan URL website Anda yang sudah di-deploy -->

## ✨ Fitur Utama

*   **Antarmuka Modern & Intuitif:** Mengadopsi filosofi desain "Creative Constellations" dengan inspirasi iOS, menampilkan tema gelap yang elegan, kartu-kartu dengan sudut membulat, dan efek kedalaman (`backdrop-blur`).
*   **Bento Grid Homepage:** Tata letak homepage yang unik dan menarik untuk navigasi utama.
*   **Animasi Dinamis:** Menggunakan `framer-motion` untuk transisi halaman yang mulus dan animasi interaktif yang halus (hover, tap, scroll parallax).
*   **Fokus Komunitas:** Halaman khusus untuk menampilkan tim (`Tim Kami`), berbagi cerita (`Brand Story`), dan informasi komunitas (`Informasi`) termasuk cara bergabung.
*   **Desain Responsif:** Tampilan yang dioptimalkan untuk berbagai ukuran layar, dari desktop hingga mobile.
*   **Tipografi Jelas:** Kombinasi font Serif (Playfair Display) untuk judul dan Sans-serif (Inter) untuk teks tubuh memastikan keterbacaan dan hierarki visual.
*   **Manajemen Konten (Admin):** Panel admin terproteksi (`/our-admin`) untuk mengelola pengumuman, anggota tim, dan konten halaman lainnya (sebagian masih dalam pengembangan).

## 📸 Tampilan (Contoh)

<!-- Sisipkan beberapa screenshot kunci di sini -->
<!--
[Screenshot of Homepage - Bento Grid]
[Screenshot of Tim Kami Page]
[Screenshot of Informasi Page]
[Screenshot of Admin Dashboard]
-->

## 💻 Tumpukan Teknologi (Tech Stack)

*   **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Accordion, Button, Card, Input, Tabs, dll.)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **State Management:** React Context API (Contoh: `AdminAuthContext`)
*   **Backend/Database (Potensial):** [Supabase](https://supabase.com/) (dilihat dari struktur integrasi, perlu konfirmasi penggunaan)
*   **Deployment:** <!-- Sebutkan platform hosting Anda, misal: Vercel, Netlify, GitHub Pages -->

## 📁 Struktur Proyek

```plaintext
/public/
  /lovable-uploads/       # Asset gambar (logo, ikon tim, dll.)
  favicon.ico
  ...
/src/
  /components/
    /admin/               # Komponen khusus Admin Panel
    /layouts/             # Komponen layout halaman (PageLayout)
    /ui/                  # Komponen UI dari Shadcn
    TeamMemberBio.tsx
    TeamMemberCard.tsx
    ...
  /contexts/              # Penyedia Context (misal: AdminAuthContext)
  /hooks/                 # Custom Hooks (misal: use-mobile)
  /integrations/          # Integrasi layanan eksternal (misal: Supabase)
  /lib/                   # Fungsi utilitas (utils.ts)
  /pages/                 # Komponen halaman (Index, TimKami, Informasi, AdminLogin, dll.)
  App.tsx                 # Pengaturan routing utama
  main.tsx                # Titik masuk aplikasi React
  index.css               # Style global, variabel CSS, Tailwind directives
  ...
tailwind.config.ts        # Konfigurasi Tailwind CSS
vite.config.ts            # Konfigurasi Vite bundler
...                       # File konfigurasi lainnya (tsconfig, postcss, eslint)
```

## 🚀 Memulai (Getting Started)

Untuk menjalankan proyek ini secara lokal:

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/USERNAME/REPO_NAME.git # Ganti USERNAME/REPO_NAME
    cd REPO_NAME
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **(Jika Diperlukan) Setup Environment Variables:**
    Jika proyek menggunakan layanan seperti Supabase, buat file `.env` di root proyek dan tambahkan variabel yang diperlukan (misal: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Lihat file `.env.example` jika tersedia.

4.  **Jalankan development server:**
    ```bash
    npm run dev
    # atau
    yarn dev
    ```

5.  Buka browser Anda dan navigasi ke `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

## 🔒 Admin Section

*   Akses panel admin tersedia di route `/our-admin`.
*   Login dilindungi dengan password (dikelola via `AdminAuthContext`).
*   Fitur saat ini memungkinkan pengelolaan pengumuman dan anggota tim. Fitur pengelolaan konten halaman lain mungkin sedang dalam pengembangan.

## ✨ Branding & Desain

Website ini mengimplementasikan konsep **"Creative Constellations"**:

*   **Tema:** Dominan gelap (`#1C1C1E`, `#2C2C2E`) dengan teks putih/abu-abu cerah.
*   **Warna Aksen:** Lavender (`#9B6DFF`), Mint/Teal (`#40E0D0`), Coral/Peach (`#FF7F50`), Soft Pink, Amber digunakan secara strategis untuk highlight, kategori, dan efek visual (glow).
*   **Visual:** Terinspirasi iOS (kartu rounded, `backdrop-blur`), motif lingkaran, gradien halus, animasi dinamis, ikonografi konsisten (Lucide).
*   **Tipografi:** Judul menggunakan font Serif (Playfair Display), teks tubuh menggunakan font Sans-serif (Inter) untuk keseimbangan antara keanggunan dan keterbacaan.
*   **Tujuan:** Menciptakan ruang digital yang imersif, modern, fungsional, dan mencerminkan semangat komunitas kreatif muda Indonesia.

## 📜 Changelog (Perubahan Terbaru)

*   **v3.5.x (April 2024 - Ongoing)**
    *   Implementasi kartu "Bergabung dengan Komunitas Kami" yang disempurnakan di halaman Informasi.
        *   Menggabungkan Linktree dan link WhatsApp langsung.
        *   Menambahkan animasi glow pada judul dan tombol.
        *   Menambahkan animasi pada ikon dan elemen dekoratif.
        *   Memperbaiki layout footer agar lebih mobile-friendly.
        *   Memperbarui link designer credit ke `bit.ly/Ardelyo`.
        *   Menambahkan efek hover lebih menarik pada link WhatsApp.
    *   Pengembangan awal panel Admin (`/our-admin`) dengan fitur login dan tab dasar (Pengumuman, Tim, Konten, Info).
    *   Integrasi data anggota tim lengkap dengan bio dan prestasi ke dalam `TeamMemberCard` dan `TimKami.tsx`.
    *   Perbaikan interaktivitas dropdown bio di kartu anggota tim.

*   **v3.5.0 (Awal April 2024) - Wajah Baru OurCreativity**
    *   **Desain Ulang Total:** Mengimplementasikan konsep desain "Creative Constellations".
    *   **Homepage Baru:** Mengadopsi layout Bento Grid yang dinamis.
    *   **UI Kit:** Migrasi ke Shadcn UI untuk komponen dasar.
    *   **Animasi Lanjutan:** Integrasi Framer Motion untuk transisi halaman dan animasi elemen yang lebih kaya.
    *   **Background Dinamis:** Menambahkan latar belakang animasi dengan gradien bergerak, blur, dan efek parallax.
    *   **Styling Terpusat:** Pemanfaatan CSS Variables secara ekstensif di `index.css` untuk theming dan efek (termasuk glow).
    *   **Komponen Baru:** Pembuatan `PageLayout` yang lebih canggih, `TeamMemberCard`, `TeamMemberBio`.
    *   **Peningkatan Struktur Kode:** Refactoring komponen dan layout.

*   **Versi Sebelumnya (Contoh)**
    *   Penambahan Halaman `/tim-kami` dan `/informasi` dasar.
    *   Implementasi awal komponen `TeamMember`.
    *   Setup dasar proyek dengan React, Vite, dan Tailwind.

## 🤝 Berkontribusi

Kontribusi dipersilakan! Silakan buka *issue* untuk melaporkan bug atau mengusulkan fitur baru. Jika Anda ingin berkontribusi kode, silakan *fork* repositori ini dan buat *pull request*.

<!-- (Optional) > Lihat panduan kontribusi kami di `CONTRIBUTING.md` untuk detail lebih lanjut. -->

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 📞 Kontak & Kredit

*   **Desain oleh:** [@ardel.yo](https://bit.ly/Ardelyo)
*   **Hubungi Komunitas:** [Linktree OUR CREATIVITY](https://linktr.ee/ourcreativity.ofc)

---

*README ini dibuat berdasarkan analisis kode dan informasi yang tersedia. Silakan sesuaikan detail seperti link live site, screenshot, dan platform deployment.*
```
