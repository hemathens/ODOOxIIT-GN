import React, { useState, useEffect } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { UserManagement } from "./components/UserManagement";
import { ApprovalRules } from "./components/ApprovalRules";
import { DashboardOverview } from "./components/DashboardOverview";
import { ExpensesOverview } from "./components/ExpensesOverview";
import { UserProfile } from "./components/UserProfile";
import { ProfileProvider } from "./contexts/ProfileContext";

// Stateful Settings component with localStorage persistence
const Settings = () => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      theme: 'Light',
      language: 'English',
      emailNotifications: true,
      pushNotifications: false,
      twoFactorAuth: false
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, theme: e.target.value }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };

  const toggleEmailNotifications = () => {
    setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }));
  };

  const togglePushNotifications = () => {
    setSettings(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }));
  };

  const toggleTwoFactorAuth = () => {
    setSettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Settings</h2>
        <p className="text-muted-foreground mt-1">
          Configure your system preferences and settings
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Theme</label>
              <select 
                className="w-full mt-1 p-2 border rounded-md"
                value={settings.theme}
                onChange={handleThemeChange}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Language</label>
              <select 
                className="w-full mt-1 p-2 border rounded-md"
                value={settings.language}
                onChange={handleLanguageChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="email-notifications" 
                  className="sr-only" 
                  checked={settings.emailNotifications}
                  onChange={toggleEmailNotifications}
                />
                <div className={`block w-10 h-6 rounded-full ${settings.emailNotifications ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${settings.emailNotifications ? 'transform translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="push-notifications" 
                  className="sr-only" 
                  checked={settings.pushNotifications}
                  onChange={togglePushNotifications}
                />
                <div className={`block w-10 h-6 rounded-full ${settings.pushNotifications ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${settings.pushNotifications ? 'transform translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-2">
                <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors">Change Password</button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-muted-foreground">Add an extra layer of security</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="2fa" 
                    className="sr-only" 
                    checked={settings.twoFactorAuth}
                    onChange={toggleTwoFactorAuth}
                  />
                  <div className={`block w-10 h-6 rounded-full ${settings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${settings.twoFactorAuth ? 'transform translate-x-5' : ''}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || "Users & Roles";
  });

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardOverview />;
      case "Users & Roles":
        return <UserManagement />;
      case "Approval Rules":
        return <ApprovalRules />;
      case "Expenses Overview":
        return <ExpensesOverview />;
      case "My Profile":
        return <UserProfile />;
      case "Settings":
        return <Settings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <TopNav onNavigate={setActiveTab} />
        
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>

        <footer className="border-t border-border bg-white py-4 px-6 text-center text-sm text-muted-foreground mt-12">
          Expense Manager © 2025 – Secure Expense Tracking
        </footer>
      </div>
    </ProfileProvider>
  );
}