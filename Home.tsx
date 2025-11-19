import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Target, Trophy, Users, Check, Play, Star, Sparkles, Zap, Rocket, Award, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Questions',
    description: 'Dynamic interview questions tailored to your industry and experience level'
  },
  {
    icon: Target,
    title: 'Real-time Feedback',
    description: 'Instant analysis of your responses, body language, and speech patterns'
  },
  {
    icon: Trophy,
    title: 'Performance Tracking',
    description: 'Track your progress and improvement over time with detailed analytics'
  },
  {
    icon: Sparkles,
    title: 'Personalized Coaching',
    description: 'Get customized advice based on your unique strengths and weaknesses'
  }
];

const previewFeedback = [
  {
    title: "Speech Clarity",
    description: "Our AI analyzes your speech patterns to help you communicate more clearly",
    icon: Zap,
    color: "from-blue-500 to-purple-500"
  },
  {
    title: "Body Language",
    description: "Get feedback on your non-verbal cues to project confidence",
    icon: Rocket,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Answer Structure",
    description: "Learn how to structure your responses for maximum impact",
    icon: Award,
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Technical Accuracy",
    description: "Ensure your technical answers are precise and comprehensive",
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-500"
  }
];

export function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Coming Soon - Join the Waitlist
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          >
            Ace Every Interview with
            <span className="block">AI-Powered Coaching made by Atharva Mahajan</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Practice with our advanced AI interview coach and get real-time feedback to land your dream job
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/interview')}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Try Free Demo
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/resources')}
              className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2"
            >
              Explore Resources
              <Play className="h-5 w-5" />
            </motion.button>
          </motion.div>

          {/* Animated Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="relative z-10 bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
              <div className="h-8 bg-muted flex items-center px-4 border-b border-border">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium">
                      Tell me about a challenging project you've worked on and how you handled it.
                    </p>
                  </div>
                </div>
                
                <div className="h-32 bg-secondary/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Your interview practice session will appear here...</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Powerful Features
            </span>
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Coach?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven interview techniques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-border/50"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mb-4">How AI Coach Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes interview preparation easy and effective
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10"></div>
            
            {[
              {
                step: "01",
                title: "Select Your Role",
                description: "Choose from a variety of job roles and industries to tailor your practice",
                color: "bg-blue-500"
              },
              {
                step: "02",
                title: "Practice Interview",
                description: "Answer AI-generated questions specific to your chosen role",
                color: "bg-purple-500"
              },
              {
                step: "03",
                title: "Get Feedback",
                description: "Receive detailed analysis and suggestions to improve your performance",
                color: "bg-pink-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card p-8 rounded-xl shadow-lg border border-border/50 relative"
              >
                <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 ${item.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                  {item.step}
                </div>
                <div className="text-center pt-6">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Feedback Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              AI Analysis
            </span>
            <h2 className="text-4xl font-bold mb-4">Comprehensive Feedback</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get detailed insights on multiple aspects of your interview performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {previewFeedback.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-lg border border-border/50 overflow-hidden relative"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} opacity-10`}></div>
                <div className="mb-6 p-4 bg-gradient-to-br rounded-full w-fit z-10 relative">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-primary/90 to-purple-600 text-primary-foreground p-12 rounded-2xl text-center shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-6">
              Limited Spots Available
            </span>
            
            <h2 className="text-4xl font-bold mb-4">Join Our Early Access Program</h2>
            <p className="text-xl mb-8 text-white/90">
              Be among the first to experience AI Coach and help shape its future
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg"
                >
                  Join Waitlist
                </motion.button>
              </div>
              <p className="text-sm text-white/70">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Questions & Answers
            </span>
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about AI Coach
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: "When will AI Coach be available?",
                a: "We're currently in private beta and plan to launch publicly in Q3 2025. Join our waitlist to get early access."
              },
              {
                q: "What types of interviews does AI Coach support?",
                a: "AI Coach supports technical, behavioral, and case interviews across various industries including tech, finance, healthcare, and more."
              },
              {
                q: "How accurate is the AI feedback?",
                a: "Our AI has been trained on thousands of successful interviews and provides feedback comparable to human coaches in most scenarios."
              },
              {
                q: "Can I use AI Coach on my mobile device?",
                a: "Yes, AI Coach is fully responsive and works on desktop, tablet, and mobile devices with a camera and microphone."
              },
              {
                q: "Is my interview data secure?",
                a: "Absolutely. We use enterprise-grade encryption and never share your data with third parties."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-md border border-border/50"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-card p-12 rounded-2xl text-center shadow-xl border border-border"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Interview Skills?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Try our demo today and see the difference AI coaching can make
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/interview')}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Try Free Demo
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2"
              >
                Contact Us
                <Check className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}