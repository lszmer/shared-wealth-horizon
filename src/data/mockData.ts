
import { Account, CategoryTile, Property, Investment, Vehicle, Insurance, Valuable, Liability, Transaction } from "../types/portfolio";

export const accounts: Account[] = [
  {
    id: "personal1",
    type: "personal",
    name: "My Account",
    initial: "D",
  },
  {
    id: "joint1",
    type: "joint",
    name: "Shared with Alex",
    initial: "D",
    partnerInitial: "A",
  },
];

export const categoryTiles: CategoryTile[] = [
  {
    id: "home",
    title: "Home",
    path: "/home",
    value: 650000,
    liability: 450000,
    icon: "home",
    color: "bg-blue-500",
  },
  {
    id: "investments",
    title: "Savings & Investments",
    path: "/investments",
    value: 283500,
    icon: "piggy-bank",
    color: "bg-purple-500",
  },
  {
    id: "vehicles",
    title: "Vehicles",
    path: "/vehicles",
    value: 42000,
    liability: 25000,
    icon: "car",
    color: "bg-green-500",
  },
  {
    id: "insurance",
    title: "Insurance",
    path: "/insurance",
    value: 75000,
    icon: "shield",
    color: "bg-amber-500",
  },
  {
    id: "valuables",
    title: "Other Valuables",
    path: "/valuables",
    value: 28500,
    icon: "diamond",
    color: "bg-rose-500",
  },
  {
    id: "loans",
    title: "Loans & Credit",
    path: "/loans",
    liability: 15300,
    icon: "credit-card",
    color: "bg-red-500",
  },
];

export const properties: Property[] = [
  {
    id: "prop1",
    name: "Family Home",
    value: 650000,
    mortgages: [
      {
        id: "mort1",
        name: "Primary Mortgage",
        currentBalance: 450000,
        interestRate: 2.8,
        type: "mortgage",
      },
    ],
  },
];

export const investments: Investment[] = [
  {
    id: "inv1",
    name: "Tesla",
    value: 9976.00,
    percentageChange: 0.34,
    logo: "https://storage.googleapis.com/iex/api/logos/TSLA.png",
    type: "stock",
  },
  {
    id: "inv2",
    name: "Meta Platforms",
    value: 7305.15,
    percentageChange: 0.33,
    logo: "https://storage.googleapis.com/iex/api/logos/META.png",
    type: "stock",
  },
  {
    id: "inv3",
    name: "MSCI World ETF",
    value: 28378.78,
    percentageChange: 0.17,
    type: "stock",
  },
  {
    id: "inv4",
    name: "Apple",
    value: 14466.66,
    percentageChange: 0.33,
    logo: "https://storage.googleapis.com/iex/api/logos/AAPL.png",
    type: "stock",
  },
  {
    id: "sav1",
    name: "Emergency Fund",
    value: 25000,
    percentageChange: 0.01,
    type: "savings",
  },
  {
    id: "ret1",
    name: "401(k)",
    value: 175000,
    percentageChange: 0.22,
    type: "retirement",
  },
  {
    id: "ret2",
    name: "Rentenversicherung",
    value: 18500,
    percentageChange: 0.08,
    type: "retirement",
  },
  {
    id: "kid1",
    name: "Emma's College Fund",
    value: 4800,
    percentageChange: 0.12,
    type: "children",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "veh1",
    name: "Tesla Model Y",
    value: 42000,
    loan: {
      id: "carloan1",
      name: "Car Loan",
      currentBalance: 25000,
      interestRate: 3.5,
      type: "car",
    },
  },
];

export const insurances: Insurance[] = [
  {
    id: "ins1",
    type: "Life",
    provider: "Global Life",
    coverage: 500000,
    premium: 780,
    cashValue: 75000,
    coverageRating: "good",
    beneficiaries: "Spouse",
  },
  {
    id: "ins2",
    type: "Home",
    provider: "Secure Home",
    coverage: 750000,
    premium: 1250,
    coverageRating: "good",
  },
  {
    id: "ins3",
    type: "Auto",
    provider: "Auto Protect",
    coverage: 100000,
    premium: 960,
    coverageRating: "warning",
    details: "Consider increasing liability coverage",
  },
  {
    id: "ins4",
    type: "Health",
    provider: "Health Plus",
    coverage: 2000000,
    premium: 6500,
    coverageRating: "good",
  },
];

export const valuables: Valuable[] = [
  {
    id: "val1",
    name: "Art Collection",
    description: "Various pieces acquired over the years",
    value: 12500,
    type: "art",
  },
  {
    id: "val2",
    name: "Wedding Rings",
    value: 8500,
    type: "jewelry",
  },
  {
    id: "val3",
    name: "Vintage Watch Collection",
    value: 7500,
    type: "collectible",
  },
];

export const loans: Liability[] = [
  {
    id: "loan1",
    name: "Personal Loan",
    originalAmount: 20000,
    currentBalance: 8300,
    interestRate: 5.2,
    type: "personal",
  },
  {
    id: "loan2",
    name: "Credit Card",
    currentBalance: 7000,
    interestRate: 18.9,
    type: "credit",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "trans1",
    date: new Date(2025, 4, 1),
    amount: -1250,
    description: "Mortgage Payment",
    category: "Housing",
  },
  {
    id: "trans2",
    date: new Date(2025, 4, 5),
    amount: -582.33,
    description: "Car Payment",
    category: "Auto",
  },
  {
    id: "trans3",
    date: new Date(2025, 4, 10),
    amount: -780,
    description: "Life Insurance Premium",
    category: "Insurance",
  },
];

// Helper function to calculate total assets
export const calculateTotalAssets = () => {
  const homeValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const investmentValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const vehicleValue = vehicles.reduce((sum, veh) => sum + veh.value, 0);
  const insuranceValue = insurances.reduce((sum, ins) => sum + (ins.cashValue || 0), 0);
  const valuableValue = valuables.reduce((sum, val) => sum + val.value, 0);
  
  return homeValue + investmentValue + vehicleValue + insuranceValue + valuableValue;
};

// Helper function to calculate total liabilities
export const calculateTotalLiabilities = () => {
  const mortgages = properties.flatMap(prop => prop.mortgages)
    .reduce((sum, mortgage) => sum + mortgage.currentBalance, 0);
  const carLoans = vehicles
    .filter(veh => veh.loan)
    .reduce((sum, veh) => sum + (veh.loan?.currentBalance || 0), 0);
  const otherLoans = loans.reduce((sum, loan) => sum + loan.currentBalance, 0);
  
  return mortgages + carLoans + otherLoans;
};

// Helper function to calculate net worth
export const calculateNetWorth = () => {
  return calculateTotalAssets() - calculateTotalLiabilities();
};
