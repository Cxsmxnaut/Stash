import { CreditCard, Wallet, Plus } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { accounts } from '../data/accountsData';

export function Accounts() {
  const totalBalance = accounts.reduce((sum, account) => {
    return sum + account.balance;
  }, 0);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return CreditCard;
      default:
        return Wallet;
    }
  };

  const formatAccountType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">Accounts</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{accounts.length} connected</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Total Balance */}
      <Card className="mb-6">
        <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Total Balance</p>
        <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </Card>

      {/* Accounts List */}
      <div className="space-y-4 mb-6">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          const isNegative = account.balance < 0;

          return (
            <Card key={account.id}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-[#111111] dark:text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#111111] dark:text-white font-medium mb-1">{account.name}</h3>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-1">
                    {formatAccountType(account.type)} ••••{account.lastFour}
                  </p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{account.institution}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[20px] font-semibold ${isNegative ? 'text-red-500' : 'text-[#111111] dark:text-white'}`}>
                    {isNegative ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Account Button */}
      <button
        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-[#8E8E93] dark:border-[#A0A0A0] text-[#8E8E93] dark:text-[#A0A0A0] hover:border-[#111111] hover:text-[#111111] dark:hover:border-white dark:hover:text-white transition-colors"
      >
        <Plus size={20} strokeWidth={2.5} />
        <span className="font-medium">Connect Account</span>
      </button>
    </div>
  );
}
