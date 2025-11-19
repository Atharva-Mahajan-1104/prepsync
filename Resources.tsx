import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, FileText, Download, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Interview Guides',
    items: [
      {
        title: 'Technical Interview Handbook',
        description: 'Comprehensive guide covering data structures, algorithms, and interview strategy.',
        icon: Book,
        link: 'https://www.techinterviewhandbook.org/',
      },
      {
        title: 'Behavioral Interview Guide',
        description: 'Learn how to answer behavioral questions using the STAR method.',
        icon: FileText,
        link: 'https://www.themuse.com/advice/star-interview-method',
      },
    ],
  },
  {
    category: 'Video Tutorials',
    items: [
      {
        title: 'Body Language in Interviews',
        description: 'Learn confident posture, gestures, and eye contact for interviews.',
        icon: Video,
        link: 'https://www.youtube.com/watch?v=VV1cMmCKxmY',
      },
      {
        title: 'Answer Structuring Tips',
        description: 'How to structure your answers clearly and effectively.',
        icon: Video,
        link: 'https://www.youtube.com/watch?v=RxSiy2fmZss',
      },
    ],
  },
  {
    category: 'Templates & Tools',
    items: [
      {
        title: 'Follow-up Email Templates',
        description: 'Professional templates to follow up after interviews.',
        icon: Download,
        link: 'https://zety.com/blog/follow-up-email-after-interview',
      },
      {
        title: 'Thank You Note Examples',
        description: 'Stand out with a professional thank you note.',
        icon: Download,
        link: 'https://www.themuse.com/advice/how-to-write-an-interview-thankyou-note-an-email-template?utm_source=chatgpt.com',
      },
    ],
  },
];

export function Resources() {
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Interview Resources</h1>

        <div className="grid gap-10">
          {resources.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-5">{section.category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="block bg-white dark:bg-card p-5 rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-1">
                          {item.title}
                          <ExternalLink className="w-4 h-4" />
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
