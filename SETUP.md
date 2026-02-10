# Setup Guide

## 1. Supabase Setup

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Database Schema**:
    *   Go to the **SQL Editor** in your Supabase dashboard.
    *   Copy the content of `notes_schema.sql` from this repository.
    *   Paste it into the SQL Editor and click **Run**.
    *   This script creates the `notes` table and ensures the `is_public` column exists.
    *   **Security Note**: The table is read-only for public users. You must use the `service_role` key to upload data.

3.  **Get Credentials**:
    *   Go to **Project Settings** -> **API**.
    *   Copy the `Project URL` (SUPABASE_URL).
    *   Copy the `anon` public key (SUPABASE_ANON_KEY).
    *   **Important**: Copy the `service_role` secret (SUPABASE_SERVICE_ROLE_KEY). This is required for the seed script.

## 2. Cloudflare Pages Configuration

1.  **Environment Variables**:
    *   In your Cloudflare Pages dashboard, go to **Settings** -> **Environment variables**.
    *   Add the following variables for both **Production** and **Preview**:
        *   `SUPABASE_URL`: Your Supabase Project URL.
        *   `SUPABASE_ANON_KEY`: Your Supabase `anon` key.
        *   `OPENAI_API_KEY`: Your OpenAI API Key (for the AI tutor).

## 3. Seeding Data (Populating the Database)

To make the notes appear on your site, you need to upload them to Supabase.

1.  **Local Setup**:
    *   Ensure you have Node.js installed.
    *   Run `npm install` in this repository to install dependencies.

2.  **Run the Seed Script**:
    *   You need to provide your Supabase URL and Service Role Key (to have permission to write).
    *   Run the following command in your terminal (replace with your actual keys):

    ```bash
    export SUPABASE_URL="https://your-project.supabase.co"
    export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
    npm run seed
    ```

    *   *Note: On Windows PowerShell, use `$env:SUPABASE_URL="..."` instead of export.*

## 4. Troubleshooting "Content Unavailable"

If you see "Content unavailable":
1.  **Check Database**: Go to Supabase Table Editor and check if the `notes` table has rows. If empty, run the seed script.
2.  **Check Keys**: Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Cloudflare Pages settings.
3.  **Check Logs**: Look at the "Functions" logs in Cloudflare Pages deployment to see if there are connection errors. The console will now log specific errors if keys are missing or requests fail.
