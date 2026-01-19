import { ArrowLeft, Upload, X, CreditCard } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

interface ReceiptDetailProps {
  onBack: () => void;
}

export function ReceiptDetail({ onBack }: ReceiptDetailProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [showDetail, setShowDetail] = useState(false);

  const handleFileAdd = () => {
    // Simulate file selection
    setFiles([...files, `Receipt_${Date.now()}.pdf`]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      setShowDetail(true);
    }
  };

  if (showDetail) {
    return (
      <div className="px-5 pt-12 pb-24">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDetail(false)}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
              aria-label="Back"
            >
              <ArrowLeft size={20} className="text-[#111111] dark:text-white" />
            </button>
            <h1 className="text-[24px] font-semibold text-[#111111] dark:text-white">Receipt Detail</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Merchant Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD166]/20 flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
            <div>
              <h2 className="text-[20px] font-semibold text-[#111111] dark:text-white">Amazon</h2>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0]">January 18, 2026</p>
            </div>
          </div>

          {/* Barcode Placeholder */}
          <div className="w-full h-24 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-2xl flex items-center justify-center mb-4">
            <div className="flex gap-0.5">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 bg-[#111111] dark:bg-white rounded-sm"
                  style={{ height: Math.random() > 0.5 ? '48px' : '32px' }}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="mb-6">
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

        {/* Payment Method */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] dark:bg-white flex items-center justify-center">
              <CreditCard size={20} className="text-white dark:text-[#111111]" />
            </div>
            <div>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Paid with</p>
              <p className="text-[#111111] dark:text-white font-medium">•••• 4242</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-[24px] font-semibold text-[#111111] dark:text-white">Upload Receipt</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Upload Area */}
      <Card className="mb-6">
        <div 
          onClick={handleFileAdd}
          className="border-2 border-dashed border-[#E5E5E5] dark:border-[#3A3A3A] rounded-2xl p-8 text-center hover:border-[#111111] dark:hover:border-white transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-[#111111] dark:text-white" />
          </div>
          <h3 className="text-[#111111] dark:text-white font-medium mb-1">Upload Receipt</h3>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">Click to select files or drag and drop</p>
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="mb-6">
          <h3 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Files ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1E1E1E] flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <p className="flex-1 text-[#111111] dark:text-white text-sm truncate">{file}</p>
                <button
                  onClick={() => handleFileRemove(index)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#2A2A2A] transition-colors"
                  aria-label="Remove file"
                >
                  <X size={16} className="text-[#8E8E93] dark:text-[#A0A0A0]" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Action Button */}
      <Button 
        onClick={handleUpload}
        className={files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
      >
        Upload Files
      </Button>
    </div>
  );
}