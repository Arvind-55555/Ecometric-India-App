import React, { useState, useEffect } from 'react';
import { CITIES, LANDFILL_HEIGHT_METERS, WASTE_COMPACTION_FACTOR } from '../constants';
import { CityData, LandfillCalculation } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CalculatorComp: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<number>(CITIES[0].id);
  const [durationYears, setDurationYears] = useState<number>(15);
  const [customGrowthRate, setCustomGrowthRate] = useState<number>(CITIES[0].growthRate);
  const [results, setResults] = useState<LandfillCalculation[]>([]);

  const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[0];

  useEffect(() => {
    setCustomGrowthRate(selectedCity.growthRate);
  }, [selectedCityId, selectedCity.growthRate]);

  useEffect(() => {
    calculateProjections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityId, durationYears, customGrowthRate]);

  const calculateProjections = () => {
    const projections: LandfillCalculation[] = [];
    let currentWasteTpd = selectedCity.wasteTpd;
    let cumulativeVolume = 0;

    const startYear = new Date().getFullYear();

    for (let i = 0; i <= durationYears; i++) {
      const year = startYear + i;
      
      // Annual waste in tons
      const annualWaste = currentWasteTpd * 365;
      
      // Volume calculation: Mass / Density
      // Assuming density is kg/m3, so we convert tons to kg (x1000)
      // Volume (m3) = (Tons * 1000) / Density
      // Apply compaction factor (0.85 means it takes up 85% of original volume or is compacted? 
      // Usually compaction increases density. Let's assume Compaction Factor reduces volume.
      const volumeM3 = ((annualWaste * 1000) / selectedCity.density) * WASTE_COMPACTION_FACTOR;

      cumulativeVolume += volumeM3;
      
      // Area = Volume / Height
      const areaSqM = cumulativeVolume / LANDFILL_HEIGHT_METERS;

      projections.push({
        year,
        wasteGenerated: Math.round(annualWaste),
        cumulativeVolume: Math.round(cumulativeVolume),
        areaRequired: Math.round(areaSqM)
      });

      // Increase waste for next year
      currentWasteTpd = currentWasteTpd * (1 + customGrowthRate / 100);
    }
    setResults(projections);
  };

  const finalAreaHectares = results.length > 0 ? (results[results.length - 1].areaRequired / 10000).toFixed(2) : "0";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Landfill Requirement Estimator</h2>
          <p className="text-slate-500 text-sm mt-1">Simulate future land requirements based on city growth parameters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select City</label>
              <select 
                value={selectedCityId} 
                onChange={(e) => setSelectedCityId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {CITIES.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700">Annual Waste Growth</label>
                        <span className="text-sm font-bold text-emerald-600">{customGrowthRate}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="8.0" 
                        step="0.1"
                        value={customGrowthRate} 
                        onChange={(e) => setCustomGrowthRate(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <p className="text-xs text-slate-500 mt-1">National avg for metros: ~2-4%</p>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700">Projection Period</label>
                        <span className="text-sm font-bold text-emerald-600">{durationYears} Years</span>
                    </div>
                    <input 
                        type="range" 
                        min="5" 
                        max="50" 
                        step="5"
                        value={durationYears} 
                        onChange={(e) => setDurationYears(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <h4 className="text-emerald-800 font-semibold mb-2">Estimation Parameters</h4>
                <ul className="text-xs text-emerald-700 space-y-1">
                    <li className="flex justify-between"><span>Current TPD:</span> <span>{selectedCity.wasteTpd.toLocaleString()} T</span></li>
                    <li className="flex justify-between"><span>Waste Density:</span> <span>{selectedCity.density} kg/m³</span></li>
                    <li className="flex justify-between"><span>Landfill Height:</span> <span>{LANDFILL_HEIGHT_METERS} m</span></li>
                    <li className="flex justify-between"><span>Compaction:</span> <span>85%</span></li>
                </ul>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                    <p className="text-xs text-slate-500 uppercase font-medium">Total Waste ({durationYears}y)</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                        {(results.length > 0 ? (results[results.length-1].cumulativeVolume * selectedCity.density / 1000 / 1000000).toFixed(2) : 0)} <span className="text-sm font-normal text-slate-400">Million Tons</span>
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Land Area Required</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                        {finalAreaHectares} <span className="text-sm font-normal text-slate-400">Hectares</span>
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                    <p className="text-xs text-slate-500 uppercase font-medium">By Year</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                        {new Date().getFullYear() + durationYears}
                    </p>
                </div>
             </div>

             <div className="flex-1 min-h-[300px] bg-white rounded-xl border border-slate-100 p-4">
                <h3 className="text-sm font-semibold text-slate-500 mb-4">Projected Landfill Area Requirement (Accumulated)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="year" tick={{fontSize: 12}} stroke="#94a3b8" />
                        <YAxis tick={{fontSize: 12}} stroke="#94a3b8" label={{ value: 'Area (m²)', angle: -90, position: 'insideLeft', style: {fill: '#cbd5e1'} }}/>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                        <Area type="monotone" dataKey="areaRequired" stroke="#10b981" fillOpacity={1} fill="url(#colorArea)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};