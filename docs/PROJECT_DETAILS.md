# Project Details: Our Creativity Website

This document provides a raw, in-depth technical overview of the Our Creativity website, based on the repository structure and codebase.

## 1. Project Architecture

### 1.1. Frontend

*   **Core Framework:** React (v18.3.1) with Vite (v5.4.x) as the build tool and development server.
*   **Language:** TypeScript (v5.5.3) for static typing and improved code quality.
*   **Routing:** `react-router-dom` (v6.26.x) is used for client-side routing.
    *   Routes are defined in `src/App.tsx`.
    *   Page transitions are handled using `framer-motion`'s `AnimatePresence` and a custom `PageTransition` component.
*   **UI Components:**
    *   **Shadcn/ui:** A collection of re-usable UI components built using Radix UI and Tailwind CSS. These are typically found in `src/components/ui/`.
    *   **Custom Components:** Bespoke components are located in `src/components/` and organized into subdirectories like `admin/`, `announcement/`, `karya/`, `layouts/`.
    *   **Styling:** Primarily achieved using Tailwind CSS (v3.4.x), configured in `tailwind.config.ts`. Global styles are present in `src/index.css` and `src/App.css`.
*   **State Management:**
    *   **TanStack Query (React Query v5.56.x):** Used for server state management, including data fetching, caching, and synchronization. Configured in `src/App.tsx` with a `QueryClient`.
    *   **React Context API:** Used for global state that doesn't involve server data, such as:
        *   `ThemeContext` (`src/contexts/ThemeContext.tsx`): Manages theme (e.g., light/dark mode).
        *   `AdminAuthContext` (`src/contexts/AdminAuthContext.tsx`): Manages authentication state for the admin section.
*   **Animations:** `framer-motion` (v11.18.x) is extensively used for UI animations, page transitions, and interactive elements (e.g., Bento Grid on the homepage).
*   **Forms:** `react-hook-form` (v7.53.x) and `@hookform/resolvers` with `zod` (v3.23.x) for schema validation are used for managing forms, likely in areas like Admin Login and content submission.

### 1.2. Backend (Supabase)

*   **Platform:** Supabase is used as the Backend-as-a-Service (BaaS).
*   **Client:** The Supabase JavaScript client (`@supabase/supabase-js` v2.49.x) is used for interaction from the frontend. The client is initialized in `src/integrations/supabase/client.ts`.
*   **Services Used (Likely):**
    *   **Authentication:** Supabase Auth is likely used for the admin login functionality (`/admin-login`, `RequireAuth` component).
    *   **Database (PostgreSQL):** Supabase provides a PostgreSQL database. This is likely used to store:
        *   Announcements (managed via `src/services/announcementService.ts` and admin UI).
        *   "Karya" (creative works) and related data.
        *   User profiles (especially for admins, potentially for community members if there's user registration beyond admin).
    *   **Storage:** Supabase Storage might be used for hosting uploaded files, such as images for "Karya" or attachments for announcements (e.g., files in `public/lovable-uploads/`).
*   **Configuration:** The Supabase project URL and anonymous key are configured via environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). The `supabase/config.toml` file might contain local development configurations for the Supabase CLI, but does not typically store production keys.

### 1.3. Styling

*   **Tailwind CSS:** The primary styling engine. Configuration is in `tailwind.config.ts`. It uses utility classes for rapid UI development.
*   **PostCSS:** Used with Tailwind CSS, configured in `postcss.config.js`.
*   **Global Styles:** `src/index.css` (includes Tailwind base, components, utilities) and `src/App.css` (for any additional global app-specific styles).
*   **Component-Level Styles:** Achieved through Tailwind classes directly in JSX/TSX files.
*   **CSS Variables:** Used for theming (e.g., colors defined in `tailwind.config.ts` and potentially in `src/index.css` or `src/App.css` for theme switching).

## 2. Codebase Overview

### 2.1. Major Directories

*   `public/`: Contains static assets like `index.html` (Vite entry), favicons, images (e.g., `og-image.png`, `lovable-uploads/`).
*   `src/`: Contains all the source code for the React application.
    *   `components/`: Reusable React components.
        *   `ui/`: Core UI elements, many from Shadcn/ui.
        *   `admin/`: Components for the admin dashboard (e.g., `AnnouncementEditor.tsx`, `KaryaModeration.tsx`).
        *   `announcement/`: Components for displaying announcements.
        *   `karya/`: Components related to displaying "Karya" (e.g., `KaryaGallery.tsx`, `KaryaCard.tsx`).
        *   `layouts/`: Layout components (e.g., `PageLayout.tsx`).
    *   `contexts/`: React Context providers (e.g., `ThemeContext.tsx`, `AdminAuthContext.tsx`).
    *   `hooks/`: Custom React Hooks (e.g., `useAnnouncements.ts`, `useMobile.tsx`).
    *   `integrations/`: Code for integrating with third-party services.
        *   `supabase/`: Supabase client setup (`client.ts`) and type definitions (`types.ts`).
    *   `lib/`: Utility functions (e.g., `utils.ts` for `cn` and other helpers, `themeUtils.ts`).
    *   `models/`: TypeScript interfaces and types defining data structures (e.g., `Announcement.ts`).
    *   `pages/`: Top-level components that represent website pages/routes (e.g., `Index.tsx`, `Pengumuman.tsx`, `AdminLogin.tsx`).
    *   `services/`: Modules that encapsulate data fetching or business logic (e.g., `announcementService.ts` which likely interacts with Supabase).
