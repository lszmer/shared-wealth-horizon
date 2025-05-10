import { formatCurrency } from "@/lib/formatters";

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  budget?: number; // Adding the optional budget property
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  categoryId: string;
}

export interface SavingsProject {
  id: string;
  name: string;
  target: number;
  current: number;
  portfolioItemId?: string; // Optional link to portfolio item
}

// Mock spending categories data
export const spendingCategories: SpendingCategory[] = [
  {
    id: "housing",
    name: "Housing",
    amount: 1500,
    percentage: 30,
    color: "bg-blue-500",
    budget: 1600
  },
  {
    id: "food",
    name: "Food",
    amount: 800,
    percentage: 16,
    color: "bg-green-500",
    budget: 900
  },
  {
    id: "mobility",
    name: "Mobility",
    amount: 600,
    percentage: 12,
    color: "bg-yellow-500",
    budget: 700
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 400,
    percentage: 8,
    color: "bg-purple-500",
    budget: 500
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 350,
    percentage: 7,
    color: "bg-orange-500",
    budget: 400
  },
  {
    id: "savings",
    name: "Savings",
    amount: 750,
    percentage: 15,
    color: "bg-mint-500",
    budget: 750
  },
  {
    id: "insurance",
    name: "Insurance",
    amount: 250,
    percentage: 5,
    color: "bg-pink-500",
    budget: 250
  },
  {
    id: "other",
    name: "Other",
    amount: 350,
    percentage: 7,
    color: "bg-gray-500",
    budget: 400
  }
];

// Calculate total monthly spending
export const totalMonthlySpending = spendingCategories.reduce(
  (total, category) => total + category.amount,
  0
);

// Format for display
export const formattedTotalSpending = formatCurrency(totalMonthlySpending);

// Housing transactions that will be shared between both views
export const housingTransactions: Transaction[] = [
  // Current Month (May 2025)
  { id: "h1", description: "Rent Payment", date: "2025-05-01", amount: 1400, categoryId: "housing" },
  { id: "h2", description: "Home Insurance", date: "2025-05-05", amount: 100, categoryId: "housing" },
  
  // April 2025
  { id: "h3", description: "Rent Payment", date: "2025-04-01", amount: 1400, categoryId: "housing" },
  { id: "h4", description: "Home Insurance", date: "2025-04-05", amount: 100, categoryId: "housing" },
  { id: "h5", description: "Home Maintenance", date: "2025-04-15", amount: 250, categoryId: "housing" },
  
  // March 2025
  { id: "h6", description: "Rent Payment", date: "2025-03-01", amount: 1400, categoryId: "housing" },
  { id: "h7", description: "Home Insurance", date: "2025-03-05", amount: 100, categoryId: "housing" },
  { id: "h8", description: "Plumbing Repairs", date: "2025-03-22", amount: 320, categoryId: "housing" },
  
  // February 2025
  { id: "h9", description: "Rent Payment", date: "2025-02-01", amount: 1400, categoryId: "housing" },
  { id: "h10", description: "Home Insurance", date: "2025-02-05", amount: 100, categoryId: "housing" }
];

