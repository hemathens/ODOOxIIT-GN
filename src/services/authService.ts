// Authentication service for handling user authentication

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly STORAGE_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';

  // Mock user database
  private mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@company.com',
      password: 'admin123',
      role: 'admin' as const
    },
    {
      id: '2',
      name: 'John Manager',
      email: 'manager@company.com',
      password: 'manager123',
      role: 'manager' as const
    },
    {
      id: '3',
      name: 'Jane Employee',
      email: 'employee@company.com',
      password: 'employee123',
      role: 'employee' as const
    }
  ];

  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user in mock database
    const user = this.mockUsers.find(
      u => u.email === credentials.email && 
           u.password === credentials.password && 
           u.role === credentials.role
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Generate a mock token
    const token = `token_${user.id}_${Date.now()}`;

    const authUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    // Store in localStorage
    this.setAuthData(token, authUser);

    return {
      user: authUser,
      token
    };
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('activeTab');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  /**
   * Store authentication data
   */
  private setAuthData(token: string, user: User): void {
    localStorage.setItem(this.STORAGE_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Validate token (mock implementation)
   */
  async validateToken(token: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return !!token && token.startsWith('token_');
  }
}

// Export singleton instance
export const authService = new AuthService();