
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const mockNews = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cuts in 2024",
    source: "Yahoo Finance",
    time: "2 hours ago",
    url: "#"
  },
  {
    id: 2,
    title: "Tech Stocks Rally on AI Optimism",
    source: "Market Watch",
    time: "4 hours ago",
    url: "#"
  },
  {
    id: 3,
    title: "Global Markets React to Economic Data",
    source: "Reuters",
    time: "6 hours ago",
    url: "#"
  }
];

const NewsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Latest Market News</h3>
      <div className="space-y-4">
        {mockNews.map((news, index) => (
          <motion.a
            key={news.id}
            href={news.url}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group block hover-card rounded-lg p-4 bg-background"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {news.source} • {news.time}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default NewsSection;
