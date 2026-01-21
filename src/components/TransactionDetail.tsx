import { ArrowLeft, CreditCard, Calendar, Tag } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';

interface TransactionDetailProps {
  onBack: () => void;
}

export function TransactionDetail({ onBack }: TransactionDetailProps) {
  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-[#111111] dark:text-white" />
          </button>
          <h1 className="text-[24px] font-semibold text-[#111111] dark:text-white">Transaction</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Amount Card */}
      <Card className="mb-6 text-center">
        <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Amount</p>
        <p className="text-[48px] font-semibold text-[#111111] dark:text-white">
          $249.99
        </p>
      </Card>

      {/* Transaction Info */}
      <Card className="mb-6">
        <h3 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Details</h3>
        
        <div className="space-y-4">
          {/* Merchant */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fbc19a]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🛍️</span>
            </div>
            <div className="flex-1">
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Merchant</p>
              <p className="text-[#111111] dark:text-white font-medium">Amazon</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Date</p>
              <p className="text-[#111111] dark:text-white font-medium">January 18, 2026</p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <Tag size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Category</p>
              <p className="text-[#111111] dark:text-white font-medium">Shopping</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <CreditCard size={20} className="text-[#111111] dark:text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Payment Method</p>
              <p className="text-[#111111] dark:text-white font-medium">•••• 4242</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Line Items */}
      <Card>
        <h3 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Items</h3>
        <div className="space-y-3">
          {[
            { name: 'Wireless Headphones', qty: 1, price: 159.99 },
            { name: 'USB-C Cable', qty: 2, price: 45.00 },
            { name: 'Phone Case', qty: 1, price: 45.00 },
          ].map((item, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[#111111] dark:text-white">{item.name}</p>
                <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Qty: {item.qty}</p>
              </div>
              <p className="text-[#111111] dark:text-white font-medium">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-[#F7F7F7] dark:border-[#2A2A2A] space-y-2">
          <div className="flex justify-between">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Subtotal</p>
            <p className="text-[#111111] dark:text-white">$249.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Tax</p>
            <p className="text-[#111111] dark:text-white">$0.00</p>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#F7F7F7] dark:border-[#2A2A2A]">
            <p className="text-[#111111] dark:text-white font-semibold">Total</p>
            <p className="text-[20px] font-semibold text-[#111111] dark:text-white">$249.99</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
