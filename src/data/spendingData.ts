import { formatCurrency } from "@/lib/formatters";

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
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
    color: "bg-blue-500"
  },
  {
    id: "food",
    name: "Food",
    amount: 800,
    percentage: 16,
    color: "bg-green-500"
  },
  {
    id: "mobility",
    name: "Mobility",
    amount: 600,
    percentage: 12,
    color: "bg-yellow-500"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 400,
    percentage: 8,
    color: "bg-purple-500"
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 350,
    percentage: 7,
    color: "bg-orange-500"
  },
  {
    id: "savings",
    name: "Savings",
    amount: 750,
    percentage: 15,
    color: "bg-mint-500"
  },
  {
    id: "insurance",
    name: "Insurance",
    amount: 250,
    percentage: 5,
    color: "bg-pink-500"
  },
  {
    id: "other",
    name: "Other",
    amount: 350,
    percentage: 7,
    color: "bg-gray-500"
  }
];

// Calculate total monthly spending
export const totalMonthlySpending = spendingCategories.reduce(
  (total, category) => total + category.amount,
  0
);

// Format for display
export const formattedTotalSpending = formatCurrency(totalMonthlySpending);

// Mock transactions data
export const transactions: Transaction[] = [
  // Housing transactions
  { id: "t1", description: "Rent Payment", date: "2025-05-01", amount: 1400, categoryId: "housing" },
  { id: "t2", description: "Home Insurance", date: "2025-05-05", amount: 100, categoryId: "housing" },
  
  // Food transactions
  { id: "t3", description: "Grocery Store", date: "2025-05-02", amount: 230, categoryId: "food" },
  { id: "t4", description: "Restaurant Dinner", date: "2025-05-09", amount: 86, categoryId: "food" },
  { id: "t5", description: "Coffee Shop", date: "2025-05-12", amount: 24, categoryId: "food" },
  { id: "t6", description: "Grocery Store", date: "2025-05-18", amount: 215, categoryId: "food" },
  { id: "t7", description: "Fast Food", date: "2025-05-23", amount: 42, categoryId: "food" },
  { id: "t8", description: "Bakery", date: "2025-05-27", amount: 35, categoryId: "food" },
  { id: "t9", description: "Grocery Store", date: "2025-05-28", amount: 168, categoryId: "food" },
  
  // Mobility transactions
  { id: "t10", description: "Gas Station", date: "2025-05-03", amount: 58, categoryId: "mobility" },
  { id: "t11", description: "Car Payment", date: "2025-05-15", amount: 320, categoryId: "mobility" },
  { id: "t12", description: "Parking Fee", date: "2025-05-08", amount: 25, categoryId: "mobility" },
  { id: "t13", description: "Car Insurance", date: "2025-05-10", amount: 120, categoryId: "mobility" },
  { id: "t14", description: "Gas Station", date: "2025-05-22", amount: 52, categoryId: "mobility" },
  { id: "t15", description: "Public Transport", date: "2025-05-14", amount: 25, categoryId: "mobility" },
  
  // Entertainment transactions
  { id: "t16", description: "Movie Theater", date: "2025-05-07", amount: 48, categoryId: "entertainment" },
  { id: "t17", description: "Streaming Service", date: "2025-05-02", amount: 15, categoryId: "entertainment" },
  { id: "t18", description: "Concert Tickets", date: "2025-05-19", amount: 150, categoryId: "entertainment" },
  { id: "t19", description: "Video Game", date: "2025-05-24", amount: 65, categoryId: "entertainment" },
  { id: "t20", description: "Music Subscription", date: "2025-05-15", amount: 10, categoryId: "entertainment" },
  { id: "t21", description: "Book Store", date: "2025-05-28", amount: 32, categoryId: "entertainment" },
  { id: "t22", description: "Bowling", date: "2025-05-21", amount: 45, categoryId: "entertainment" },
  { id: "t23", description: "Video Streaming", date: "2025-05-10", amount: 35, categoryId: "entertainment" },
  
  // Utilities transactions
  { id: "t24", description: "Electricity Bill", date: "2025-05-10", amount: 110, categoryId: "utilities" },
  { id: "t25", description: "Water Bill", date: "2025-05-15", amount: 65, categoryId: "utilities" },
  { id: "t26", description: "Internet Service", date: "2025-05-20", amount: 80, categoryId: "utilities" },
  { id: "t27", description: "Phone Bill", date: "2025-05-18", amount: 95, categoryId: "utilities" },
  
  // Savings transactions
  { id: "t28", description: "Monthly Savings Transfer", date: "2025-05-01", amount: 500, categoryId: "savings" },
  { id: "t29", description: "Emergency Fund Addition", date: "2025-05-15", amount: 250, categoryId: "savings" },
  
  // Insurance transactions
  { id: "t30", description: "Health Insurance", date: "2025-05-05", amount: 180, categoryId: "insurance" },
  { id: "t31", description: "Life Insurance", date: "2025-05-10", amount: 70, categoryId: "insurance" },
  
  // Other transactions
  { id: "t32", description: "Haircut", date: "2025-05-14", amount: 45, categoryId: "other" },
  { id: "t33", description: "Gym Membership", date: "2025-05-01", amount: 60, categoryId: "other" },
  { id: "t34", description: "Pet Supplies", date: "2025-05-17", amount: 78, categoryId: "other" },
  { id: "t35", description: "Clothing", date: "2025-05-22", amount: 120, categoryId: "other" },
  { id: "t36", description: "Charity Donation", date: "2025-05-28", amount: 47, categoryId: "other" }
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
