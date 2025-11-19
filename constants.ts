import { CityData } from './types';

// Estimated data based on MSW typical profiles for Indian Metros (Approximate values for simulation)
export const CITIES: CityData[] = [
  {
    id: 1,
    name: "Mumbai",
    population: 20411000,
    wasteTpd: 9000,
    growthRate: 2.5,
    density: 500,
    organicShare: 45,
    recyclableShare: 20,
    inertShare: 35
  },
  {
    id: 2,
    name: "Delhi",
    population: 30291000,
    wasteTpd: 10500,
    growthRate: 3.0,
    density: 450,
    organicShare: 50,
    recyclableShare: 25,
    inertShare: 25
  },
  {
    id: 3,
    name: "Bangalore",
    population: 12765000,
    wasteTpd: 5000,
    growthRate: 3.5,
    density: 480,
    organicShare: 55,
    recyclableShare: 25,
    inertShare: 20
  },
  {
    id: 4,
    name: "Chennai",
    population: 11235000,
    wasteTpd: 5000,
    growthRate: 2.1,
    density: 520,
    organicShare: 48,
    recyclableShare: 22,
    inertShare: 30
  },
  {
    id: 5,
    name: "Hyderabad",
    population: 10269000,
    wasteTpd: 6000,
    growthRate: 2.8,
    density: 470,
    organicShare: 52,
    recyclableShare: 28,
    inertShare: 20
  },
  {
    id: 6,
    name: "Kolkata",
    population: 14850000,
    wasteTpd: 4000,
    growthRate: 1.8,
    density: 550,
    organicShare: 45,
    recyclableShare: 15,
    inertShare: 40
  },
  {
    id: 7,
    name: "Ahmedabad",
    population: 8059000,
    wasteTpd: 4000,
    growthRate: 2.4,
    density: 460,
    organicShare: 40,
    recyclableShare: 30,
    inertShare: 30
  },
  {
    id: 8,
    name: "Pune",
    population: 6819000,
    wasteTpd: 2200,
    growthRate: 2.9,
    density: 490,
    organicShare: 55,
    recyclableShare: 30,
    inertShare: 15
  },
  {
    id: 9,
    name: "Surat",
    population: 7489000,
    wasteTpd: 2200,
    growthRate: 3.2,
    density: 480,
    organicShare: 40,
    recyclableShare: 35,
    inertShare: 25
  },
  {
    id: 10,
    name: "Jaipur",
    population: 4007000,
    wasteTpd: 1700,
    growthRate: 2.6,
    density: 450,
    organicShare: 45,
    recyclableShare: 20,
    inertShare: 35
  }
];

export const LANDFILL_HEIGHT_METERS = 20; // Assumption for area calc
export const WASTE_COMPACTION_FACTOR = 0.85; // Post-compaction volume ratio