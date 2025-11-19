import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp,
  Brain,
  MessageSquare,
  Code,
  Lightbulb,
  Award,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data - In a real app, this would come from your backend
const generateMockData = (username: string) => {
  return {
    performanceData: [
      { category: 'Technical Depth', score: Math.floor(Math.random() * 20) + 70 },
      { category: 'Communication', score: Math.floor(Math.random() * 20) + 70 },
      { category: 'Problem Solving', score: Math.floor(Math.random() * 20) + 70 },
      { category: 'Practical Application', score: Math.floor(Math.random() * 20) + 70 },
    ],
    progressData: [
      { date: '1', score: 65 },
      { date: '2', score: 68 },
      { date: '3', score: 75 },
      { date: '4', score: 72 },
      { date: '5', score: 80 },
      { date: '6', score: 85 },
      { date: '7', score: 88 },
    ],
    interviewTypes: [
      { name: 'Technical', value: 45 },
      { name: 'System Design', value: 30 },
      { name: 'Problem Solving', value: 15 },
      { name: 'Communication', value: 10 },
    ],
    recentActivity: [
      {
        date: new Date().toISOString().split('T')[0],
        type: 'Technical Interview',
        score: 88,
        details: {
          technicalDepth: 'deep',
          conceptualUnderstanding: 'advanced',
          practicalApplication: 'practical',
          communicationClarity: 'excellent'
        }
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        type: 'System Design Interview',
        score: 92,
        details: {
          technicalDepth: 'moderate',
          conceptualUnderstanding: 'advanced',
          practicalApplication: 'practical',
          communicationClarity: 'clear'
        }
      },
      {
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        type: 'Problem Solving',
        score: 85,
        details: {
          technicalDepth: 'deep',
          conceptualUnderstanding: 'intermediate',
          practicalApplication: 'mixed',
          communicationClarity: 'clear'
        }
      },
    ],
    stats: {
      totalInterviews: Math.floor(Math.random() * 10) + 20,
      practiceHours: Math.floor(Math.random() * 20) + 30,
      avgScore: Math.floor(Math.random() * 10) + 80,
      improvement: Math.floor(Math.random() * 10) + 10,
    }
  };
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export function Dashboard() {
  const { user } = useAuth();
  const data = React.useMemo(() => generateMockData(user?.username || ''), [user?.username]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {user?.username}!</h1>
            <p className="text-muted-foreground mt-2">Here's your interview preparation progress</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full bg-primary/10"
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
          </motion.div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Calendar, label: 'Total Interviews', value: data.stats.totalInterviews },
            { icon: Clock, label: 'Practice Hours', value: `${data.stats.practiceHours}h` },
            { icon: Target, label: 'Avg. Score', value: `${data.stats.avgScore}%` },
            { icon: TrendingUp, label: 'Improvement', value: `+${data.stats.improvement}%` },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Performance Trends</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Performance by Category</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Skill Distribution */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg md:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <div
                  key={activity.date}
                  className="p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{activity.type}</h3>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold">{activity.score}%</p>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(activity.details).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium capitalize">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Interview Focus Areas</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.interviewTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.interviewTypes.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Skill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Your Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'Technical Expert', description: 'Demonstrated deep technical knowledge' },
              { icon: MessageSquare, title: 'Clear Communicator', description: 'Excellence in explanation clarity' },
              { icon: Code, title: 'Problem Solver', description: 'Strong analytical skills' },
              { icon: Lightbulb, title: 'Innovation Master', description: 'Creative solution approaches' },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/30 p-4 rounded-lg text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <badge.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default { Dashboard }