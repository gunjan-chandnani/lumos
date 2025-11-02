import { jwtDecode } from 'jwt-decode';

interface GoogleCredential {
  credential: string;
}

interface GoogleUserInfo {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
  token: string;
}

export class GoogleAuthService {
  private static readonly API_BASE = '/api';

  /**
   * Decode Google credential token to extract user information
   */
  static decodeGoogleToken(credential: string): GoogleUserInfo {
    try {
      return jwtDecode<GoogleUserInfo>(credential);
    } catch (error) {
      console.error('Failed to decode Google token:', error);
      throw new Error('Invalid Google credential token');
    }
  }

  /**
   * Send Google credential to backend for verification and get JWT session token
   */
  static async verifyGoogleToken(credential: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Authentication failed: ${error}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Google auth verification failed:', error);
      throw error;
    }
  }

  /**
   * Handle successful Google OAuth response
   */
  static async handleGoogleSuccess(credentialResponse: GoogleCredential): Promise<AuthResponse> {
    if (!credentialResponse.credential) {
      throw new Error('No credential received from Google');
    }

    // Decode token to get user info (for immediate UI feedback)
    const userInfo = this.decodeGoogleToken(credentialResponse.credential);
    console.log('Google user info:', userInfo);

    // Verify token with backend and get session JWT
    const authResponse = await this.verifyGoogleToken(credentialResponse.credential);
    
    return authResponse;
  }

  /**
   * Store session token securely
   */
  static storeSessionToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get stored session token
   */
  static getSessionToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Clear session data
   */
  static clearSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  /**
   * Store user data
   */
  static storeUserData(user: any): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  /**
   * Get stored user data
   */
  static getUserData(): any | null {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }
}