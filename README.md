# Our Creativity - Website Project

Our Creativity is a platform dedicated to showcasing creative works and fostering a vibrant community of innovators and artists. This website serves as the main hub for our community, allowing users to explore projects, get information about our initiatives, stay updated with announcements, and connect with fellow creators.

## ✨ Key Features

*   **Karya Showcase:** A gallery to display creative projects from our community members.
*   **Announcements:** Keep up-to-date with the latest news, events, and updates from Our Creativity.
*   **Community Hub:** Information about our brand, team, and ways to join our community.
*   **Interactive UI:** Engaging user interface with animations and a modern design aesthetic.
*   **Admin Panel:** For managing content like announcements and moderating karya (works).

## 🛠️ Technology Stack

*   **Frontend:**
    *   React
    *   Vite (Build Tool)
    *   TypeScript
    *   Tailwind CSS (Utility-first CSS framework)
    *   Shadcn/ui (UI Component Library)
    *   Framer Motion (Animations)
    *   React Router (Page Navigation)
    *   TanStack Query (Data Fetching and State Management)
*   **Backend & Database:**
    *   Supabase (Backend-as-a-Service: Authentication, Database)
*   **Linting & Formatting:**
    *   ESLint
    *   Prettier (Implicitly, often used with ESLint and modern setups)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project and add the necessary environment variables, particularly for Supabase:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase project URL and anon key.

### Running the Application

*   **Development mode:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually at `http://localhost:5173`.

*   **Production build:**
    ```bash
    npm run build
    ```
    This command builds the application for production to the `dist` folder.

*   **Preview production build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally to preview it.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run build:dev`: Builds the app for development (likely with more debugging info).
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally.

## 📂 Project Structure

Here's a brief overview of the project's directory structure:

```
.
├── public/             # Static assets (images, favicons, etc.)
├── src/                # Main source code
│   ├── assets/         # (If any specific local assets not in public)
│   ├── components/     # Reusable React components
│   │   ├── ui/         # UI components (often from Shadcn/ui)
│   │   ├── admin/      # Components specific to the admin section
│   │   ├── announcement/ # Components related to announcements
│   │   └── karya/      # Components related to "karya" (works)
│   ├── contexts/       # React Context API providers (Theme, AdminAuth)
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party service integrations (e.g., Supabase)
│   ├── lib/            # Utility functions and libraries
│   ├── models/         # TypeScript types and interfaces for data structures
│   ├── pages/          # Page components corresponding to routes
│   ├── services/       # Services for API calls or business logic (e.g., announcementService)
│   ├── styles/         # (If global styles are further organized)
│   ├── App.tsx         # Main application component with routing
│   ├── main.tsx        # Entry point of the React application
│   └── index.css       # Global stylesheets
├── supabase/           # Supabase specific configuration (e.g., migrations, if used)
├── .env.example        # Example environment variables (if you create one)
├── .eslintrc.cjs       # ESLint configuration
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔗 Live Website

You can access the live website here: [Link to Live Website]

## 📚 Detailed Documentation

For more in-depth technical details, user guides, and development information, please refer to the documents in the `/docs` folder (once created).

---

This README provides a good starting point. Feel free to expand upon it as the project evolves!
