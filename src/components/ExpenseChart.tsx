import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../data/mockData';

interface ExpenseChartProps {
  data: CategoryData[];
  total: number;
}

export function ExpenseChart({ data, total }: ExpenseChartProps) {
  const chartData = data.map(item => ({
    name: item.name,
    value: item.amount,
    color: item.color
  }));

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-1">Total Spent</p>
        <p className="text-[24px] font-semibold text-[#111111] dark:text-white">
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}