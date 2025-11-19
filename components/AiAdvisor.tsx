import React, { useState } from 'react';
import { CITIES } from '../constants';
import { generateWasteInsights, generateComparisonReport } from '../services/geminiService';
import { Sparkles, FileText, AlertCircle, Loader2 } from 'lucide-react';

export const AiAdvisor: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<number>(CITIES[0].id);
  const [insight, setInsight] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportType, setReportType] = useState<'city' | 'comparison'>('city');

  const handleGenerate = async () => {
    setIsLoading(true);
    setInsight("");
    
    try {
        if (reportType === 'city') {
            const city = CITIES.find(c => c.id === selectedCityId) || CITIES[0];
            const result = await generateWasteInsights(city);
            setInsight(result);
        } else {
            const result = await generateComparisonReport(CITIES);
            setInsight(result);
        }
    } catch (e) {
        setInsight("Error connecting to AI service.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg shadow-emerald-900/5 border border-emerald-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-emerald-200" />
                <h2 className="text-2xl font-bold">AI Waste Strategy Advisor</h2>
            </div>
            <p className="text-emerald-50 max-w-xl">
                Leverage Gemini 2.5 Flash to generate tailored strategies for reducing landfill dependency based on specific city compositions.
            </p>
        </div>

        <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setReportType('city')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${reportType === 'city' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Single City Analysis
                        </button>
                        <button 
                            onClick={() => setReportType('comparison')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${reportType === 'comparison' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Comparison Summary
                        </button>
                    </div>
                </div>

                {reportType === 'city' && (
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Select Target City</label>
                        <select 
                            value={selectedCityId} 
                            onChange={(e) => setSelectedCityId(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none"
                        >
                            {CITIES.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <button 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isLoading ? 'Analyzing...' : 'Generate Insights'}
                </button>
            </div>

            <div className="min-h-[300px] bg-slate-50 rounded-xl border border-slate-200 p-6 relative">
                {!insight && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                        <FileText className="w-12 h-12 mb-3 opacity-20" />
                        <p>Select parameters and click Generate to view AI insights.</p>
                    </div>
                )}
                
                {isLoading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-600 bg-slate-50/80 z-10">
                        <Loader2 className="w-10 h-10 animate-spin mb-3" />
                        <p className="font-medium animate-pulse">Consulting Gemini 2.5 Flash...</p>
                    </div>
                )}

                {insight && (
                    <div className="prose prose-emerald max-w-none">
                         <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                            {insight.split('\n').map((line, i) => (
                                <p key={i} className={line.trim().startsWith('-') ? 'pl-4' : ''}>
                                    {line.includes('**') ? (
                                        <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                                    ) : (
                                        line
                                    )}
                                </p>
                            ))}
                         </div>
                         <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-400">
                            <AlertCircle className="w-3 h-3" />
                            <span>AI-generated content. Verify with local municipal authorities before implementation.</span>
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};