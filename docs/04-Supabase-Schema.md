
# Supabase Database Schema

This document details the schema of the tables in our Supabase PostgreSQL database.

## Table: `karya`

Stores all creative works submitted by users.

| Column | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | No | Primary key for the work. |
| `created_at` | `timestamptz` | No | Timestamp of when the work was submitted. |
| `updated_at` | `timestamptz` | No | Timestamp of the last update. |
| `title` | `text` | No | The title of the work. |
| `creator_name` | `text` | No | The name of the creator. |
| `category` | `text` | No | The category of the work (e.g., "Desain", "Video"). |
| `image_url` | `text` | No | URL to the thumbnail or primary image for the work. |
| `content_url`| `text` | Yes | URL to the main content (e.g., video file). |
| `description` | `text` | Yes | A short description of the work. |
| `status` | `text` | No | Moderation status (`pending`, `approved`, `rejected`). |
| `view_count` | `integer` | No | Number of times the work has been viewed. |
| `is_spotlight`| `boolean` | Yes | `true` if the work is featured in the spotlight. |

## Table: `admin_activity_log`

Logs actions performed by administrators in the admin dashboard.

| Column | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | No | Primary key for the log entry. |
| `created_at` | `timestamptz` | No | Timestamp of when the action occurred. |
| `action` | `text` | No | A description of the action taken (e.g., "Approved Karya"). |
| `details` | `text` | Yes | Additional details or metadata about the action. |
| `ip_address`| `text` | Yes | The IP address of the admin who performed the action. |

### Row Level Security (RLS)

Currently, Row Level Security is not enabled on these tables. Access is public for `karya` and restricted at the application level for `admin_activity_log`.

