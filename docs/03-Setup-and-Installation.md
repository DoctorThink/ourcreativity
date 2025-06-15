
# Setup and Installation Guide

This guide provides step-by-step instructions for setting up the OurCreativity project on a local development machine.

## Prerequisites

-   **Node.js**: Version 18.x or higher.
-   **Bun**: This project uses Bun as the package manager and runtime. Installation instructions can be found at [bun.sh](https://bun.sh/).

## Installation

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd ourcreativity-project
    ```

3.  **Install Dependencies**
    Use Bun to install all the necessary packages defined in `package.json`.
    ```bash
    bun install
    ```

## Environment Configuration

This project connects to a Supabase backend for its database and other services. The required connection details (Supabase URL and Anon Key) are already included in the source code for ease of setup.

-   **File:** `src/integrations/supabase/client.ts`

No `.env` or `.env.local` file is required to run the project locally.

## Running the Development Server

Once the dependencies are installed, you can start the local development server.

```bash
bun dev
```

The application will now be running at `http://localhost:5173` (or the next available port).

