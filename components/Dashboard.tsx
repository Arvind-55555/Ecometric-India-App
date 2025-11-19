import React, { useState } from 'react';
import { WasteGenerationChart, CompositionChart } from './Charts';
import { CITIES } from '../constants';
import { ArrowUpRight, Users, Scale, Truck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [activeCityComposition, setActiveCityComposition] = useState<number>(CITIES[0].id);

  const totalWaste = CITIES.reduce((acc, curr) => acc + curr.wasteTpd, 0);
  const totalPop = CITIES.reduce((acc, curr) => acc + curr.population, 0);
  const avgGrowth = (CITIES.reduce((acc, curr) => acc + curr.growthRate, 0) / CITIES.length).toFixed(1);

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Daily Waste</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalWaste.toLocaleString()} <span className="text-sm font-normal text-slate-400">TPD</span></h3>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                        <Truck className="w-5 h-5 text-red-500" />
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Across top 10 cities</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Population Covered</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{(totalPop / 1000000).toFixed(1)} <span className="text-sm font-normal text-slate-400">M</span></h3>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                </div>
                 <p className="text-xs text-slate-400 mt-4">Census Estimates</p>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Avg. Waste Growth</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{avgGrowth}% <span className="text-sm font-normal text-slate-400">/ yr</span></h3>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <ArrowUpRight className="w-5 h-5 text-amber-500" />
                    </div>
                </div>
                 <p className="text-xs text-slate-400 mt-4">Compound Annual Rate</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Per Capita Avg</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{((totalWaste * 1000) / totalPop).toFixed(2)} <span className="text-sm font-normal text-slate-400">kg/day</span></h3>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <Scale className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
                 <p className="text-xs text-slate-400 mt-4">Weighted Average</p>
            </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <WasteGenerationChart />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div className="mb-4 flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Select City for Composition</label>
                    <select 
                        className="text-sm border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:border-emerald-500"
                        value={activeCityComposition}
                        onChange={(e) => setActiveCityComposition(Number(e.target.value))}
                    >
                        {CITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <CompositionChart cityId={activeCityComposition} />
                </div>
            </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">City-wise Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">City</th>
                            <th className="px-6 py-3 text-right">Waste (TPD)</th>
                            <th className="px-6 py-3 text-right">Population</th>
                            <th className="px-6 py-3 text-right">Organic %</th>
                            <th className="px-6 py-3 text-right">Recyclable %</th>
                            <th className="px-6 py-3 text-right">Growth Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {CITIES.map((city) => (
                            <tr key={city.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-800">{city.name}</td>
                                <td className="px-6 py-4 text-right text-slate-600">{city.wasteTpd.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right text-slate-600">{city.population.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right text-emerald-600">{city.organicShare}%</td>
                                <td className="px-6 py-4 text-right text-blue-600">{city.recyclableShare}%</td>
                                <td className="px-6 py-4 text-right text-slate-600">{city.growthRate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};