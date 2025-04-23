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

  let currentPrice = Math.random() * 100 + 100; // Initialize with a random price
  const volatility = 0.02; // Adjust for higher or lower volatility
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate.setDate(startDate.getDate() + 1));

    // Generate a random percentage change within the volatility range
    const percentageChange = (Math.random() * 2 * volatility - volatility);
    const priceChange = currentPrice * percentageChange;
    currentPrice += priceChange;

    // Ensure prices don't go negative
    currentPrice = Math.max(1, currentPrice);

    const open = currentPrice - Math.random() * (currentPrice * 0.01); // Open close to current
    const high = currentPrice + Math.random() * (currentPrice * 0.02); // High a bit higher
    const low = currentPrice - Math.random() * (currentPrice * 0.02);  // Low a bit lower
    const close = currentPrice;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      open: open,
      high: high,
      low: low,
      close: close,
      volume: Math.floor(Math.random() * 1000000),
    });
  }

  return data;
}
