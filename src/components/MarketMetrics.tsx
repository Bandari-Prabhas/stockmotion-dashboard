
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, LineChart } from "lucide-react";

const metrics = [
  {
    title: "Market Cap",
    value: "$2.84T",
    change: "+2.4%",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Trading Volume",
    value: "127.3M",
    change: "-5.1%",
    icon: LineChart,
    positive: false,
  },
  {
    title: "52W High",
    value: "$193.42",
    change: "+15.3%",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "52W Low",
    value: "$124.17",
    change: "+45.8%",
    icon: TrendingDown,
    positive: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const MarketMetrics = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          variants={item}
          className="glass-card hover-card rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">{metric.title}</p>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              <span
                className={`inline-flex items-center text-sm mt-2 ${
                  metric.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <metric.icon className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MarketMetrics;
