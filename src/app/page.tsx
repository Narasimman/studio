"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  accounts,
  transactions,
  getCategoryTotals,
  getMonthlyCashFlow,
  getNetWorthHistory
} from "@/lib/sample-data";
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLine,
  ChartBar,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis
} from "@/components/ui/chart";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  PiggyBank,
  Building2,
  LineChart
} from "lucide-react";

export default function Home() {
  const [selectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  // Calculate totals
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAssets = accounts
    .filter(acc => acc.balance > 0)
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = Math.abs(
    accounts
      .filter(acc => acc.balance < 0)
      .reduce((sum, acc) => sum + acc.balance, 0)
  );

  const categoryTotals = useMemo(
    () => getCategoryTotals(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );

  const cashFlowData = getMonthlyCashFlow();
  const netWorthHistory = getNetWorthHistory();

  // Recent transactions (last 10)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  // Calculate monthly income and expenses
  const currentMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = Math.abs(
    currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <Wallet className="h-5 w-5" />;
      case 'savings':
        return <PiggyBank className="h-5 w-5" />;
      case 'credit':
        return <CreditCard className="h-5 w-5" />;
      case 'investment':
        return <LineChart className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const cashFlowChartConfig = {
    income: {
      label: "Income",
      color: "#10b981",
    },
    expenses: {
      label: "Expenses",
      color: "#ef4444",
    },
  };

  const netWorthChartConfig = {
    netWorth: {
      label: "Net Worth",
      color: "#8b5cf6",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your finances, analyze spending, and grow your wealth
          </p>
        </div>

        {/* Net Worth Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardDescription>Total Net Worth</CardDescription>
              <CardTitle className="text-3xl">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+2.4% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription>Total Assets</CardDescription>
              <CardTitle className="text-3xl">
                ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Across {accounts.filter(a => a.balance > 0).length} accounts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardDescription>Total Liabilities</CardDescription>
              <CardTitle className="text-3xl">
                ${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>Credit card debt</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {accounts.map((account) => (
              <Card
                key={account.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                style={{ borderTop: `3px solid ${account.color}` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${account.color}20` }}
                      >
                        {getAccountIcon(account.type)}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {account.type}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{account.name}</CardTitle>
                  <CardDescription className="text-xs">{account.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardDescription>Income This Month</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardDescription>Expenses This Month</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                ${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cash Flow Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Income vs Expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={cashFlowChartConfig} className="h-[300px]">
                <Chart data={cashFlowData}>
                  <ChartBar dataKey="income" fill="#10b981" />
                  <ChartBar dataKey="expenses" fill="#ef4444" />
                  <ChartXAxis dataKey="month" />
                  <ChartYAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Net Worth Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Net Worth Trend</CardTitle>
              <CardDescription>Your wealth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={netWorthChartConfig} className="h-[300px]">
                <Chart data={netWorthHistory}>
                  <ChartLine
                    type="monotone"
                    dataKey="netWorth"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                  <ChartXAxis dataKey="month" />
                  <ChartYAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Spending by Category */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTotals.slice(0, 8).map((cat, index) => {
                const maxAmount = categoryTotals[0]?.amount || 1;
                const percentage = (cat.amount / maxAmount) * 100;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.category}</span>
                      <span className="text-muted-foreground">
                        ${cat.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => {
                const account = accounts.find(a => a.id === transaction.accountId);

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {account?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
