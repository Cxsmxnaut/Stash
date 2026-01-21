import { useState } from "react";
import { Home } from "./components/Home";
import { Analytics } from "./components/Analytics";
import { Transactions } from "./components/Transactions";
import { TransactionDetail } from "./components/TransactionDetail";
import { Accounts } from "./components/Accounts";
import { AccountsDesktop } from "./components/AccountsDesktop";
import { Subscriptions } from "./components/Subscriptions";
import { SubscriptionsDesktop } from "./components/SubscriptionsDesktop";
import { Settings } from "./components/Settings";
import { SettingsDesktop } from "./components/SettingsDesktop";
import { SearchFilters } from "./components/SearchFilters";
import { BottomNav } from "./components/BottomNav";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
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
  | "accounts"
  | "transactions"
  | "analytics"
  | "subscriptions"
  | "settings"
  | "transaction-detail";

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
      case "accounts":
        return <Accounts />;
      case "analytics":
        return <Analytics />;
      case "transactions":
        return <Transactions />;
      case "subscriptions":
        return <Subscriptions />;
      case "transaction-detail":
        return (
          <TransactionDetail
            onBack={() => setCurrentScreen("transactions")}
          />
        );
      case "settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const renderDesktopScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeDesktop />;
      case "accounts":
        return <AccountsDesktop />;
      case "analytics":
        return <AnalyticsDesktop />;
      case "transactions":
        return <TransactionsDesktop />;
      case "subscriptions":
        return <SubscriptionsDesktop />;
      case "transaction-detail":
        return (
          <div className="p-8 max-w-[1400px] mx-auto">
            <TransactionDetail
              onBack={() => setCurrentScreen("transactions")}
            />
          </div>
        );
      case "settings":
        return <SettingsDesktop />;
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
            onAddClick={() => setCurrentScreen("transaction-detail")}
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
            onAddClick={() => setCurrentScreen("transaction-detail")}
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