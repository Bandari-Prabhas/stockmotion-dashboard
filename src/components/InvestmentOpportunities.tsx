
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ChartLine, ChartBar } from "lucide-react";
import { Button } from "./ui/button";

const opportunities = [
  {
    title: "Growth Stocks",
    description: "High-potential companies with strong growth prospects",
    metrics: {
      potential: "+25%",
      risk: "Moderate",
    },
    icon: TrendingUp,
  },
  {
    title: "Dividend Stocks",
    description: "Stable companies with regular dividend payments",
    metrics: {
      yield: "4.2%",
      stability: "High",
    },
    icon: DollarSign,
  },
  {
    title: "ETFs",
    description: "Diversified funds tracking market indices",
    metrics: {
      diversity: "High",
      fees: "0.08%",
    },
    icon: ChartLine,
  },
  {
    title: "Value Stocks",
    description: "Undervalued companies with strong fundamentals",
    metrics: {
      potential: "+15%",
      safety: "High",
    },
    icon: ChartBar,
  },
];

const InvestmentOpportunities = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold font-heading">
            Investment Opportunities
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Discover diverse investment options tailored to your goals and risk tolerance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card hover-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {item.description}
              </p>
              <div className="space-y-2 mb-6">
                {Object.entries(item.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm capitalize text-muted-foreground">
                      {key}
                    </span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" variant="outline">
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;
