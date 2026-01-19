import { useState } from "react";
import { Home } from "./components/Home";
import { Analytics } from "./components/Analytics";
import { Transactions } from "./components/Transactions";
import { ReceiptDetail } from "./components/ReceiptDetail";
import { SearchFilters } from "./components/SearchFilters";
import { BottomNav } from "./components/BottomNav";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  Home as HomeIcon,
  Search,
  Plus,
  BarChart3,
  User,
} from "lucide-react";

type Screen =
  | "home"
  | "search"
  | "analytics"
  | "profile"
  | "receipt-detail";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [showFilters, setShowFilters] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Home />;
      case "analytics":
        return <Analytics />;
      case "search":
        return <Transactions />;
      case "receipt-detail":
        return (
          <ReceiptDetail
            onBack={() => setCurrentScreen("search")}
          />
        );
      case "profile":
        return (
          <div className="p-5 pb-24">
            <h1 className="text-2xl mb-4">Profile</h1>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">
              Profile settings coming soon
            </p>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#111111] relative transition-colors">
        {renderScreen()}

        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          onAddClick={() => setCurrentScreen("receipt-detail")}
        />

        {showFilters && (
          <SearchFilters
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}