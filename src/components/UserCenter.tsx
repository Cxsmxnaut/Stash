import { User, Mail, Bell, Lock, CreditCard, HelpCircle, LogOut, ChevronRight, Shield, Smartphone } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function UserCenter() {
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
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">Profile</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Manage your account</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-[#111111] dark:bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-white dark:text-[#111111] text-2xl font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-[24px] font-semibold text-[#111111] dark:text-white mb-1">
              {user?.name}
            </h2>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium mb-3 px-1">
              {section.title}
            </h3>
            <Card className="!p-0 overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === section.items.length - 1;

                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors ${
                      !isLast ? 'border-b border-[#F7F7F7] dark:border-[#2A2A2A]' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#111111] dark:text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[#111111] dark:text-white font-medium">{item.label}</p>
                      {item.value && (
                        <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{item.value}</p>
                      )}
                    </div>
                    <ChevronRight size={20} className="text-[#8E8E93] dark:text-[#A0A0A0]" />
                  </button>
                );
              })}
            </Card>
          </div>
        ))}
      </div>

      {/* Logout Button */}
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
  );
}
