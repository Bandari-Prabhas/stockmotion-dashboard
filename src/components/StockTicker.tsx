
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mockStocks = [
  { symbol: "AAPL", price: "188.92", change: "+1.24%" },
  { symbol: "GOOGL", price: "142.65", change: "-0.32%" },
  { symbol: "MSFT", price: "376.17", change: "+0.85%" },
  { symbol: "AMZN", price: "153.42", change: "+2.11%" },
  { symbol: "TSLA", price: "248.48", change: "-1.47%" },
  { symbol: "META", price: "378.53", change: "+0.73%" },
  { symbol: "NVDA", price: "571.64", change: "+3.26%" },
  { symbol: "JPM", price: "172.28", change: "+0.51%" },
];

const StockTicker = () => {
  const [stocks, setStocks] = useState(mockStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => ({
          ...stock,
          price: (parseFloat(stock.price) * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2),
          change: `${(Math.random() - 0.5) * 4).toFixed(2)}%`
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm border-y border-gray-200">
      <div className="flex whitespace-nowrap animate-[slide_50s_linear_infinite]">
        {[...stocks, ...stocks].map((stock, index) => (
          <motion.div
            key={`${stock.symbol}-${index}`}
            className="flex items-center space-x-4 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="font-semibold">{stock.symbol}</span>
            <span className="text-gray-600">${stock.price}</span>
            <span
              className={`${
                stock.change.startsWith("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stock.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
