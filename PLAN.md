# Rencana Implementasi Popup

Berikut adalah rencana untuk menambahkan fitur popup selamat datang dan popup link grup pada website Our Creativity.

## 1. Teknologi yang Digunakan

*   **Library UI:** Shadcn UI (`@/components/ui/dialog`)
*   **State Management:** React `useState`
*   **Persistence (Welcome Popup):** Browser `localStorage`
*   **Styling:** Tailwind CSS (melalui Shadcn UI)

## 2. Implementasi Popup Selamat Datang (Muncul Sekali)

*   **File Target:** `src/App.tsx`
*   **Komponen Shadcn UI:** `<Dialog>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogFooter>`, `<Button>`.
*   **Logika:**
    *   Tambahkan state `const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);`.
    *   Gunakan `useEffect` untuk memeriksa `localStorage.getItem('hasSeenWelcomePopup')` saat komponen `App` dimuat. Jika belum ada, set `showWelcomeDialog(true)`.
    *   Render komponen `<Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>`.
    *   Saat dialog ditutup (baik melalui `onOpenChange` atau `onClick` tombol tutup), panggil `localStorage.setItem('hasSeenWelcomePopup', 'true');`.
*   **Konten Dialog:**
    *   **Title:** "Selamat Datang di Our Creativity!"
    *   **Description:** "Website ini adalah hasil karya Ardelyo. Jika Anda ingin mendukung pengembangan, silakan donasi ke <a href='https://saweria.co/ardelyo' target='_blank' rel='noopener noreferrer' class='underline'>saweria.co/ardelyo</a>. <br/><br/> **Update 3.7:** Penambahan fitur Karya Kami dan perbaikan bug."
    *   **Footer:** Tombol `<Button>` dengan teks "Tutup".

## 3. Implementasi Popup "LINK GRUP ADA DISINI" (Card Informasi)

*   **File Target:** `src/pages/index.tsx`
*   **Komponen Shadcn UI:** `<Dialog>`, `<DialogTrigger>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogFooter>`, `<Button>`.
*   **Logika:**
    *   Tambahkan state `const [showInfoDialog, setShowInfoDialog] = useState(false);`.
    *   **Modifikasi `bentoTiles`:**
        *   Cari objek tile dengan `id: "informasi"`.
        *   Hapus properti `href`.
        *   Hapus properti `onClick` yang memanggil `navigate` (jika ada).
        *   Biarkan `isInteractive: true`.
    *   **Rendering:**
        *   Render komponen `<Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>` di *return statement* komponen `Index` (di luar loop `map`).
        *   Di dalam loop `bentoTiles.map`, saat merender tile "informasi", bungkus elemen interaktifnya dengan `<DialogTrigger asChild>`.
*   **Konten Dialog (yang dirender di luar map):**
    *   **Title:** "Informasi Grup"
    *   **Description:** "LINK GRUP ADA DISINI"
    *   **Footer:** Tombol `<Button>` dengan teks "Tutup".

## 4. Styling

*   Memanfaatkan styling bawaan Shadcn UI dan Tailwind CSS untuk konsistensi visual. Penyesuaian minor mungkin diperlukan.

## Diagram Rencana (Mermaid)

```mermaid
graph TD
    A[Mulai] --> B{Gunakan Shadcn UI Dialog};

    B --> C{Implementasi Welcome Popup di App.tsx};
    C --> C1[State: showWelcomeDialog];
    C --> C2[useEffect: Cek localStorage 'hasSeenWelcomePopup'];
    C2 -- Belum Lihat --> C3[Set showWelcomeDialog = true];
    C --> C4[Render <Dialog open={showWelcomeDialog} onOpenChange={...handleCloseAndSave}>];
    C4 --> C5[Konten: Welcome, Kredit, Link Saweria, Update 3.7];
    C5 --> C6[Tombol Tutup];

    B --> D{Implementasi Link Grup Popup di index.tsx};
    D --> D1[State: showInfoDialog];
    D --> D2[Modifikasi Tile 'informasi' di bentoTiles];
    D2 --> D3[Hapus href & onClick navigate];
    D2 --> D4[Bungkus konten tile dengan <DialogTrigger asChild>];
    D --> D5[Render <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}> di luar map];
    D5 --> D6[Konten: "LINK GRUP ADA DISINI"];
    D6 --> D7[Tombol Tutup];

    C6 --> E[Styling (Otomatis via Shadcn/Tailwind)];
    D7 --> E;
    E --> F[Testing];
    F --> G[Selesai Implementasi];