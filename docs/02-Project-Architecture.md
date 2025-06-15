
# Project Architecture

This document provides a high-level overview of the OurCreativity project's technical stack and folder structure.

## Tech Stack

- **Framework:** React with Vite for a fast development experience.
- **Language:** TypeScript for type safety and scalability.
- **Styling:** Tailwind CSS, utilizing `shadcn/ui` for a foundational component library that is customized to fit the Glowar design system.
- **Animation:** Framer Motion and GSAP (GreenSock Animation Platform) are used to implement the fluid and purposeful motion defined in the Glowar design system.
- **Backend & Database:** Supabase handles our backend needs, including:
    - **Database:** A PostgreSQL database for storing all persistent data.
    - **Authentication:** Manages user sign-up and login.
    - **Storage:** Used for hosting user-uploaded files and media.
    - **Edge Functions:** For server-side logic.

## Folder Structure

The repository is organized to separate concerns and improve maintainability.

-   `src/`: The main directory for all application source code.
-   `src/components/`: Contains all reusable React components, organized by feature or UI pattern.
-   `src/pages/`: Contains the top-level components for each route/page in the application.
-   `src/services/`: Holds business logic, data-fetching functions, and interactions with external services (like Supabase).
-   `src/integrations/`: Contains the Supabase client instance and auto-generated TypeScript types for the database schema.
-   `src/hooks/`: Custom React hooks.
-   `src/lib/`: Utility functions.
-   `data/`: Static data files, like `team.json`, that are used to populate content.
-   `docs/`: All project documentation.
-   `supabase/`: Configuration and migration files for the Supabase project.
-   `public/`: Static assets like images and fonts that are publicly accessible.

