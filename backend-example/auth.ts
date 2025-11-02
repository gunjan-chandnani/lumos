/**
 * Backend API Endpoint Implementation for Google OAuth
 * 
 * This file provides the implementation structure for your backend API.
 * You'll need to implement this on your actual server (Express.js, Node.js, etc.)
 * 
 * Required backend dependencies:
 * npm install google-auth-library jsonwebtoken
 */

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

// Environment variables you'll need to set on your backend
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * POST /api/auth/google
 * Verify Google OAuth token and return session JWT
 */
export async function handleGoogleAuth(req: any, res: any) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'No credential provided' });
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: 'Invalid Google token' });
    }

    const { sub, email, name, picture } = payload;

    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create new user if doesn't exist
    // 3. Update existing user if exists

    // Mock user data - replace with your database logic
    const user = {
      id: sub,
      email: email,
      name: name,
      picture: picture,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    // Generate JWT session token
    const sessionToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        provider: 'google',
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user data and session token
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      token: sessionToken,
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Middleware to verify JWT session tokens
 */
export function verifySessionToken(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Example Express.js route setup:
 * 
 * import express from 'express';
 * import { handleGoogleAuth, verifySessionToken } from './auth';
 * 
 * const app = express();
 * app.use(express.json());
 * 
 * // Google OAuth endpoint
 * app.post('/api/auth/google', handleGoogleAuth);
 * 
 * // Protected route example
 * app.get('/api/user/profile', verifySessionToken, (req, res) => {
 *   res.json({ user: req.user });
 * });
 * 
 * app.listen(3001, () => {
 *   console.log('Server running on port 3001');
 * });
 */