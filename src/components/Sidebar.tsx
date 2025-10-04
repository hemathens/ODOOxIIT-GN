import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Receipt, 
  Settings,
  User
} from "lucide-react";
import { cn } from "./ui/utils";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
};

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Users, label: "Users & Roles", active: true },
  { icon: CheckSquare, label: "Approval Rules", active: false },
  { icon: Receipt, label: "Expenses Overview", active: false },
  { icon: User, label: "My Profile", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export function Sidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <aside className="w-64 border-r border-border bg-gradient-to-b from-slate-50 to-white min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-md"
                  : "text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">💡 Quick Tip</p>
        <p className="text-sm text-blue-700 mt-1" style={{ fontSize: '0.8rem' }}>
          Set approval rules to automate your expense workflow
        </p>
      </div>
    </aside>
  );
}