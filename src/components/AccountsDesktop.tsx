import { CreditCard, Wallet, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { accounts } from '../data/accountsData';

export function AccountsDesktop() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = accounts.filter(a => a.balance > 0).reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter(a => a.balance < 0).reduce((sum, a) => sum + a.balance, 0));

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
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Accounts</h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{accounts.length} connected accounts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Total Balance</p>
          <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-green-500" />
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Assets</p>
          </div>
          <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
            ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} className="text-red-500" />
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Liabilities</p>
          </div>
          <p className="text-[32px] font-semibold text-red-500">
            ${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          const isNegative = account.balance < 0;

          return (
            <Card key={account.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <Icon size={28} className="text-[#111111] dark:text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[20px] font-semibold text-[#111111] dark:text-white mb-2">{account.name}</h3>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-1">
                    {formatAccountType(account.type)} ••••{account.lastFour}
                  </p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{account.institution}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[28px] font-semibold ${isNegative ? 'text-red-500' : 'text-[#111111] dark:text-white'}`}>
                    {isNegative ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Add Account Card */}
        <Card className="border-2 border-dashed border-[#8E8E93] dark:border-[#A0A0A0] bg-transparent hover:border-[#111111] hover:bg-[#F7F7F7] dark:hover:border-white dark:hover:bg-[#2A2A2A] transition-all cursor-pointer">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center mb-4">
              <Plus size={28} className="text-[#8E8E93] dark:text-[#A0A0A0]" strokeWidth={2.5} />
            </div>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] font-medium">Connect Account</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
