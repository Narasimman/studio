import {Cache} from 'memory-cache';

export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

// Initialize a cache that expires after 1 hour.
const historicalDataCache = new Cache<string, StockHistoricalData[]>();
const cacheTTL = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getStockHistoricalData(ticker: string, period: string): Promise<StockHistoricalData[]> {
  if (!apiKey) {
    console.error('Alpha Vantage API key is missing. Please set the ALPHA_VANTAGE_API_KEY environment variable.');
    return [];
  }

  // Check if the data is already in the cache
  const cachedData = historicalDataCache.get(ticker);
  if (cachedData) {
    return cachedData;
  }

  // Default to one month if an invalid period is passed
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to fetch historical data: ${response.status} ${response.statusText}`);
      return []; // Return an empty array in case of an error
    }
    const data = await response.json();

    if (data['Error Message']) {
      console.error(`Alpha Vantage API Error: ${data['Error Message']}`);
      return []; // Return an empty array in case of an API error
    }

    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) {
      console.error('No time series data found in the response.');
      return []; // Return an empty array if no data is found
    }

    const historicalData: StockHistoricalData[] = Object.entries(timeSeries).map(([date, values]) => ({
      date: date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['6. volume']),
    }));

    // Store the data in the cache
    historicalDataCache.set(ticker, historicalData, cacheTTL);

    // Sort dates to display from oldest to newest
    return historicalData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error: any) {
    console.error("Error fetching stock historical data:", error);
    return []; // Return an empty array in case of a general error
  }
}
