# Project File List

A comprehensive overview of all files and directories in the project, with descriptions.

---

## Root Directory (`ourcreativity/`)

- **.gitignore** — Specifies intentionally untracked files to ignore in Git.
- **bun.lockb** — Lockfile for Bun package manager, ensuring consistent installs.
- **components.json** — Likely a configuration or manifest for project components.
- **eslint.config.js** — ESLint configuration for linting JavaScript/TypeScript code.
- **index.html** — Main HTML entry point for the web application.
- **package-lock.json** — NPM lockfile to ensure consistent dependency installs.
- **package.json** — Project manifest: dependencies, scripts, metadata.
- **postcss.config.js** — Configuration for PostCSS CSS processing.
- **README.md** — Project overview and documentation.
- **tailwind.config.ts** — Tailwind CSS configuration in TypeScript.
- **tsconfig.app.json** — TypeScript configuration specific to the app build.
- **tsconfig.json** — Base TypeScript configuration.
- **tsconfig.node.json** — TypeScript config for Node.js environment.
- **vite.config.ts** — Vite build tool configuration.
- **workflow.md** — Documentation of project workflows or processes.

---

## `public/`

- **favicon.ico** — Website favicon.
- **og-image.png** — Open Graph image for social sharing previews.
- **placeholder.svg** — Placeholder SVG image.

### `public/lovable-uploads/`

Various uploaded media assets:

- **0bec5fdf-43d7-47af-b1cd-ba7fd2b949ec.png** — Uploaded image.
- **1bc77d08-6f95-4b60-96cc-b027d8f3be4d.png** — Uploaded image.
- **595d8581-6612-482f-8275-a6a2735f9d57.png** — Uploaded image.
- **a82afd70-9de5-4764-9dd5-af747ae8405f.png** — Uploaded image.
- **b6d89970-6471-4763-b7de-f7b863e538da.png** — Uploaded image.
- **bot.png** — Bot-related image asset.
- **c3ebd3bb-9f56-4e8c-af6f-a72b010941c8.png** — Uploaded image.
- **c861a7c0-5ec9-4bac-83ea-319c40fcb001.png** — Uploaded image.
- **design.png** — Design-related image asset.
- **E. BOT** — Possibly a directory or file related to bot assets (uncertain without extension).
- **f8326a6b-e1d4-4ae9-9786-448a5e0d8688.png** — Uploaded image.
- **game.png** — Game-related image asset.
- **karyatulis.png** — Image related to written works.
- **meme.png** — Meme image asset.
- **video.png** — Video-related image asset.

---

## `src/`

### Root of `src/`

- **App.css** — Global styles for the React app.
- **App.tsx** — Main React application component.
- **index.css** — Additional global styles.
- **main.tsx** — React entry point, bootstraps the app.
- **vite-env.d.ts** — Vite-specific TypeScript environment declarations.

### `src/components/`

- **About.tsx** — "About" page/component.
- **Contact.tsx** — "Contact" page/component.
- **Hero.tsx** — Hero section component.
- **PageTransition.tsx** — Handles page transition animations.
- **TeamMember.tsx** — Displays individual team member info.
- **TeamMemberBio.tsx** — Detailed biography for a team member.
- **TeamMemberCard.tsx** — Card UI for team members.

#### `src/components/admin/`

- **AnnouncementEditor.tsx** — Admin interface for editing announcements.
- **ContentEditor.tsx** — Admin content management editor.
- **RequireAuth.tsx** — Component enforcing admin authentication.
- **TeamEditor.tsx** — Admin interface for managing team members.

#### `src/components/layouts/`

- **PageLayout.tsx** — Layout wrapper for pages.

#### `src/components/ui/`

Reusable UI components:

