import { User, Mail, Bell, Lock, CreditCard, HelpCircle, LogOut, Shield, Smartphone, Edit } from 'lucide-react';
import { Card } from './Card';
import { useAuth } from '../contexts/AuthContext';

export function UserCenterDesktop() {
  const { user, logout } = useAuth();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', value: user?.name },
        { icon: Mail, label: 'Email Address', value: user?.email },
        { icon: Smartphone, label: 'Phone Number', value: 'Add phone number' },
      ],
    },
    {
      title: 'Security',
      items: [
        { icon: Lock, label: 'Change Password', value: '' },
        { icon: Shield, label: 'Two-Factor Authentication', value: 'Disabled' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'Enabled' },
        { icon: CreditCard, label: 'Payment Methods', value: '2 cards' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', value: '' },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Profile & Settings</h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="col-span-1 space-y-6">
          {/* Profile Card */}
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
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-4">{user?.email}</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#111111] dark:text-white hover:bg-[#EEEEEE] dark:hover:bg-[#333333] transition-colors mx-auto">
                <Edit size={16} />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3 pt-6 border-t border-[#F7F7F7] dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] dark:text-[#A0A0A0]">Member since</span>
                <span className="text-[#111111] dark:text-white font-medium">Jan 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] dark:text-[#A0A0A0]">Total transactions</span>
                <span className="text-[#111111] dark:text-white font-medium">243</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] dark:text-[#A0A0A0]">Total spent</span>
                <span className="text-[#111111] dark:text-white font-medium">$12,461.23</span>
              </div>
            </div>
          </Card>

          {/* Logout Card */}
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

        {/* Right Column - Settings */}
        <div className="col-span-2 space-y-6">
          {settingsSections.map((section) => (
            <Card key={section.title}>
              <h3 className="text-[20px] font-medium text-[#111111] dark:text-white mb-4">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#111111] dark:text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[#111111] dark:text-white font-medium">{item.label}</p>
                        {item.value && (
                          <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{item.value}</p>
                        )}
                      </div>
                      <div className="text-[#8E8E93] dark:text-[#A0A0A0]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
