import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePic: string;
  employeeId: string;
  jobTitle: string;
  department: string;
};

type ProfileContextType = {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      firstName: "Admin",
      lastName: "User",
      email: "admin@company.com",
      phone: "+1 (555) 123-4567",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      employeeId: "EMP-2024-001",
      jobTitle: "System Administrator",
      department: "IT & Operations",
    };
  });

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [profileData]);

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}