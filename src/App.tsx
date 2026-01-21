import { useState } from "react";
import { Home } from "./components/Home";
import { Analytics } from "./components/Analytics";
import { Transactions } from "./components/Transactions";
import { ReceiptDetail } from "./components/ReceiptDetail";
import { SearchFilters } from "./components/SearchFilters";
import { BottomNav } from "./components/BottomNav";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { UserCenter } from "./components/UserCenter";
import { UserCenterDesktop } from "./components/UserCenterDesktop";
import { useIsDesktop } from "./hooks/useMediaQuery";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { HomeDesktop } from "./components/HomeDesktop";
import { AnalyticsDesktop } from "./components/AnalyticsDesktop";
import { TransactionsDesktop } from "./components/TransactionsDesktop";
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

function AppContent() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [showFilters, setShowFilters] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const isDesktop = useIsDesktop();
  const { isAuthenticated } = useAuth();

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <Login onSwitchToSignup={() => setAuthView('signup')} />;
    } else {
      return <Signup onSwitchToLogin={() => setAuthView('login')} />;
    }
  }

  const renderMobileScreen = () => {
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
        return <UserCenter />;
      default:
        return <Home />;
    }
  };

  const renderDesktopScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeDesktop />;
      case "analytics":
        return <AnalyticsDesktop />;
      case "search":
        return <TransactionsDesktop />;
      case "receipt-detail":
        return (
          <div className="p-8 max-w-[1400px] mx-auto">
            <ReceiptDetail
              onBack={() => setCurrentScreen("search")}
            />
          </div>
        );
      case "profile":
        return <UserCenterDesktop />;
      default:
        return <HomeDesktop />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#111111] relative transition-colors">
      {isDesktop ? (
        <>
          <DesktopSidebar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onAddClick={() => setCurrentScreen("receipt-detail")}
          />
          <main className="ml-64">
            {renderDesktopScreen()}
          </main>
        </>
      ) : (
        <>
          {renderMobileScreen()}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onAddClick={() => setCurrentScreen("receipt-detail")}
          />
        </>
      )}

      {showFilters && (
        <SearchFilters
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}