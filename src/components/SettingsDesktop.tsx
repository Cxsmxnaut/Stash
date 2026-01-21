import { User, Mail, Lock, Bell, LogOut, Smartphone } from 'lucide-react';
import { Card } from './Card';
import { useAuth } from '../contexts/AuthContext';

export function SettingsDesktop() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Settings</h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1">
          <Card>
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-3xl bg-[#111111] dark:bg-white flex items-center justify-center mx-auto mb-4">
                <span className="text-white dark:text-[#111111] text-3xl font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-[24px] font-semibold text-[#111111] dark:text-white mb-1">
                {user?.name}
              </h2>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{user?.email}</p>
            </div>
          </Card>

          {/* Sign Out Card */}
          <Card className="mt-6">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </Card>
        </div>

        {/* Settings Sections */}
        <div className="col-span-2 space-y-6">
          {/* Account Section */}
          <Card>
            <h3 className="text-[20px] font-medium text-[#111111] dark:text-white mb-4">
              Account
            </h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-[#111111] dark:text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[#111111] dark:text-white font-medium">Name</p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{user?.name}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#111111] dark:text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[#111111] dark:text-white font-medium">Email</p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{user?.email}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <Smartphone size={20} className="text-[#111111] dark:text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[#111111] dark:text-white font-medium">Phone Number</p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Add phone number</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Security Section */}
          <Card>
            <h3 className="text-[20px] font-medium text-[#111111] dark:text-white mb-4">
              Security
            </h3>
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                <Lock size={20} className="text-[#111111] dark:text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#111111] dark:text-white font-medium">Change Password</p>
              </div>
            </button>
          </Card>

          {/* Preferences Section */}
          <Card>
            <h3 className="text-[20px] font-medium text-[#111111] dark:text-white mb-4">
              Preferences
            </h3>
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                <Bell size={20} className="text-[#111111] dark:text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#111111] dark:text-white font-medium">Notifications</p>
                <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Enabled</p>
              </div>
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