// Mock transactions data
export const transactions: Transaction[] = [
  // Add all housing transactions first
  ...housingTransactions,
  
  // Food transactions
  // Current Month (May 2025)
  { id: "t3", description: "Grocery Store", date: "2025-05-02", amount: 230, categoryId: "food" },
  { id: "t4", description: "Restaurant Dinner", date: "2025-05-09", amount: 86, categoryId: "food" },
  { id: "t5", description: "Coffee Shop", date: "2025-05-12", amount: 24, categoryId: "food" },
  { id: "t6", description: "Grocery Store", date: "2025-05-18", amount: 215, categoryId: "food" },
  { id: "t7", description: "Fast Food", date: "2025-05-23", amount: 42, categoryId: "food" },
  { id: "t8", description: "Bakery", date: "2025-05-27", amount: 35, categoryId: "food" },
  { id: "t9", description: "Grocery Store", date: "2025-05-28", amount: 168, categoryId: "food" },
  
  // April 2025
  { id: "f1", description: "Grocery Store", date: "2025-04-03", amount: 245, categoryId: "food" },
  { id: "f2", description: "Restaurant Dinner", date: "2025-04-12", amount: 92, categoryId: "food" },
  { id: "f3", description: "Coffee Shop", date: "2025-04-15", amount: 18, categoryId: "food" },
  { id: "f4", description: "Grocery Store", date: "2025-04-20", amount: 205, categoryId: "food" },
  
  // March 2025
  { id: "f5", description: "Grocery Store", date: "2025-03-05", amount: 238, categoryId: "food" },
  { id: "f6", description: "Restaurant Dinner", date: "2025-03-17", amount: 104, categoryId: "food" },
  { id: "f7", description: "Grocery Store", date: "2025-03-22", amount: 196, categoryId: "food" },
  
  // Mobility transactions
  // Current Month (May 2025)
  { id: "t10", description: "Gas Station", date: "2025-05-03", amount: 58, categoryId: "mobility" },
  { id: "t11", description: "Car Payment", date: "2025-05-15", amount: 320, categoryId: "mobility" },
  { id: "t12", description: "Parking Fee", date: "2025-05-08", amount: 25, categoryId: "mobility" },
  { id: "t13", description: "Car Insurance", date: "2025-05-10", amount: 120, categoryId: "mobility" },
  { id: "t14", description: "Gas Station", date: "2025-05-22", amount: 52, categoryId: "mobility" },
  { id: "t15", description: "Public Transport", date: "2025-05-14", amount: 25, categoryId: "mobility" },
  
  // April 2025
  { id: "m1", description: "Gas Station", date: "2025-04-04", amount: 62, categoryId: "mobility" },
  { id: "m2", description: "Car Payment", date: "2025-04-15", amount: 320, categoryId: "mobility" },
  { id: "m3", description: "Car Insurance", date: "2025-04-10", amount: 120, categoryId: "mobility" },
  
  // March 2025
  { id: "m4", description: "Gas Station", date: "2025-03-07", amount: 55, categoryId: "mobility" },
  { id: "m5", description: "Car Payment", date: "2025-03-15", amount: 320, categoryId: "mobility" },
  { id: "m6", description: "Car Insurance", date: "2025-03-10", amount: 120, categoryId: "mobility" },
  { id: "m7", description: "Car Maintenance", date: "2025-03-22", amount: 180, categoryId: "mobility" },
  
  // Entertainment transactions
  // Current Month (May 2025)
  { id: "t16", description: "Movie Theater", date: "2025-05-07", amount: 48, categoryId: "entertainment" },
  { id: "t17", description: "Streaming Service", date: "2025-05-02", amount: 15, categoryId: "entertainment" },
  { id: "t18", description: "Concert Tickets", date: "2025-05-19", amount: 150, categoryId: "entertainment" },
  { id: "t19", description: "Video Game", date: "2025-05-24", amount: 65, categoryId: "entertainment" },
  { id: "t20", description: "Music Subscription", date: "2025-05-15", amount: 10, categoryId: "entertainment" },
  { id: "t21", description: "Book Store", date: "2025-05-28", amount: 32, categoryId: "entertainment" },
  { id: "t22", description: "Bowling", date: "2025-05-21", amount: 45, categoryId: "entertainment" },
  { id: "t23", description: "Video Streaming", date: "2025-05-10", amount: 35, categoryId: "entertainment" },
  
  // April 2025
  { id: "e1", description: "Movie Theater", date: "2025-04-12", amount: 52, categoryId: "entertainment" },
  { id: "e2", description: "Streaming Service", date: "2025-04-02", amount: 15, categoryId: "entertainment" },
  { id: "e3", description: "Music Subscription", date: "2025-04-15", amount: 10, categoryId: "entertainment" },
  
  // March 2025
  { id: "e4", description: "Streaming Service", date: "2025-03-02", amount: 15, categoryId: "entertainment" },
  { id: "e5", description: "Concert Tickets", date: "2025-03-08", amount: 180, categoryId: "entertainment" },
  { id: "e6", description: "Music Subscription", date: "2025-03-15", amount: 10, categoryId: "entertainment" },
  
  // Utilities transactions
  // Current Month (May 2025)
  { id: "t24", description: "Electricity Bill", date: "2025-05-10", amount: 110, categoryId: "utilities" },
  { id: "t25", description: "Water Bill", date: "2025-05-15", amount: 65, categoryId: "utilities" },
  { id: "t26", description: "Internet Service", date: "2025-05-20", amount: 80, categoryId: "utilities" },
  { id: "t27", description: "Phone Bill", date: "2025-05-18", amount: 95, categoryId: "utilities" },
  
  // April 2025
  { id: "u1", description: "Electricity Bill", date: "2025-04-10", amount: 105, categoryId: "utilities" },
  { id: "u2", description: "Water Bill", date: "2025-04-15", amount: 62, categoryId: "utilities" },
  { id: "u3", description: "Internet Service", date: "2025-04-20", amount: 80, categoryId: "utilities" },
  { id: "u4", description: "Phone Bill", date: "2025-04-18", amount: 95, categoryId: "utilities" },
  
  // March 2025
  { id: "u5", description: "Electricity Bill", date: "2025-03-10", amount: 118, categoryId: "utilities" },
  { id: "u6", description: "Water Bill", date: "2025-03-15", amount: 70, categoryId: "utilities" },
  { id: "u7", description: "Internet Service", date: "2025-03-20", amount: 80, categoryId: "utilities" },
  { id: "u8", description: "Phone Bill", date: "2025-03-18", amount: 95, categoryId: "utilities" },
  
  // Savings transactions
  // May 2025
  { id: "t28", description: "Monthly Savings Transfer", date: "2025-05-01", amount: 500, categoryId: "savings" },
  { id: "t29", description: "Emergency Fund Addition", date: "2025-05-15", amount: 250, categoryId: "savings" },
  
  // April 2025
  { id: "s1", description: "Monthly Savings Transfer", date: "2025-04-01", amount: 500, categoryId: "savings" },
  { id: "s2", description: "Emergency Fund Addition", date: "2025-04-15", amount: 250, categoryId: "savings" },
  
  // March 2025
  { id: "s3", description: "Monthly Savings Transfer", date: "2025-03-01", amount: 500, categoryId: "savings" },
  { id: "s4", description: "Emergency Fund Addition", date: "2025-03-15", amount: 300, categoryId: "savings" },
  
  // Insurance transactions
  // May 2025
  { id: "t30", description: "Health Insurance", date: "2025-05-05", amount: 180, categoryId: "insurance" },
  { id: "t31", description: "Life Insurance", date: "2025-05-10", amount: 70, categoryId: "insurance" },
  
  // April 2025
  { id: "i1", description: "Health Insurance", date: "2025-04-05", amount: 180, categoryId: "insurance" },
  { id: "i2", description: "Life Insurance", date: "2025-04-10", amount: 70, categoryId: "insurance" },
  
  // March 2025
  { id: "i3", description: "Health Insurance", date: "2025-03-05", amount: 180, categoryId: "insurance" },
  { id: "i4", description: "Life Insurance", date: "2025-03-10", amount: 70, categoryId: "insurance" },
  
  // Other transactions
  // May 2025
  { id: "t32", description: "Haircut", date: "2025-05-14", amount: 45, categoryId: "other" },
  { id: "t33", description: "Gym Membership", date: "2025-05-01", amount: 60, categoryId: "other" },
  { id: "t34", description: "Pet Supplies", date: "2025-05-17", amount: 78, categoryId: "other" },
  { id: "t35", description: "Clothing", date: "2025-05-22", amount: 120, categoryId: "other" },
  { id: "t36", description: "Charity Donation", date: "2025-05-28", amount: 47, categoryId: "other" },
  
  // April 2025
  { id: "o1", description: "Haircut", date: "2025-04-12", amount: 45, categoryId: "other" },
  { id: "o2", description: "Gym Membership", date: "2025-04-01", amount: 60, categoryId: "other" },
  { id: "o3", description: "Pet Supplies", date: "2025-04-20", amount: 65, categoryId: "other" },
  
  // March 2025
  { id: "o4", description: "Gym Membership", date: "2025-03-01", amount: 60, categoryId: "other" },
  { id: "o5", description: "Clothing", date: "2025-03-15", amount: 135, categoryId: "other" },
  { id: "o6", description: "Charity Donation", date: "2025-03-27", amount: 50, categoryId: "other" }
];

// Mock savings projects
export const savingsProjects: SavingsProject[] = [
  {
    id: "emergency",
    name: "Emergency Fund",
    target: 10000,
    current: 5200
  },
  {
    id: "vacation",
    name: "Summer Vacation",
    target: 3000,
    current: 1800
  },
  {
    id: "sofa",
    name: "New Sofa",
    target: 1200,
    current: 850,
    portfolioItemId: "furniture" // Links to furniture in Portfolio
  },
  {
    id: "car",
    name: "Car Down Payment",
    target: 5000,
    current: 2200,
    portfolioItemId: "vehicles" // Links to vehicles in Portfolio
  }
];
