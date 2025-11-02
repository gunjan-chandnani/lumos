// Mock authentication system for local testing
// This bypasses Supabase and uses localStorage for session persistence

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

interface MockSession {
  access_token: string;
  user: MockUser;
  expires_at: number;
}

const MOCK_CREDENTIALS = {
  email: "sonam@gmail.com",
  password: "12345678"
};

const MOCK_USER: MockUser = {
  id: "mock-user-123",
  email: "sonam@gmail.com",
  user_metadata: {
    full_name: "Sonam"
  }
};

// Generate a simple mock JWT (not secure, just for local testing)
function generateMockToken(): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: MOCK_USER.id,
    email: MOCK_USER.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = "mock-signature";
  return `${header}.${payload}.${signature}`;
}

export const mockAuth = {
  async signInWithPassword(credentials: { email: string; password: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (credentials.email === MOCK_CREDENTIALS.email && credentials.password === MOCK_CREDENTIALS.password) {
      const session: MockSession = {
        access_token: generateMockToken(),
        user: MOCK_USER,
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      localStorage.setItem('mock-session', JSON.stringify(session));
      
      return {
        data: { session, user: MOCK_USER },
        error: null
      };
    } else {
      return {
        data: { session: null, user: null },
        error: { message: "Invalid login credentials" }
      };
    }
  },

  async signUp(credentials: { email: string; password: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For mock, just treat signup the same as signin if using the right credentials
    if (credentials.email === MOCK_CREDENTIALS.email) {
      return this.signInWithPassword(credentials);
    } else {
      return {
        data: { session: null, user: null },
        error: { message: "Sign up failed - only sonam@gmail.com is allowed in mock mode" }
      };
    }
  },

  async getSession() {
    const sessionData = localStorage.getItem('mock-session');
    if (!sessionData) {
      return { data: { session: null }, error: null };
    }

    try {
      const session: MockSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (Date.now() > session.expires_at) {
        localStorage.removeItem('mock-session');
        return { data: { session: null }, error: null };
      }

      return { data: { session }, error: null };
    } catch {
      localStorage.removeItem('mock-session');
      return { data: { session: null }, error: null };
    }
  },

  async signOut() {
    localStorage.removeItem('mock-session');
    return { error: null };
  },

  onAuthStateChange(callback: (event: string, session: MockSession | null) => void) {
    // Simple implementation - call immediately with current session
    this.getSession().then(({ data }) => {
      callback('INITIAL_SESSION', data.session);
    });

    // Return a mock subscription object
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            // Mock unsubscribe
          }
        }
      }
    };
  }
};