- **accordion.tsx** — Accordion UI component.
- **alert-dialog.tsx** — Alert dialog modal component.
- **alert.tsx** — Alert message component.
- **aspect-ratio.tsx** — Maintains aspect ratio for elements.
- **avatar.tsx** — User avatar component.
- **badge.tsx** — Badge/label component.
- **breadcrumb.tsx** — Breadcrumb navigation.
- **button.tsx** — Button component.
- **calendar.tsx** — Calendar/date picker component.
- **card.tsx** — Card UI container.
- **carousel.tsx** — Carousel/slider component.
- **chart.tsx** — Chart/graph component.
- **checkbox.tsx** — Checkbox input component.
- **collapsible.tsx** — Collapsible content container.
- **command.tsx** — Command palette component.
- **context-menu.tsx** — Context menu component.
- **dialog.tsx** — Dialog/modal component.
- **drawer.tsx** — Drawer/side panel component.
- **dropdown-menu.tsx** — Dropdown menu component.
- **form.tsx** — Form wrapper and controls.
- **hover-card.tsx** — Hover-triggered card.
- **input-otp.tsx** — OTP (One-Time Password) input component.
- **input.tsx** — Text input component.
- **label.tsx** — Form label component.
- **menubar.tsx** — Menu bar navigation.
- **navigation-menu.tsx** — Navigation menu component.
- **pagination.tsx** — Pagination controls.
- **popover.tsx** — Popover overlay component.
- **progress.tsx** — Progress bar component.
- **radio-group.tsx** — Radio button group.
- **resizable.tsx** — Resizable container.
- **scroll-area.tsx** — Scrollable area component.
- **select.tsx** — Select/dropdown input.
- **separator.tsx** — Separator/divider line.
- **sheet.tsx** — Sheet/modal component.
- **sidebar.tsx** — Sidebar navigation.
- **skeleton.tsx** — Skeleton loading placeholder.
- **slider.tsx** — Slider input component.
- **sonner.tsx** — Likely a notification/toast component.
- **switch.tsx** — Toggle switch component.
- **table.tsx** — Table component.
- **tabs.tsx** — Tab navigation component.
- **textarea.tsx** — Textarea input component.
- **toast.tsx** — Toast notification component.
- **toaster.tsx** — Toast notification container.
- **toggle-group.tsx** — Toggle button group.
- **toggle.tsx** — Toggle button component.
- **tooltip.tsx** — Tooltip component.
- **use-toast.ts** — Custom hook for toast notifications.

### `src/contexts/`

- **AdminAuthContext.tsx** — React context for admin authentication state.
- **ThemeContext.tsx** — React context for theme management.

### `src/hooks/`

- **use-mobile.tsx** — Custom hook for mobile device detection.
- **use-toast.ts** — Custom hook for toast notifications.

### `src/integrations/supabase/`

- **client.ts** — Supabase client initialization.
- **types.ts** — TypeScript types for Supabase integration.

### `src/lib/`

- **utils.ts** — Utility/helper functions.

### `src/pages/`

- **AdminLogin.tsx** — Admin login page.
- **BrandStory.tsx** — Brand story/about page.
- **Index.tsx** — Home page.
- **Informasi.tsx** — Information page.
- **OurAdmin.tsx** — Admin team page.
- **Pengumuman.tsx** — Announcements page.
- **Terms.tsx** — Terms and conditions page.
- **TimKami.tsx** — Team page.

---

## `supabase/`

- **config.toml** — Supabase configuration file.

---

# Summary

This list covers all files and directories in the project as of the latest scan, with descriptions inferred from filenames, extensions, and typical conventions. It should serve as a useful reference for understanding the project structure.



Berikut adalah daftar lengkap berkas, koneksi, dan alur kerja dalam sistem ini, beserta deskripsi dalam Bahasa Indonesia. Saya juga telah membuat berkas Markdown baru bernama `workflow.md` yang berisi deskripsi terperinci alur kerja dalam Bahasa Indonesia.

**Berkas:**

*   **OUR\_CREATIVITY\_Guide.md:** Panduan untuk proyek OurCreativity.
*   **ourcreativity/.gitignore:** Menentukan berkas dan direktori yang harus diabaikan oleh Git.
*   **ourcreativity/bun.lockb:** Berkas kunci untuk manajer paket Bun.
*   **ourcreativity/components.json:** Konfigurasi untuk komponen UI.
*   **ourcreativity/eslint.config.js:** Konfigurasi untuk ESLint, alat untuk memeriksa kode JavaScript/TypeScript.
*   **ourcreativity/index.html:** Berkas HTML utama untuk aplikasi web.
*   **ourcreativity/package-lock.json:** Berkas kunci untuk manajer paket npm.
*   **ourcreativity/package.json:** Berkas yang berisi informasi tentang proyek, dependensi, dan skrip yang tersedia.
    *   *Deskripsi:* Berkas ini berisi metadata proyek, daftar dependensi yang diperlukan untuk menjalankan proyek, dan skrip untuk melakukan tugas-tugas umum seperti memulai server pengembangan (`dev`), membangun proyek (`build`), dan menjalankan linter (`lint`). Dependensi mencakup berbagai pustaka UI seperti `@radix-ui/react-*`, `framer-motion`, `lucide-react`, dan `tailwindcss-animate`, serta pustaka untuk manajemen state dan routing seperti `@tanstack/react-query` dan `react-router-dom`.
