import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  // Actions
  login: async (credentials) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser = {
        id: 1,
        firstName: credentials.email.split('@')[0].charAt(0).toUpperCase() + credentials.email.split('@')[0].slice(1),
        lastName: 'User',
        email: credentials.email,
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        profileImage: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=random`,
        memberSince: 'January 2024',
        membershipLevel: 'Gold'
      };
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Login failed' };
    }
  },
  
  register: async (userData) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        profileImage: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=random`,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        membershipLevel: 'Silver'
      };
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Registration failed' };
    }
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  },
  
  updateProfile: async (updatedData) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        user: { ...state.user, ...updatedData },
        isLoading: false
      }));
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Update failed' };
    }
  },
  
  // Check if user is authenticated (for protected routes)
  checkAuth: () => {
    return get().isAuthenticated;
  }
}));

export default useAuthStore;
