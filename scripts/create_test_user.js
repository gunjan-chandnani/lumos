#!/usr/bin/env node
/**
 * Create a test user named Sonam in your Supabase project and print a JWT (access token).
 *
 * Usage (PowerShell):
 *   $env:SUPABASE_URL="https://your-project.supabase.co"; \
 *   $env:SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"; \
 *   $env:SUPABASE_ANON_KEY="<anon-key>"; \
 *   node scripts/create_test_user.js
 *
 * Notes:
 * - This script must be run locally or on a trusted server. The service role key is sensitive.
 * - It uses the Admin API to create the user, then signs in via the anon key to receive a JWT.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !ANON_KEY) {
  console.error("Missing environment variables. Please set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_ANON_KEY (or VITE equivalents).");
  process.exit(1);
}

const email = "sonam@gmail.com";
const password = "12345678"; // updated per request
const fullName = "Sonam";

async function main() {
  try {
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    console.log("Creating user...");
    // Create user via admin API
    const createRes = await admin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: fullName },
      email_confirm: true,
    });

    if (createRes.error) {
      console.error("Error creating user:", createRes.error);
      process.exit(1);
    }

    const user = createRes.data.user;
    console.log("Created user:", user.id, user.email);

    // Now sign in via anon key to obtain a JWT (access token)
    const client = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
    console.log("Signing in to obtain JWT...");
    const signInRes = await client.auth.signInWithPassword({ email, password });
    if (signInRes.error) {
      console.error("Error signing in:", signInRes.error);
      process.exit(1);
    }

    const session = signInRes.data.session;
    if (!session) {
      console.error("No session returned after sign-in. Check project settings (email confirmations, etc.).");
      process.exit(1);
    }

    console.log("Success. JWT (access_token):\n");
    console.log(session.access_token);
    console.log("\nYou can use this token as an Authorization: Bearer <token> header for testing.");
    console.log("User id:", user.id);
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
}

main();
