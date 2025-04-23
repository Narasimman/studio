export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function getStockHistoricalData(ticker: string, period: string): Promise<StockHistoricalData[]> {
  // TODO: Implement this by calling an API.
  // For now, return a canned response
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 30));
  const data: StockHistoricalData[] = [];

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate.setDate(startDate.getDate() + 1));
    data.push({
      date: currentDate.toISOString().split('T')[0],
      open: Math.random() * 100 + 100,
      high: Math.random() * 100 + 150,
      low: Math.random() * 50 + 50,
      close: Math.random() * 80 + 120,
      volume: Math.floor(Math.random() * 1000000),
    });
  }

  return data;
}
