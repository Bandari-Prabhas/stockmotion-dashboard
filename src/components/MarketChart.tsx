import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { Button } from "./ui/button"; // Assuming Button component exists and supports variants
import axios from "axios";

// Define types for time range and stock symbol
type TimeRange = "1d" | "5d" | "1mo" | "1y";
type StockSymbol = "AAPL" | "TSLA" | "GOOGL";

// Available stock options
const stockOptions: StockSymbol[] = ["AAPL", "TSLA", "GOOGL"];

// Your Alpha Vantage API key
const ALPHA_VANTAGE_API_KEY = "CV2RGF34COZ5Z9A7";

const MarketChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1d");
  const [selectedStock, setSelectedStock] = useState<StockSymbol>("AAPL");
  const [data, setData] = useState<any[]>([]);

  // Function to fetch stock data from Alpha Vantage API
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        let url = "";
        let params: any = {
          symbol: selectedStock,
          apikey: ALPHA_VANTAGE_API_KEY,
        };

        // Set the correct API URL based on the selected time range
        if (timeRange === "1d") {
          url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min`;
        } else if (timeRange === "5d" || timeRange === "1mo") {
          url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY`;
        } else if (timeRange === "1y") {
          url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY`;
        }

        const response = await axios.get(url, { params });
        const stockData = processStockData(response.data, timeRange); // Format the stock data
        setData(stockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [timeRange, selectedStock]);

  // Function to process stock data based on the selected time range
  const processStockData = (data: any, range: TimeRange) => {
    const formattedData: any[] = [];
    let timeSeriesKey = "";

    // Determine the correct time series based on range
    if (range === "1d") {
      timeSeriesKey = "Time Series (5min)";
    } else if (range === "5d" || range === "1mo") {
      timeSeriesKey = "Time Series (Daily)";
    } else if (range === "1y") {
      timeSeriesKey = "Weekly Time Series";
    }

    const timeSeries = data[timeSeriesKey];

    if (timeSeries) {
      // Convert data into chart-compatible format
      Object.keys(timeSeries).forEach((timestamp) => {
        const value = timeSeries[timestamp]["4. close"];
        formattedData.push({
          time: new Date(timestamp).toLocaleDateString(),
          value: parseFloat(value),
        });
      });
    }

    // Filter data for the last 5 days for the "5d" range
    if (range === "5d") {
      return formattedData.slice(0, 5).reverse(); // Use the last 5 entries
    }

    return formattedData.reverse(); // Reverse the data to show the latest data first
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 w-full h-[80vh] mb-6" // Height increased to 80% of the viewport height
    >
      {/* Header and Stock Selector */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">📈 {selectedStock} Market Performance</h3>
        <select
          className="border p-2 rounded-md"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value as StockSymbol)}
        >
          {stockOptions.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
      </div>

      {/* Time Range Buttons */}
      <div className="flex gap-2 mb-4">
        {["1d", "5d", "1mo", "1y"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range as TimeRange)}
          >
            {range.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="h-[60vh]"> {/* Increased height for the chart */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value ? value.toFixed(2) : 0}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MarketChart;
