import React from 'react';
import { motion } from 'framer-motion';
import { Star, Briefcase, Award, TrendingUp } from 'lucide-react';

const successStories = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    company: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200',
    story: 'After 3 months of practice with AI Coach, I landed my dream job at Google. The platform helped me structure my answers and build confidence.',
    improvement: '87%',
    interviews: 12,
    rating: 5,
  }
  
];

export function SuccessStories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-muted-foreground">
            Real stories from candidates who transformed their interview performance
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Star, label: 'Success Rate', value: '94%' },
            { icon: Briefcase, label: 'Job Offers', value: '2500+' },
            { icon: Award, label: 'Top Companies', value: '150+' },
            { icon: TrendingUp, label: 'Avg. Improvement', value: '85%' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-2">{metric.value}</p>
              <p className="text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-lg shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 p-6 flex flex-col items-center justify-center text-center border-r border-border">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                  <p className="text-muted-foreground mb-4">{story.role}</p>
                  <img
                    src={story.company}
                    alt="Company logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6">{story.story}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Performance Improvement</p>
                      <p className="text-2xl font-semibold">{story.improvement}</p>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Practice Interviews</p>
                      <p className="text-2xl font-semibold">{story.interviews}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful candidates who transformed their careers with AI Coach
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}