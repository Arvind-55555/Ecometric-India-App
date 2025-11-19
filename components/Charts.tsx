import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { CITIES } from '../constants';

const COLORS = ['#10b981', '#f59e0b', '#64748b', '#3b82f6', '#8b5cf6'];

export const WasteGenerationChart: React.FC = () => {
  return (
    <div className="w-full h-full">
        <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Daily Waste Generation (TPD)</h3>
        <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CITIES} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                height={60} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
            />
            <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                label={{ value: 'Tons Per Day', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
            />
            <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="wasteTpd" fill="#10b981" radius={[4, 4, 0, 0]} name="Waste (TPD)" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};

export const CompositionChart: React.FC<{ cityId: number }> = ({ cityId }) => {
  const city = CITIES.find(c => c.id === cityId) || CITIES[0];
  
  const data = [
    { name: 'Organic', value: city.organicShare },
    { name: 'Recyclable', value: city.recyclableShare },
    { name: 'Inert/Others', value: city.inertShare },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">{city.name} Waste Composition</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
          <p className="text-xs text-slate-400">Dominant fraction: <span className="font-medium text-emerald-600">{data.reduce((prev, current) => (prev.value > current.value) ? prev : current).name}</span></p>
      </div>
    </div>
  );
};