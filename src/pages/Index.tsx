import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import StockTicker from "@/components/StockTicker";
import MarketMetrics from "@/components/MarketMetrics";
import MarketChart from "@/components/MarketChart";
import NewsSection from "@/components/NewsSection";
import InvestmentOpportunities from "@/components/InvestmentOpportunities";
import TradingGuide from "@/components/TradingGuide"; // Import TradingGuide

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading"
          >
            Track. Analyze.{" "}
            <span className="text-primary">Invest</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-montserrat"
          >
            Real-time market data and powerful analytics to help you make informed investment decisions.
          </motion.p>
        </div>
      </motion.section>

      {/* Stock Ticker Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-4"
      >
        <StockTicker />
      </motion.section>

      {/* News Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center mb-6 font-heading">
            Latest News
          </h2>
          <NewsSection />
        </div>
      </motion.section>

      {/* Trading Guide Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center mb-6 font-heading">
            Trading Guide
          </h2>
          <TradingGuide />
        </div>
      </motion.section>

      {/* Market Overview Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">
            Market Overview
          </h2>
          <MarketMetrics />
          
          <div className="h-screen w-full mt-4">
            <div>
              <MarketChart />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Investment Opportunities Section */}
      <InvestmentOpportunities />

      {/* Coming Soon Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-16 bg-gradient-to-b from-muted/50 to-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold font-heading">
            More Features Coming Soon
          </h2>
          <p className="mt-4 text-muted-foreground font-montserrat">
            Stay tuned for portfolio tracking, detailed analytics, and more.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
