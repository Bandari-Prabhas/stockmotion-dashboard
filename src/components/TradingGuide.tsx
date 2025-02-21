import { useState } from "react";
import { motion } from "framer-motion";

const TradingGuide = () => {
  const [isExpandedShortTerm, setIsExpandedShortTerm] = useState(false);
  const [isExpandedLongTerm, setIsExpandedLongTerm] = useState(false);

  return (
    <div className="min-h-screen p-8 bg-light-green-100">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Short-Term Trading & Long-Term Investing: A Clear & Actionable Guide
      </motion.h1>

      {/* Two Containers in Flex Layout */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Container: Short-Term Trading */}
        <motion.div
          className="flex-1 p-6 bg-light-green-200 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold text-light-green-600">
            1️⃣ Types of Short-Term Trading
          </h2>

          {/* Day Trading */}
          <div className="mt-4">
            <h3 className="text-xl font-medium">1. Day Trading (Intraday Trading)</h3>
            <p className="mt-2">
              🔹 <strong>Holding Period:</strong> Seconds to a few hours (No overnight positions).
            </p>
            <p>
              🔹 <strong>Goal:</strong> Capture small price movements within the day.
            </p>
            <p>🔹 <strong>Common Tools:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Moving Averages (EMA, SMA) – Identify trends.</li>
              <li>VWAP (Volume Weighted Average Price) – Helps in buying/selling at optimal prices.</li>
              <li>Momentum Indicators (RSI, MACD) – Gauge trend strength.</li>
            </ul>
          </div>

          {/* Learn More Button and Expanded Content */}
          <div
            className={`mt-4 transition-all duration-700 overflow-hidden ${
              isExpandedShortTerm ? "max-h-full" : "max-h-24"
            }`}
          >
            {isExpandedShortTerm && (
              <>
                {/* Swing Trading */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium">2. Swing Trading</h3>
                  <p className="mt-2">
                    🔹 <strong>Holding Period:</strong> A few days to a few weeks.
                  </p>
                  <p>
                    🔹 <strong>Goal:</strong> Profit from short- to medium-term price movements.
                  </p>
                  <p>🔹 <strong>Common Tools:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support & Resistance Levels – Identify buy/sell points.</li>
                    <li>Bollinger Bands – Detect overbought/oversold conditions.</li>
                    <li>Candlestick Patterns – Engulfing, Doji, Hammer formations.</li>
                  </ul>
                </div>

                {/* Scalping */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium">3. Scalping</h3>
                  <p className="mt-2">
                    🔹 <strong>Holding Period:</strong> Seconds to a few minutes.
                  </p>
                  <p>
                    🔹 <strong>Goal:</strong> Make multiple small profits from minor price movements.
                  </p>
                  <p>🔹 <strong>Common Tools:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Order Book Analysis – Track buy/sell orders.</li>
                    <li>High-Frequency Trading (HFT) Bots – Automate rapid trades.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setIsExpandedShortTerm(!isExpandedShortTerm)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md transition-transform hover:scale-105"
          >
            {isExpandedShortTerm ? "Show Less" : "Learn More"}
          </button>
        </motion.div>

        {/* Right Container: Long-Term Investing */}
        <motion.div
          className="flex-1 p-6 bg-light-green-200 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold text-light-green-600">
            Long-Term Investing: Key Principles
          </h2>

          {/* Start Early and Reinvest Earnings */}
          <div className="mt-4">
            <h3 className="text-xl font-medium">Start Early and Reinvest Earnings</h3>
            <p className="mt-2">
              Beginning your investment journey early allows more time for your assets to grow.
            </p>
          </div>

          {/* Learn More Button and Expanded Content */}
          <div
            className={`mt-4 transition-all duration-700 overflow-hidden ${
              isExpandedLongTerm ? "max-h-full" : "max-h-24"
            }`}
          >
            {isExpandedLongTerm && (
              <>
                {/* Diversify Your Portfolio */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium">Diversify Your Portfolio</h3>
                  <p className="mt-2">
                    Spreading investments across various asset classes can mitigate risk and enhance potential returns.
                  </p>
                </div>

                {/* Maintain a Long-Term Perspective */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium">Maintain a Long-Term Perspective</h3>
                  <p className="mt-2">
                    Staying focused on long-term objectives helps investors avoid making impulsive decisions.
                  </p>
                </div>

                {/* Regularly Review and Rebalance */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium">Regularly Review and Rebalance</h3>
                  <p className="mt-2">
                    Periodic assessment of your investment portfolio ensures alignment with your financial goals.
                  </p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setIsExpandedLongTerm(!isExpandedLongTerm)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md transition-transform hover:scale-105"
          >
            {isExpandedLongTerm ? "Show Less" : "Learn More"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TradingGuide;
