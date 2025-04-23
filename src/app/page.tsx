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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const stockTickers = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "JPM", "V", "UNH", "WMT"
];

export default function Home() {
  const [open, setOpen] = React.useState(false)
  const [ticker, setTicker] = useState('');
  const [recommendation, setRecommendation] = useState<StockRecommendation | null>(null);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const [recommendationResult, sentimentResult] = await Promise.all([
        recommendationPromise,
        sentimentPromise,
      ]);

      setRecommendation(recommendationResult);
      setSentimentAnalysis(sentimentResult);
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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">StockSage</h1>
      <p className="text-muted-foreground mb-8">
        Get stock recommendations based on sentiment analysis.
      </p>

      <div className="flex w-full max-w-md space-x-2 mb-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {ticker
                ? stockTickers.find((stock) => stock === ticker)
                : "Select stock ticker..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search stock..." />
              <CommandList>
                <CommandEmpty>No stock found.</CommandEmpty>
                <CommandGroup heading="Stocks">
                  {stockTickers.map((stock) => (
                    <CommandItem
                      key={stock}
                      value={stock}
                      onSelect={(currentValue) => {
                        setTicker(currentValue === ticker ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {stock}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          ticker === stock ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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

      {recommendation && sentimentAnalysis && !error && (
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
        </div>
      )}
    </div>
  );
}

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
