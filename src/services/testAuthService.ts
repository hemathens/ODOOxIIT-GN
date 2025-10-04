// Test file for authentication service

import { authService } from './authService';

// Test the authentication service
export const testAuthService = async () => {
  console.log('Testing authentication service...');
  
  try {
    // Test login with valid credentials
    console.log('Testing valid login...');
    const response = await authService.login({
      email: 'admin@company.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Login successful:', response);
    
    // Test getCurrentUser
    const currentUser = authService.getCurrentUser();
    console.log('Current user:', currentUser);
    
    // Test isAuthenticated
    const isAuthenticated = authService.isAuthenticated();
    console.log('Is authenticated:', isAuthenticated);
    
    // Test getToken
    const token = authService.getToken();
    console.log('Token:', token);
    
    // Test validateToken
    if (token) {
      const isValid = await authService.validateToken(token);
      console.log('Token is valid:', isValid);
    }
    
    // Test logout
    console.log('Testing logout...');
    authService.logout();
    console.log('Logout successful');
    
    // Test isAuthenticated after logout
    const isAuthenticatedAfterLogout = authService.isAuthenticated();
    console.log('Is authenticated after logout:', isAuthenticatedAfterLogout);
    
  } catch (error) {
    console.error('Authentication test failed:', error);
  }
  
  console.log('Authentication service test completed.');
};