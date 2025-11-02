# 🚨 URGENT: Google OAuth Configuration Fix

## The Problem
**Error**: `The given origin is not allowed for the given client ID`
**Status**: 403 Forbidden

This means your current development URL (`http://localhost:8080`) is not authorized in your Google Cloud Console.

## 🔧 Step-by-Step Fix

### 1. Open Google Cloud Console
Go to: https://console.cloud.google.com/

### 2. Navigate to OAuth Consent Screen
1. Select your project
2. Go to **APIs & Services** → **OAuth consent screen**
3. Make sure it's configured (if not, set it up as "External" for testing)

### 3. Configure OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID: `177609097645-5vtrj08tlph94oiue0j7j8tahblo56ff`
3. Click the **pencil icon** to edit it

### 4. Add Authorized Origins
In the **Authorized JavaScript origins** section, add:
```
http://localhost:8080
http://127.0.0.1:8080
http://localhost:3000
```

### 5. Add Authorized Redirect URIs
In the **Authorized redirect URIs** section, add:
```
http://localhost:8080
http://localhost:8080/
http://127.0.0.1:8080
http://127.0.0.1:8080/
```

### 6. Save Changes
Click **Save** - changes may take a few minutes to propagate.

## 🧪 Alternative: Quick Test with Different Port

If you want to test immediately, try changing your dev server port:

1. Stop the current dev server (Ctrl+C)
2. Create/edit `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change to a port that might be already authorized
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

3. Restart: `npm run dev`
4. Test at `http://localhost:3000`

## 🔍 Common Authorized Origins to Try

Many Google OAuth setups include these by default:
- `http://localhost:3000`
- `http://localhost:8000` 
- `http://localhost:8080`

## 📞 Need Help?

If you can't access the Google Cloud Console:
1. Ask the person who created the OAuth credentials
2. They need to add your development URLs to the authorized origins
3. Share this exact list of URLs to add:
   - `http://localhost:8080`
   - `http://127.0.0.1:8080`
   - `http://localhost:3000`
   - `http://127.0.0.1:3000`

## ✅ After Fixing

Once the origins are added:
1. Wait 2-3 minutes for changes to propagate
2. Refresh your browser page
3. Try Google Sign-In again
4. The 403 error should be resolved