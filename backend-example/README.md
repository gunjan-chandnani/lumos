# Backend Implementation for Google OAuth

This directory contains example implementations for your backend API endpoints.

## Required Dependencies

For your backend server, install these packages:

```bash
npm install google-auth-library jsonwebtoken express cors
npm install -D @types/jsonwebtoken @types/express
```

## Environment Variables

Set these environment variables in your backend:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
JWT_SECRET=your-secure-jwt-secret-key
JWT_EXPIRES_IN=7d
PORT=3001
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your frontend URL to authorized origins (http://localhost:8080 for development)
6. Copy the Client ID to your environment variables

## API Endpoints

### POST /api/auth/google
- Verifies Google OAuth credential token
- Creates or fetches user from database
- Returns JWT session token

### Example Response
```json
{
  "user": {
    "id": "google-user-id",
    "email": "user@gmail.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/..."
  },
  "token": "jwt-session-token"
}
```

## Frontend Integration

The frontend automatically calls `/api/auth/google` when users sign in with Google. Make sure your backend server is running on the expected port and CORS is configured to allow requests from your frontend domain.

## Security Notes

- Never expose your JWT secret
- Use HTTPS in production
- Implement rate limiting on auth endpoints
- Validate all input data
- Use secure session storage
- Implement proper error handling