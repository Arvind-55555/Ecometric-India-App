export interface CityData {
  id: number;
  name: string;
  population: number; // Approx population
  wasteTpd: number; // Tons per day
  growthRate: number; // Annual growth rate percentage
  density: number; // Waste density kg/m3
  organicShare: number; // %
  recyclableShare: number; // %
  inertShare: number; // %
}

export interface LandfillCalculation {
  year: number;
  wasteGenerated: number; // Tons
  cumulativeVolume: number; // Cubic meters
  areaRequired: number; // Square meters (assuming specific height)
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CALCULATOR = 'CALCULATOR',
  AI_ADVISOR = 'AI_ADVISOR'
}