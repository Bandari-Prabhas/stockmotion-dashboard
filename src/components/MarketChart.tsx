
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Button } from "./ui/button";

const mockData = {
  "1D": Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 150 + Math.random() * 50,
  })),
  "1W": Array.from({ length: 7 }, (_, i) => ({
    time: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
    value: 150 + Math.random() * 50,
  })),
  "1M": Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: 150 + Math.random() * 50,
  })),
  "1Y": Array.from({ length: 12 }, (_, i) => ({
    time: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: 150 + Math.random() * 50,
  })),
};

type TimeRange = "1D" | "1W" | "1M" | "1Y";

const MarketChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1D");
  const data = mockData[timeRange];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Market Performance</h3>
        <div className="flex gap-2">
          {(["1D", "1W", "1M", "1Y"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
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
