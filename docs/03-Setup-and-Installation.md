
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

This project connects to a Supabase backend and the Sentry observability platform. You will need to create a `.env` file in the root of the project to store the necessary credentials.

1.  Create a file named `.env` in the project root.
2.  Add the following content, replacing the placeholder value with your actual Sentry project DSN:

    ```env
    # Sentry DSN for error and performance monitoring
    VITE_SENTRY_DSN="YOUR_SENTRY_DSN_HERE"
    ```

For production builds and deployments, you will also need to configure the following environment variables to allow source map uploads to Sentry:

-   `SENTRY_ORG`: Your Sentry organization slug.
-   `SENTRY_PROJECT`: Your Sentry project slug.
-   `SENTRY_AUTH_TOKEN`: An authentication token from Sentry.

The Supabase connection details (URL and Anon Key) are still included directly in `src/integrations/supabase/client.ts` for simplicity.

## Running the Development Server

Once the dependencies are installed, you can start the local development server.

```bash
bun dev
```

The application will now be running at `http://localhost:5173` (or the next available port).
