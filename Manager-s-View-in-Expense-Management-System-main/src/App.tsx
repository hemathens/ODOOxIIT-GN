import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [managerName, setManagerName] = useState("");

  const handleLogin = (name: string) => {
    setManagerName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setManagerName("");
  };

  return (
    <div className="size-full">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ManagerDashboard managerName={managerName} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
}