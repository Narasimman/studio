"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getStockRecommendation } from "@/services/stock-recommendation";
import { analyzeStockSentiment } from "@/ai/flows/analyze-stock-sentiment";
import { StockRecommendation } from "@/services/stock-recommendation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, CheckCircle, Info } from "lucide-react";
import {
  getStockFundamentalData,
  StockFundamentalData
} from "@/services/stock-fundamental-data";
import {
  getStockHistoricalData,
  StockHistoricalData,
} from "@/services/stock-historical-data";
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis
} from "@/components/ui/chart";

const stockTickers = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "JPM", "V", "UNH", "WMT"
];

export default function Home() {
  const [ticker, setTicker] = useState('');
  const [recommendation, setRecommendation] = useState<StockRecommendation | null>(null);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<any>(null);
  const [fundamentalData, setFundamentalData] = useState<StockFundamentalData | null>(null);
  const [historicalData, setHistoricalData] = useState<StockHistoricalData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);


  useEffect(() => {
    if (ticker) {
      fetchData(ticker);
    }
  }, []);

  const fetchData = async (ticker: string) => {
    setLoading(true);
    setError(null);
    try {
      const recommendationPromise = getStockRecommendation(ticker);
      const sentimentPromise = analyzeStockSentiment({ ticker });
      const fundamentalDataPromise = getStockFundamentalData(ticker);
      const historicalDataPromise = getStockHistoricalData(ticker, "1mo");

      const [
        recommendationResult,
        sentimentResult,
        fundamentalDataResult,
        historicalDataResult
      ] = await Promise.all([
        recommendationPromise,
        sentimentPromise,
        fundamentalDataPromise,
        historicalDataPromise
      ]);

      setRecommendation(recommendationResult);
      setSentimentAnalysis(sentimentResult);
      setFundamentalData(fundamentalDataResult);
      setHistoricalData(historicalDataResult);
    } catch (e: any) {
      console.error("Error fetching data:", e);
      setError(e.message || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (ticker) {
      await fetchData(ticker);
    } else {
      setError("Please enter a stock ticker.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setTicker(value);

    if (value) {
      const filteredSuggestions = stockTickers.filter(stock =>
        stock.startsWith(value)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTicker(suggestion);
    setSuggestions([]);
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">StockSage</h1>
      <p className="text-muted-foreground mb-8">
        Get stock recommendations based on sentiment analysis and fundamental data.
      </p>

      <div className="flex w-full max-w-md space-x-2 mb-6">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Enter stock ticker..."
            value={ticker}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <Card className="absolute left-0 mt-1 w-full z-10">
              <CardContent className="p-2">
                <ul>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="p-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendation && sentimentAnalysis && fundamentalData && historicalData && !error && (
        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation for {recommendation.ticker}</CardTitle>
              <CardDescription>Based on sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {recommendation.recommendation === 'Buy' ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <Info className="text-blue-500 h-5 w-5" />
                )}
                <p className="text-lg font-semibold">
                  {recommendation.recommendation}
                </p>
              </div>
              <p>Confidence: {(recommendation.confidence * 100).toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>
                Analysis of recent news and social media
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Sentiment Score: {sentimentAnalysis.sentimentScore}</p>
              <p>{sentimentAnalysis.analysis}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fundamental Data</CardTitle>
              <CardDescription>
                Key fundamental indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>MACD: {fundamentalData.macd}</p>
              <p>SMA: {fundamentalData.sma}</p>
              <p>Volume: {fundamentalData.volume}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Data (1 Month)</CardTitle>
              <CardDescription>
                Last month's stock prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <Chart data={historicalData}>
                  <ChartLine
                    type="monotone"
                    dataKey="close"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartXAxis dataKey="date" />
                  <ChartYAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