*   **ourcreativity/postcss.config.js:** Konfigurasi untuk PostCSS, alat untuk mengubah CSS dengan JavaScript.
*   **ourcreativity/README.md:** Berkas yang berisi informasi dasar tentang proyek.
*   **ourcreativity/tailwind.config.ts:** Konfigurasi untuk Tailwind CSS, kerangka kerja CSS utilitas.
*   **ourcreativity/tsconfig.app.json:** Konfigurasi TypeScript untuk aplikasi.
*   **ourcreativity/tsconfig.json:** Konfigurasi TypeScript dasar untuk proyek.
*   **ourcreativity/tsconfig.node.json:** Konfigurasi TypeScript untuk Node.js.
*   **ourcreativity/vite.config.ts:** Konfigurasi untuk Vite, alat pembangunan yang cepat.
    *   *Deskripsi:* Berkas ini mengkonfigurasi Vite untuk proyek React. Ini menentukan opsi server seperti host dan port, plugin yang digunakan (termasuk plugin React dan `lovable-tagger` dalam mode pengembangan), dan alias untuk memudahkan impor modul. Alias `@` dikonfigurasi untuk menunjuk ke direktori `src`.
*   **ourcreativity/src/main.tsx:** Titik masuk utama aplikasi React.
    *   *Deskripsi:* Berkas ini adalah titik masuk utama aplikasi React. Ia menggunakan `createRoot` dari `react-dom/client` untuk merender komponen `App` ke dalam elemen dengan ID "root" dalam berkas `index.html`.
*   **ourcreativity/src/App.tsx:** Komponen utama aplikasi React.
    *   *Deskripsi:* Berkas ini mendefinisikan komponen utama aplikasi, `App`. Ia menggunakan `BrowserRouter` untuk mengatur routing aplikasi, `Routes` dan `Route` untuk mendefinisikan rute-rute yang tersedia, dan `lazy` dan `Suspense` untuk memuat komponen-komponen halaman secara dinamis. Ia juga menggunakan `ThemeProvider` untuk menyediakan tema aplikasi, `AdminAuthProvider` untuk menyediakan otentikasi admin, dan `TooltipProvider` untuk menyediakan tooltip. Komponen `AnimatedRoutes` menangani transisi antar rute dengan animasi.
*   **ourcreativity/src/integrations/supabase/client.ts:** Menginisialisasi klien Supabase.
    *   *Deskripsi:* Berkas ini menginisialisasi klien Supabase menggunakan `createClient` dari `@supabase/supabase-js`. Ia menggunakan URL dan kunci publik Supabase yang didefinisikan sebagai konstanta. Klien Supabase diekspor sebagai `supabase` dan dapat digunakan untuk berinteraksi dengan database Supabase.

**Koneksi:**

*   **Supabase:** Koneksi ke database Supabase.
    *   *Jenis Koneksi:* Koneksi ke database Supabase menggunakan URL dan kunci publik yang disediakan.
    *   *Deskripsi:* Aplikasi terhubung ke database Supabase untuk menyimpan dan mengambil data. Koneksi ini diinisialisasi dalam berkas `src/integrations/supabase/client.ts` dan digunakan di seluruh aplikasi untuk berinteraksi dengan database.

**Alur Kerja:**

*   **Alur Kerja Utama:**
    *   *Deskripsi:* Alur kerja utama aplikasi dimulai dari berkas `index.html`, yang memuat aplikasi React. Aplikasi kemudian diinisialisasi oleh `src/main.tsx`, yang merender komponen `App`. Komponen `App` mengatur routing aplikasi menggunakan `BrowserRouter`, `Routes`, dan `Route`. Setiap rute memuat komponen halaman yang sesuai secara dinamis menggunakan `lazy` dan `Suspense`. Transisi antar rute ditangani oleh komponen `AnimatedRoutes`. Aplikasi juga menggunakan `ThemeProvider` untuk menyediakan tema, `AdminAuthProvider` untuk menyediakan otentikasi admin, dan `TooltipProvider` untuk menyediakan tooltip.
*   **Alur Kerja Otentikasi Admin:**
    *   *Deskripsi:* Alur kerja otentikasi admin diatur oleh `AdminAuthProvider` dalam `src/App.tsx`. Komponen `RequireAuth` digunakan untuk melindungi rute-rute admin, memastikan bahwa hanya pengguna yang terotentikasi yang dapat mengaksesnya. Alur kerja ini melibatkan komponen `AdminLogin` untuk memungkinkan pengguna masuk, dan konteks `AdminAuthContext` untuk menyimpan status otentikasi.