*   `supabase/`: Contains Supabase-specific configurations, potentially for local development or database migrations if the Supabase CLI is used extensively. `config.toml` is a Supabase CLI configuration file.

### 2.2. Key Files and Their Roles

*   `src/main.tsx`: The entry point of the application. Renders the `App` component into the DOM.
*   `src/App.tsx`: The main application component. Sets up routing (`react-router-dom`), context providers (`QueryClientProvider`, `ThemeProvider`, `AdminAuthProvider`), and global components like `Toaster`, `CustomCursor`.
*   `src/pages/index.tsx`: The component for the homepage, featuring the Bento Grid layout.
*   `src/pages/Pengumuman.tsx`: Displays announcements, likely fetching data via `announcementService.ts`.
*   `src/pages/KaryaKami.tsx`: Displays creative works.
*   `src/pages/AdminLogin.tsx`: Handles admin authentication.
*   `src/pages/OurAdmin.tsx`: The main admin dashboard page, protected by `RequireAuth`.
*   `src/components/admin/RequireAuth.tsx`: A higher-order component or wrapper to protect admin routes by checking authentication status via `AdminAuthContext`.
*   `src/services/announcementService.ts`: Contains functions to fetch, create, update, or delete announcements, interacting with the Supabase client.
*   `src/integrations/supabase/client.ts`: Initializes and exports the Supabase client instance.
*   `tailwind.config.ts`: Configuration file for Tailwind CSS, including custom themes, plugins, and content paths.
*   `vite.config.ts`: Configuration file for Vite, including plugins and build settings.

### 2.3. Data Flow Examples

*   **Fetching Announcements:**
    1.  `Pengumuman.tsx` (or a component within it) calls a hook like `useAnnouncements.ts`.
    2.  `useAnnouncements.ts` uses TanStack Query to fetch data.
    3.  The query function within `useAnnouncements.ts` calls a function from `announcementService.ts`.
    4.  `announcementService.ts` uses the Supabase client (`src/integrations/supabase/client.ts`) to query the `announcements` table (or equivalent) in the Supabase database.
    5.  Data flows back, is cached by TanStack Query, and rendered by the components.
*   **Admin Authentication:**
    1.  User navigates to `/admin-login` (`AdminLogin.tsx`).
    2.  User submits credentials.
    3.  `AdminLogin.tsx` calls an authentication function (likely from `AdminAuthContext` or a dedicated auth service that uses Supabase Auth).
    4.  Supabase client communicates with Supabase Auth to verify credentials.
    5.  On success, user session is created, and `AdminAuthContext` is updated with the user/session information.
    6.  User is redirected to `/our-admin` or `/admin`.
    7.  `RequireAuth.tsx` component checks `AdminAuthContext` to allow or deny access to protected routes.

### 2.4. API Endpoints (Supabase Interactions)

Direct REST API endpoints are less common when using the Supabase client library, as it provides JavaScript methods to interact with the database and other services. The "API" is effectively the set of functions and table/column names used:

*   **Announcements:** Likely involves a table (e.g., `announcements`) with columns for `id`, `title`, `content`, `created_at`, `version`, etc. Interactions are via `supabase.from('announcements').select()`, `.insert()`, `.update()`, `.delete()`.
*   **Karya:** Likely a table (e.g., `karya`) with columns for `id`, `title`, `description`, `imageUrl`, `uploader_id`, `status` (pending, approved), etc.
*   **Authentication:** Uses Supabase Auth methods like `supabase.auth.signInWithPassword()`, `supabase.auth.signOut()`, `supabase.auth.onAuthStateChange()`.

Actual table and column names would need to be confirmed by inspecting `announcementService.ts`, Karya-related services/components, and any Supabase schema files if available.

## 3. Environment Variables

The application requires the following environment variables to be set, typically in a `.env` file at the project root:

*   `VITE_SUPABASE_URL`: The URL of your Supabase project.
*   `VITE_SUPABASE_ANON_KEY`: The public anonymous key for your Supabase project.

**Example `.env` file:**

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

It's crucial to keep any secret keys (like Supabase service role key, if used in a backend context, though not typically exposed to frontend) out of version control. The anon key is safe to expose in a frontend application.

## 4. Build & Deployment

*   **Build Process:** `npm run build` uses Vite to compile TypeScript, bundle JavaScript, process CSS, and optimize assets, placing the output in the `dist/` directory.
*   **Deployment:** The contents of the `dist/` directory can be deployed to any static web hosting provider (e.g., Vercel, Netlify, GitHub Pages, AWS S3/CloudFront).

This document aims to provide a comprehensive technical foundation. For user-facing guides or contribution guidelines, please refer to other documents in this `docs` folder.
