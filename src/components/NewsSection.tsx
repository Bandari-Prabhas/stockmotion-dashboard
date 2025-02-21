import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import axios from "axios";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const apiKey = "3a7e4f76171246d18dcccea7384773ba"; // Your NewsAPI key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch top headlines from News API
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full mt-10">
      <h3 className="text-xl font-semibold mb-4">📢 Latest Market News</h3>

      {/* Marquee effect for news scrolling */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap animate-marquee"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {newsData.map((news, index) => (
            <a
              key={index}
              href={news.url}
              className="group flex-shrink-0 mr-6 hover-card rounded-lg p-4 bg-background inline-block"
              style={{ width: "300px" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-start">
                {/* News Image */}
                {news.urlToImage && (
                  <img
                    src={news.urlToImage}
                    alt={news.title}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                )}
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {news.source.name} • {new Date(news.publishedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Custom styles for the scrolling marquee effect */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .hover-card {
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          background-color: hsl(var(--primary) / 0.1);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default NewsSection;
