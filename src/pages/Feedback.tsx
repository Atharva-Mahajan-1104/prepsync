import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThumbsUp, AlertCircle, Volume2 } from 'lucide-react';

const mockData = [
  { time: '0:00', clarity: 65 },
  { time: '1:00', clarity: 80 },
  { time: '2:00', clarity: 75 },
  { time: '3:00', clarity: 90 },
  { time: '4:00', clarity: 85 },
];

export function Feedback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Interview Feedback</h1>

        {/* Speech Clarity Graph */}
        <div className="bg-card rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Speech Clarity Analysis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clarity"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Strong problem-solving examples
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Clear communication style
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Relevant experience highlighted
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <h3 className="text-xl font-semibold">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                Reduce filler words
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                More specific metrics needed
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                Expand on leadership examples
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Voice Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Voice Analysis</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Speaking Pace</p>
              <p className="text-2xl font-semibold">145 WPM</p>
              <p className="text-sm text-muted-foreground">Optimal: 120-150 WPM</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Vocal Variety</p>
              <p className="text-2xl font-semibold">85%</p>
              <p className="text-sm text-muted-foreground">Good engagement level</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Clarity</p>
              <p className="text-2xl font-semibold">92%</p>
              <p className="text-sm text-muted-foreground">Excellent pronunciation</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}