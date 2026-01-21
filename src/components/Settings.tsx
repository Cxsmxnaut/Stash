import { User, Mail, Lock, Bell, LogOut, Smartphone } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">Settings</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Manage your account</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Profile Section */}
      <div className="mb-6">
        <h3 className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium mb-3 px-1">
          Account
        </h3>
        <Card className="!p-0 overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors border-b border-[#F7F7F7] dark:border-[#2A2A2A]">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#111111] dark:text-white font-medium">Name</p>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{user?.name}</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors border-b border-[#F7F7F7] dark:border-[#2A2A2A]">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#111111] dark:text-white font-medium">Email</p>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{user?.email}</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Smartphone size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#111111] dark:text-white font-medium">Phone Number</p>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Add phone number</p>
            </div>
          </button>
        </Card>
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <h3 className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium mb-3 px-1">
          Security
        </h3>
        <Card className="!p-0 overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Lock size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#111111] dark:text-white font-medium">Change Password</p>
            </div>
          </button>
        </Card>
      </div>

      {/* Preferences Section */}
      <div className="mb-6">
        <h3 className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium mb-3 px-1">
          Preferences
        </h3>
        <Card className="!p-0 overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Bell size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#111111] dark:text-white font-medium">Notifications</p>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Enabled</p>
            </div>
          </button>
        </Card>
      </div>

      {/* Sign Out */}
      <Card>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </Card>
    </div>
  );
}
